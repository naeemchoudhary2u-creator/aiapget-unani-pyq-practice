import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";

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
  };

  type SubscriptionPlan = {
    id : Nat;
    name : Text;
    price : Float;
    billingCycle : BillingCycle;
    features : [Text];
  };

  type BillingCycle = {
    #monthly;
    #yearly;
  };

  type OldActor = {
    adminQuestions : [Question];
    subscriptionPlans : Map.Map<Nat, SubscriptionPlan>;
    userProfiles : Map.Map<Principal, UserProfile>;
  };

  type NewActor = {
    adminQuestions : [Question];
    subscriptionPlans : Map.Map<Nat, SubscriptionPlan>;
    userProfiles : Map.Map<Principal, UserProfile>;
  };

  public func run(old : OldActor) : NewActor { old };
};
