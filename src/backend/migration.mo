// migration.mo — maps old PaymentRecord/UserSubscription types (without audit fields)
// to the new types that include approvedBy, rejectedBy, userEmail, planType, approvedAt, rejectedAt.
module {

  // ─── Old types (copied from previous .old/src/backend/main.mo) ───────────

  type OldPaymentRecord = {
    id : Text;
    date : Text;
    plan : Text;
    amount : Text;
    utrId : Text;
    paymentMethod : Text;
    userId : Text;
    userName : Text;
    deviceId : ?Text;
    status : Text;
    approvedAt : ?Text;
    rejectedAt : ?Text;
  };

  type OldUserSubscription = {
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

  type Question = {
    id : Nat;
    questionText : Text;
    answerOptions : [Text];
    correctAnswerIndex : Nat;
    topic : Text;
    year : Text;
    explanation : ?Text;
  };

  // ─── New types (must match current actor field types exactly) ────────────

  type NewPaymentRecord = {
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

  type NewUserSubscription = {
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

  // ─── Old and New actor state shapes ──────────────────────────────────────

  public type OldActor = {
    var adminQuestions : [Question];
    var paymentRecords : [OldPaymentRecord];
    var subscriptionRecords : [OldUserSubscription];
  };

  public type NewActor = {
    var adminQuestions : [Question];
    var paymentRecords : [NewPaymentRecord];
    var subscriptionRecords : [NewUserSubscription];
  };

  // ─── Migration function ───────────────────────────────────────────────────

  public func run(old : OldActor) : NewActor {
    let newPayments = old.paymentRecords.map(
      func(r : OldPaymentRecord) : NewPaymentRecord {
        {
          id = r.id;
          date = r.date;
          plan = r.plan;
          planType = "";
          amount = r.amount;
          utrId = r.utrId;
          paymentMethod = r.paymentMethod;
          userId = r.userId;
          userName = r.userName;
          userEmail = "";
          deviceId = r.deviceId;
          status = r.status;
          approvedBy = "";
          approvedAt = r.approvedAt;
          rejectedBy = "";
          rejectedAt = r.rejectedAt;
        }
      }
    );

    let newSubscriptions = old.subscriptionRecords.map(
      func(s : OldUserSubscription) : NewUserSubscription {
        {
          userId = s.userId;
          planType = s.planType;
          status = s.status;
          deviceId = s.deviceId;
          startDate = s.startDate;
          expiryDate = s.expiryDate;
          paymentRef = s.paymentRef;
          lastLoginDevice = s.lastLoginDevice;
          userName = s.userName;
          userEmail = "";
          approvedBy = "";
          approvedAt = null;
          rejectedBy = "";
          rejectedAt = null;
        }
      }
    );

    {
      var adminQuestions = old.adminQuestions;
      var paymentRecords = newPayments;
      var subscriptionRecords = newSubscriptions;
    };
  };
};
