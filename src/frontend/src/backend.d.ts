import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface PaymentRecord {
    id: string;
    status: PaymentStatus;
    userName: string;
    paymentMethod: string;
    userId: string;
    date: string;
    approvedAt?: string;
    plan: string;
    rejectedAt?: string;
    deviceId?: string;
    utrId: string;
    amount: string;
}
export interface SubscriptionSettings {
    yearlyPrice: bigint;
    monthlyPrice: bigint;
    freeTrialDays: bigint;
}
export interface UserSubscription {
    status: string;
    userName: string;
    lastLoginDevice: string;
    expiryDate: string;
    userId: string;
    deviceId: string;
    paymentRef: string;
    planType: string;
    startDate: string;
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
    age: bigint;
    name: string;
    gender: string;
}
export enum PaymentStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    activateSubscription(sub: UserSubscription): Promise<boolean>;
    addQuestion(newQuestion: Question): Promise<boolean>;
    approvePayment(paymentId: string, approvedAt: string): Promise<boolean>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    cancelSubscription(userId: string): Promise<boolean>;
    getAdminQuestions(): Promise<Array<Question>>;
    getAllSubscriptions(): Promise<Array<UserSubscription>>;
    getByTopic(topic: string): Promise<Array<Question>>;
    getByYear(year: string): Promise<Array<Question>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getPaymentRecords(): Promise<Array<PaymentRecord>>;
    getPaymentRecordsByUser(userId: string): Promise<Array<PaymentRecord>>;
    getQuestions(): Promise<Array<Question>>;
    getSubscriptionByUser(userId: string): Promise<UserSubscription | null>;
    getSubscriptionSettings(): Promise<SubscriptionSettings>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    recordAttempt(questionId: bigint, answerIndex: bigint): Promise<boolean>;
    rejectPayment(paymentId: string, rejectedAt: string): Promise<boolean>;
    removeQuestion(id: bigint): Promise<boolean>;
    resetDeviceBinding(paymentId: string): Promise<boolean>;
    resetSubscriptionDevice(userId: string): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitPaymentRecord(record: PaymentRecord): Promise<boolean>;
    updateLastLoginDevice(userId: string, deviceId: string): Promise<boolean>;
    updateSubscriptionSettings(newSettings: SubscriptionSettings): Promise<void>;
}
