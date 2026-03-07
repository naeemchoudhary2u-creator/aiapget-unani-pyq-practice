import List "mo:core/List";
import Array "mo:core/Array";

module {
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

  public type OldActor = {
    adminQuestions : [Question];
    paymentRecords : [PaymentRecord];
    userSubscriptions : List.List<UserSubscription>;
    subscriptionSettings : SubscriptionSettings;
  };

  public type NewActor = {
    adminQuestions : [Question];
    paymentRecords : [PaymentRecord];
    userSubscriptions : List.List<UserSubscription>;
    subscriptionSettings : SubscriptionSettings;
    userSubscriptionsArray : [UserSubscription];
  };

  public func run(old : OldActor) : NewActor {
    let userSubscriptionsArray = old.userSubscriptions.toArray();
    { old with userSubscriptionsArray };
  };
};
