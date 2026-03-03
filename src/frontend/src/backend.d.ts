import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface SubscriptionPlan {
    id: bigint;
    features: Array<string>;
    name: string;
    billingCycle: BillingCycle;
    price: number;
}
export interface Question {
    id: bigint;
    topic: string;
    explanation?: string;
    year: string;
    answerOptions: Array<string>;
    questionText: string;
    correctAnswerIndex: bigint;
}
export interface UserProfile {
    name: string;
}
export enum BillingCycle {
    monthly = "monthly",
    yearly = "yearly"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addQuestion(newQuestion: Question): Promise<boolean>;
    addSubscriptionPlan(newPlan: SubscriptionPlan): Promise<boolean>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAdminQuestions(): Promise<Array<Question>>;
    getByTopic(topic: string): Promise<Array<Question>>;
    getByYear(year: string): Promise<Array<Question>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getQuestions(): Promise<Array<Question>>;
    getSubscriptionPlans(): Promise<Array<SubscriptionPlan>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    recordAttempt(questionId: bigint, answerIndex: bigint): Promise<boolean>;
    removeQuestion(id: bigint): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
}
