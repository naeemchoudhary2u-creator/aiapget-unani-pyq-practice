import Array "mo:core/Array";
import Map "mo:core/Map";
import List "mo:core/List";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Iterate "mo:core/Iter";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";


import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

// Data migration on upgrades

actor {
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

  type PaymentStatus = {
    #pending;
    #approved;
    #rejected;
  };

  type PaymentRecord = {
    id : Text;
    date : Text;
    plan : Text;
    amount : Text;
    utrId : Text;
    paymentMethod : Text;
    userId : Text;
    userName : Text;
    deviceId : ?Text;
    status : PaymentStatus;
    approvedAt : ?Text;
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
  };

  // Stable variables
  stable var adminQuestions : [Question] = [];
  stable var paymentRecords : [PaymentRecord] = [];
  var userSubscriptions = List.empty<UserSubscription>();
  let accessControlState = AccessControl.initState();

  let userProfiles = Map.empty<Principal, UserProfile>();
  stable var subscriptionSettings : SubscriptionSettings = {
    monthlyPrice = 100;
    yearlyPrice = 800;
    freeTrialDays = 7;
  };

  // Migration implementation
  stable var userSubscriptionsArray : [UserSubscription] = [];

  include MixinAuthorization(accessControlState);

  // ─── User Profile Functions (Require User Role) ───────────────────────────

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

  // ── Subscription Settings (Public Read, Admin-Only Write) ────────────────
  public query func getSubscriptionSettings() : async SubscriptionSettings {
    subscriptionSettings;
  };

  public shared ({ caller }) func updateSubscriptionSettings(newSettings : SubscriptionSettings) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update subscription settings");
    };
    subscriptionSettings := newSettings;
  };

  // ── Question Functions (No Admin Check per User Request) ──────────────────

  public shared ({ caller }) func addQuestion(newQuestion : Question) : async Bool {
    adminQuestions := Array.tabulate(
      adminQuestions.size() + 1,
      func(i) { if (i < adminQuestions.size()) { adminQuestions[i] } else { newQuestion } },
    );
    true;
  };

  public shared ({ caller }) func removeQuestion(id : Nat) : async Bool {
    let originalSize = adminQuestions.size();
    let filteredQuestions = adminQuestions.filter(func(q) { q.id != id });
    let newSize = filteredQuestions.size();
    let wasRemoved = newSize < originalSize;
    adminQuestions := filteredQuestions;
    wasRemoved;
  };

  public query func getQuestions() : async [Question] {
    adminQuestions;
  };

  public query func getAdminQuestions() : async [Question] {
    adminQuestions;
  };

  public query func getByTopic(topic : Text) : async [Question] {
    adminQuestions.filter(func(q) { q.topic == topic });
  };

  public query func getByYear(year : Text) : async [Question] {
    adminQuestions.filter(func(q) { q.year == year });
  };

  // ── Payment Record Functions (Open to All Callers) ───────────────────────
  public query func getPaymentRecords() : async [PaymentRecord] {
    paymentRecords;
  };

  public query func getPaymentRecordsByUser(userId : Text) : async [PaymentRecord] {
    paymentRecords.filter(func(record) { record.userId == userId });
  };

  public shared ({ caller }) func submitPaymentRecord(record : PaymentRecord) : async Bool {
    if (paymentRecords.any(func(r) { r.id == record.id })) {
      return false;
    };
    paymentRecords := Array.tabulate(
      paymentRecords.size() + 1,
      func(i) {
        if (i < paymentRecords.size()) { paymentRecords[i] } else { record };
      },
    );
    true;
  };

  // ── Admin-Only Payment Approval Functions ────────────────────────────────
  public shared ({ caller }) func approvePayment(paymentId : Text, approvedAt : Text) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can approve payments");
    };
    paymentRecords := paymentRecords.map(func(record) {
      if (record.id == paymentId) { { record with status = #approved; approvedAt = ?(approvedAt) } } else { record };
    });
    true;
  };

  public shared ({ caller }) func rejectPayment(paymentId : Text, rejectedAt : Text) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can reject payments");
    };
    paymentRecords := paymentRecords.map(func(record) {
      if (record.id == paymentId) { { record with status = #rejected; rejectedAt = ?(rejectedAt) } } else { record };
    });
    true;
  };

  // ── Device ID Reset (Admin-Only) ─────────────────────────────────────────
  public shared ({ caller }) func resetDeviceBinding(paymentId : Text) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can reset device bindings");
    };
    paymentRecords := paymentRecords.map(func(record) {
      if (record.id == paymentId) { { record with deviceId = null } } else { record };
    });
    true;
  };

  // ── Attempt Recording (Requires User Role) ───────────────────────────────
  public shared ({ caller }) func recordAttempt(questionId : Nat, answerIndex : Nat) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can record attempts");
    };
    switch (adminQuestions.find(func(q) { q.id == questionId })) {
      case (null) {
        Runtime.trap("Question not found");
        false;
      };
      case (?question) { question.correctAnswerIndex == answerIndex };
    };
  };

  // ─── Subscription Management ─────────────────────────────────────────────

  public shared ({ caller }) func activateSubscription(sub : UserSubscription) : async Bool {
    let existing = userSubscriptions.findIndex(func(s) { s.userId == sub.userId });
    switch (existing) {
      case (null) {
        userSubscriptions.add(sub);
        true;
      };
      case (?i) {
        let newUserSubscriptions = List.empty<UserSubscription>();
        var j = 0;
        for (subscription in userSubscriptions.values()) {
          if (j == i) {
            newUserSubscriptions.add(sub);
          } else {
            newUserSubscriptions.add(subscription);
          };
          j += 1;
        };
        userSubscriptions := newUserSubscriptions;
        true;
      };
    };
  };

  public query func getSubscriptionByUser(userId : Text) : async ?UserSubscription {
    userSubscriptions.find(func(s) { s.userId == userId });
  };

  public query func getAllSubscriptions() : async [UserSubscription] {
    userSubscriptions.toArray();
  };

  public shared ({ caller }) func resetSubscriptionDevice(userId : Text) : async Bool {
    let newUserSubscriptions = userSubscriptions.map<UserSubscription, UserSubscription>(
      func(sub) {
        if (sub.userId == userId) { { sub with deviceId = "RESET_REQUESTED" } } else { sub };
      }
    );
    userSubscriptions := newUserSubscriptions;
    true;
  };

  public shared ({ caller }) func updateLastLoginDevice(userId : Text, deviceId : Text) : async Bool {
    let newUserSubscriptions = userSubscriptions.map<UserSubscription, UserSubscription>(
      func(sub) {
        if (sub.userId == userId) { { sub with lastLoginDevice = deviceId } } else { sub };
      }
    );
    userSubscriptions := newUserSubscriptions;
    true;
  };

  public shared ({ caller }) func cancelSubscription(userId : Text) : async Bool {
    let newUserSubscriptions = userSubscriptions.map<UserSubscription, UserSubscription>(
      func(sub) {
        if (sub.userId == userId) { { sub with status = "cancelled" } } else { sub };
      }
    );
    userSubscriptions := newUserSubscriptions;
    true;
  };

  // Migration implementation
  system func preupgrade() {
    userSubscriptionsArray := userSubscriptions.toArray();
  };

  system func postupgrade() {
    userSubscriptions := List.fromArray(userSubscriptionsArray);
    userSubscriptionsArray := [];
  };
};
