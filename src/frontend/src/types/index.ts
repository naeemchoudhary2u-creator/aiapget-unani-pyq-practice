// ── Domain types used across frontend hooks and pages ────────────────────────
// These are defined locally since the backend interface has no generated methods.
// All data operations use localStorage as primary store.

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
