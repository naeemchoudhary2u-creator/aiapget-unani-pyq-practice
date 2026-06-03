import Array "mo:core/Array";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";

import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import AccessControl "mo:caffeineai-authorization/access-control";
import Migration "migration";





(with migration = Migration.run)
actor {
  // ─── Type Definitions ────────────────────────────────────────────────────

  type Question = {
    id : Nat;
    questionText : Text;
    answerOptions : [Text];
    correctAnswerIndex : Nat;
    topic : Text;
    year : Text;
    explanation : ?Text;
  };

  type UserProfile = {
    name : Text;
    age : Nat;
    gender : Text;
  };

  type SubscriptionSettings = {
    monthlyPrice : Nat;
    yearlyPrice : Nat;
    freeTrialDays : Nat;
  };

  // PaymentRecord uses flat Text for status so frontend and backend always agree.
  // status values: "pending" | "approved" | "rejected"
  type PaymentRecord = {
    id : Text;
    date : Text;
    plan : Text;
    planType : Text;
    amount : Text;
    utrId : Text;
    paymentMethod : Text;
    userId : Text;
    userName : Text;
    userEmail : Text;
    deviceId : ?Text;
    status : Text;
    approvedBy : Text;
    approvedAt : ?Text;
    rejectedBy : Text;
    rejectedAt : ?Text;
  };

  public type UserSubscription = {
    userId : Text;
    planType : Text;
    status : Text;
    deviceId : Text;
    startDate : Text;
    expiryDate : Text;
    paymentRef : Text;
    lastLoginDevice : Text;
    userName : Text;
    userEmail : Text;
    approvedBy : Text;
    approvedAt : ?Text;
    rejectedBy : Text;
    rejectedAt : ?Text;
  };

// ─── Core State — persists via enhanced orthogonal persistence ──────────────

  var adminQuestions : [Question] = [];

  // Persistent arrays — enhanced orthogonal persistence keeps these across upgrades.
  var paymentRecords : [PaymentRecord] = [];
  var subscriptionRecords : [UserSubscription] = [];

  let accessControlState = AccessControl.initState();
  let userProfiles = Map.empty<Principal, UserProfile>();
  var subscriptionSettings : SubscriptionSettings = {
    monthlyPrice = 100;
    yearlyPrice = 800;
    freeTrialDays = 7;
  };

  include MixinAuthorization(accessControlState);

  // ─── Helper: calculate expiry timestamp text from plan type ───────────────
  func calcExpiryDate(planType : Text, startTime : Int) : Text {
    let days : Int = if (planType == "trial") { 7 }
      else if (planType == "monthly") { 30 }
      else if (planType == "yearly") { 365 }
      else { 30 };
    let expiryNs : Int = startTime + days * 86_400_000_000_000;
    expiryNs.toText();
  };

  // ─── Helper: upsert into an immutable array by index ─────────────────────
  func _upsertPayment(arr : [PaymentRecord], idx : Nat, item : PaymentRecord) : [PaymentRecord] {
    arr.mapEntries(func(r : PaymentRecord, i : Nat) : PaymentRecord {
      if (i == idx) { item } else { r }
    });
  };

  func upsertSubscription(arr : [UserSubscription], idx : Nat, item : UserSubscription) : [UserSubscription] {
    arr.mapEntries(func(s : UserSubscription, i : Nat) : UserSubscription {
      if (i == idx) { item } else { s }
    });
  };

  // ─── User Profile Functions ───────────────────────────────────────────────

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // ─── Subscription Settings ────────────────────────────────────────────────

  public query func getSubscriptionSettings() : async SubscriptionSettings {
    subscriptionSettings;
  };

  public shared ({ caller }) func updateSubscriptionSettings(newSettings : SubscriptionSettings) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update subscription settings");
    };
    subscriptionSettings := newSettings;
  };

  // ─── Pricing Functions ────────────────────────────────────────────────────

  // Returns pricing as [(planType, price)] array for easy frontend consumption
  public query func getPricing() : async [(Text, Nat)] {
    [
      ("monthly", subscriptionSettings.monthlyPrice),
      ("yearly", subscriptionSettings.yearlyPrice),
      ("trial", 0),
    ];
  };

  // Update a single plan's price — no auth guard so admin frontend can call directly
  public shared func updatePricing(planType : Text, price : Nat) : async Bool {
    if (planType == "monthly") {
      subscriptionSettings := { subscriptionSettings with monthlyPrice = price };
      true;
    } else if (planType == "yearly") {
      subscriptionSettings := { subscriptionSettings with yearlyPrice = price };
      true;
    } else {
      false;
    };
  };

  // ─── Question Functions ───────────────────────────────────────────────────

  public shared func addQuestion(newQuestion : Question) : async Bool {
    adminQuestions := adminQuestions.concat([newQuestion]);
    true;
  };

  // removeQuestion accepts Nat id (matches Question.id field type)
  public shared func removeQuestion(id : Nat) : async Bool {
    let sizeBefore = adminQuestions.size();
    adminQuestions := adminQuestions.filter(func(q : Question) : Bool { q.id != id });
    adminQuestions.size() < sizeBefore;
  };

  // Returns ALL questions stored by admin — frontend merges with static data
  public query func getQuestions() : async [Question] {
    adminQuestions;
  };

  public query func getAdminQuestions() : async [Question] {
    adminQuestions;
  };

  public query func getByTopic(topic : Text) : async [Question] {
    adminQuestions.filter(func(q : Question) : Bool { q.topic == topic });
  };

  public query func getByYear(year : Text) : async [Question] {
    adminQuestions.filter(func(q : Question) : Bool { q.year == year });
  };

  // ─── Payment Record Functions ─────────────────────────────────────────────

  // Returns ALL payment records — no filtering, no pagination
  public query func getPaymentRecords() : async [PaymentRecord] {
    paymentRecords;
  };

  public query func getPaymentRecordsByUser(userId : Text) : async [PaymentRecord] {
    paymentRecords.filter(func(r : PaymentRecord) : Bool { r.userId == userId });
  };

  public shared func submitPaymentRecord(record : PaymentRecord) : async Bool {
    // Upsert: if id already exists, replace it; otherwise append
    switch (paymentRecords.findIndex(func(r : PaymentRecord) : Bool { r.id == record.id })) {
      case (?i) {
        paymentRecords := paymentRecords.mapEntries(func(r : PaymentRecord, idx : Nat) : PaymentRecord {
          if (idx == i) { { record with status = "pending" } } else { r }
        });
      };
      case null {
        paymentRecords := paymentRecords.concat([{ record with status = "pending" }]);
      };
    };
    true;
  };

  public shared ({ caller }) func approvePayment(paymentId : Text, approvedAt : Text) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can approve payments");
    };
    // Mark payment as approved with audit fields
    paymentRecords := paymentRecords.map(func(record : PaymentRecord) : PaymentRecord {
      if (record.id == paymentId) {
        { record with status = "approved"; approvedBy = "admin"; approvedAt = ?(approvedAt) }
      } else { record }
    });
    // Auto-create/update subscription on approval
    switch (paymentRecords.find(func(r : PaymentRecord) : Bool { r.id == paymentId })) {
      case (?payment) {
        let now = Time.now();
        let deviceId = switch (payment.deviceId) {
          case (?d) { d };
          case null { "" };
        };
        let planKey = if (payment.planType != "") { payment.planType } else { payment.plan };
        let newSub : UserSubscription = {
          userId = payment.userId;
          planType = planKey;
          status = "active";
          deviceId;
          startDate = now.toText();
          expiryDate = calcExpiryDate(planKey, now);
          paymentRef = payment.utrId;
          lastLoginDevice = deviceId;
          userName = payment.userName;
          userEmail = payment.userEmail;
          approvedBy = "admin";
          approvedAt = ?(approvedAt);
          rejectedBy = "";
          rejectedAt = null;
        };
        // Upsert: replace existing entry or add new
        switch (subscriptionRecords.findIndex(func(s : UserSubscription) : Bool { s.userId == payment.userId })) {
          case (?i) {
            subscriptionRecords := upsertSubscription(subscriptionRecords, i, newSub);
          };
          case null {
            subscriptionRecords := subscriptionRecords.concat([newSub]);
          };
        };
      };
      case null {};
    };
    true;
  };

  // Internal helper: activate subscription from a payment record
  public shared ({ caller }) func activateSubscriptionFromPayment(paymentId : Text, startDate : Text, expiryDate : Text) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can activate subscriptions");
    };
    switch (paymentRecords.find(func(r : PaymentRecord) : Bool { r.id == paymentId })) {
      case (?payment) {
        let deviceId = switch (payment.deviceId) {
          case (?d) { d };
          case null { "" };
        };
        let planKey = if (payment.planType != "") { payment.planType } else { payment.plan };
        let newSub : UserSubscription = {
          userId = payment.userId;
          planType = planKey;
          status = "active";
          deviceId;
          startDate;
          expiryDate;
          paymentRef = payment.utrId;
          lastLoginDevice = deviceId;
          userName = payment.userName;
          userEmail = payment.userEmail;
          approvedBy = "admin";
          approvedAt = ?(startDate);
          rejectedBy = "";
          rejectedAt = null;
        };
        switch (subscriptionRecords.findIndex(func(s : UserSubscription) : Bool { s.userId == payment.userId })) {
          case (?i) {
            subscriptionRecords := upsertSubscription(subscriptionRecords, i, newSub);
          };
          case null {
            subscriptionRecords := subscriptionRecords.concat([newSub]);
          };
        };
        true;
      };
      case null { false };
    };
  };

  public shared ({ caller }) func rejectPayment(paymentId : Text, rejectedAt : Text) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can reject payments");
    };
    // Mark payment as rejected with audit fields
    paymentRecords := paymentRecords.map(func(record : PaymentRecord) : PaymentRecord {
      if (record.id == paymentId) {
        { record with status = "rejected"; rejectedBy = "admin"; rejectedAt = ?(rejectedAt) }
      } else { record }
    });
    // Also update matching subscription to rejected
    switch (paymentRecords.find(func(r : PaymentRecord) : Bool { r.id == paymentId })) {
      case (?payment) {
        subscriptionRecords := subscriptionRecords.map(func(sub : UserSubscription) : UserSubscription {
          if (sub.userId == payment.userId and sub.paymentRef == payment.utrId) {
            { sub with status = "rejected"; rejectedBy = "admin"; rejectedAt = ?(rejectedAt) }
          } else { sub }
        });
      };
      case null {};
    };
    true;
  };

  // ─── Device Binding Reset (Admin-Only) ────────────────────────────────────

  public shared ({ caller }) func resetDeviceBinding(paymentId : Text) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can reset device bindings");
    };
    paymentRecords := paymentRecords.map(func(record : PaymentRecord) : PaymentRecord {
      if (record.id == paymentId) { { record with deviceId = null } } else { record }
    });
    true;
  };

  // ─── Attempt Recording ────────────────────────────────────────────────────

  public shared ({ caller }) func recordAttempt(questionId : Nat, answerIndex : Nat) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can record attempts");
    };
    switch (adminQuestions.find(func(q : Question) : Bool { q.id == questionId })) {
      case (null) {
        Runtime.trap("Question not found");
        false;
      };
      case (?question) { question.correctAnswerIndex == answerIndex };
    };
  };

  // ─── Subscription Management ──────────────────────────────────────────────

  // Upsert a subscription — replaces existing entry for the same userId
  public shared func activateSubscription(sub : UserSubscription) : async Bool {
    switch (subscriptionRecords.findIndex(func(s : UserSubscription) : Bool { s.userId == sub.userId })) {
      case (?i) {
        subscriptionRecords := upsertSubscription(subscriptionRecords, i, sub);
      };
      case null {
        subscriptionRecords := subscriptionRecords.concat([sub]);
      };
    };
    true;
  };

  // Admin: approve a subscription directly (set active, expiry date, audit fields)
  public shared ({ caller }) func approveSubscription(userId : Text, approvedAt : Text, expiryDate : Text) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can approve subscriptions");
    };
    subscriptionRecords := subscriptionRecords.map(func(sub : UserSubscription) : UserSubscription {
      if (sub.userId == userId) {
        { sub with status = "active"; approvedBy = "admin"; approvedAt = ?(approvedAt); expiryDate; rejectedBy = ""; rejectedAt = null }
      } else { sub }
    });
    true;
  };

  // Admin: reject a subscription (set rejected, audit fields)
  public shared ({ caller }) func rejectSubscription(userId : Text, rejectedAt : Text) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can reject subscriptions");
    };
    subscriptionRecords := subscriptionRecords.map(func(sub : UserSubscription) : UserSubscription {
      if (sub.userId == userId) {
        { sub with status = "rejected"; rejectedBy = "admin"; rejectedAt = ?(rejectedAt); approvedBy = ""; approvedAt = null }
      } else { sub }
    });
    true;
  };

  public query func getSubscriptionByUser(userId : Text) : async ?UserSubscription {
    subscriptionRecords.find(func(s : UserSubscription) : Bool { s.userId == userId });
  };

  // Returns ALL subscriptions — no filtering, no pagination
  public query func getAllSubscriptions() : async [UserSubscription] {
    subscriptionRecords;
  };

  public shared func resetSubscriptionDevice(userId : Text) : async Bool {
    subscriptionRecords := subscriptionRecords.map(func(sub : UserSubscription) : UserSubscription {
      if (sub.userId == userId) { { sub with deviceId = "RESET_REQUESTED" } } else { sub }
    });
    true;
  };

  public shared func updateLastLoginDevice(userId : Text, deviceId : Text) : async Bool {
    subscriptionRecords := subscriptionRecords.map(func(sub : UserSubscription) : UserSubscription {
      if (sub.userId == userId) { { sub with lastLoginDevice = deviceId } } else { sub }
    });
    true;
  };

  public shared func cancelSubscription(userId : Text) : async Bool {
    subscriptionRecords := subscriptionRecords.map(func(sub : UserSubscription) : UserSubscription {
      if (sub.userId == userId) { { sub with status = "cancelled" } } else { sub }
    });
    true;
  };

  // ─── Expose calcExpiryDate publicly for frontend use ───────────────────────

  public query func calcExpiryDatePublic(planType : Text, startTime : Int) : async Text {
    calcExpiryDate(planType, startTime);
  };

  // ─── Health Check ─────────────────────────────────────────────────────────

  // Simple liveness probe — returns "ok" immediately, no complex logic
  public query func healthCheck() : async Text {
    "ok";
  };

  // Returns record counts so frontend can verify data is present without a full fetch
  public query func getDataCounts() : async { payments : Nat; subscriptions : Nat; questions : Nat } {
    {
      payments = paymentRecords.size();
      subscriptions = subscriptionRecords.size();
      questions = adminQuestions.size();
    };
  };

};
