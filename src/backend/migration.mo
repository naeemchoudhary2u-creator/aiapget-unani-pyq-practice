module {
  type UserLoginRecord = {
    userId : Text;
    userName : Text;
    loginType : Text;
    contactInfo : Text;
    lastLoginTime : Int;
    loginCount : Nat;
    lastDeviceId : Text;
    subscriptionStatus : Text;
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
    status : Text;
    approvedAt : ?Text;
    rejectedAt : ?Text;
  };
  type UserSubscription = {
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

  type OldState = {
    adminQuestions : [Question];
    paymentRecords : [PaymentRecord];
    subscriptionRecords : [UserSubscription];
    loginRecords : [UserLoginRecord];
  };

  type NewState = {
    adminQuestions : [Question];
    paymentRecords : [PaymentRecord];
    subscriptionRecords : [UserSubscription];
  };

  public func migrate(old : OldState) : NewState {
    {
      adminQuestions = old.adminQuestions;
      paymentRecords = old.paymentRecords;
      subscriptionRecords = old.subscriptionRecords;
    }
  };
};
