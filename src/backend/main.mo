import Array "mo:core/Array";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import List "mo:core/List";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";

import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  public type Question = {
    id : Nat;
    questionText : Text;
    answerOptions : [Text];
    correctAnswerIndex : Nat;
    topic : Text;
    year : Text;
    explanation : ?Text;
  };

  public type UserProfile = {
    name : Text;
    age : Nat;
    gender : Text;
  };

  public type BillingCycle = {
    #monthly;
    #yearly;
  };

  public type SubscriptionSettings = {
    monthlyPrice : Nat;
    yearlyPrice : Nat;
    freeTrialDays : Nat;
  };

  var adminQuestions : [Question] = [];
  let accessControlState = AccessControl.initState();
  let userProfiles = Map.empty<Principal, UserProfile>();
  var subscriptionSettings : SubscriptionSettings = {
    monthlyPrice = 100;
    yearlyPrice = 800;
    freeTrialDays = 7;
  };

  include MixinAuthorization(accessControlState);

  // ── User profile functions ──────────────────────────────────────────────────
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view their profile");
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

  // ── Subscription settings management (admin-only) ───────────────────────────
  public query func getSubscriptionSettings() : async SubscriptionSettings {
    subscriptionSettings;
  };

  public shared ({ caller }) func updateSubscriptionSettings(newSettings : SubscriptionSettings) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update subscription settings");
    };
    subscriptionSettings := newSettings;
  };

  // ── Question management (no permission check for add/remove) ────────────────
  public shared ({ caller }) func addQuestion(newQuestion : Question) : async Bool {
    let newQuestions = Array.tabulate(
      adminQuestions.size() + 1,
      func(i) { if (i < adminQuestions.size()) { adminQuestions[i] } else { newQuestion } },
    );
    adminQuestions := newQuestions;
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

  public query func getAdminQuestions() : async [Question] {
    adminQuestions;
  };

  // ── Public question query functions (open to all) ───────────────────────────
  public query func getQuestions() : async [Question] {
    adminQuestions;
  };

  public query func getByTopic(topic : Text) : async [Question] {
    adminQuestions.filter(func(q) { q.topic == topic });
  };

  public query func getByYear(year : Text) : async [Question] {
    adminQuestions.filter(func(q) { q.year == year });
  };

  // ── Attempt recording (user-only) ───────────────────────────────────────────
  public shared ({ caller }) func recordAttempt(questionId : Nat, answerIndex : Nat) : async Bool {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can record attempts");
    };
    switch (adminQuestions.find(func(q) { q.id == questionId })) {
      case (null) { Runtime.trap("Question not found") };
      case (?question) { question.correctAnswerIndex == answerIndex };
    };
  };
};
