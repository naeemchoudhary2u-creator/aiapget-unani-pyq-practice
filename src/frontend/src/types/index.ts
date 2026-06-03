// ── Domain types used across frontend hooks and pages ────────────────────────
// PaymentRecord and UserSubscription are imported from "../backend" (generated).
// Types here are supplementary domain types used in the frontend only.

export interface BackendQuestion {
  id: bigint;
  questionText: string;
  answerOptions: string[];
  correctAnswerIndex: bigint;
  topic: string;
  year: string;
  explanation?: string;
}

export interface UserLoginRecord {
  userId: string;
  userName: string;
  loginType: string;
  contactInfo: string;
  lastLoginTime: bigint;
  loginCount: bigint;
  lastDeviceId: string;
  subscriptionStatus: string;
}
