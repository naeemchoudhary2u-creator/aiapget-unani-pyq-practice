# AIAPGET Unani PYQ Practice

## Current State
- Full-stack app with Motoko backend and React frontend.
- Backend stores questions in `adminQuestions` array. Has `addQuestion`, `getQuestions`, `getByTopic`, `getByYear`, `recordAttempt` endpoints.
- Frontend has AdminPanelScreen with password-protected (Naeem9472) add-question form and a list view of questions.
- Users can currently use the app without any login — the Internet Identity login is present but optional.
- No remove/delete question functionality exists.

## Requested Changes (Diff)

### Add
- Backend: `removeQuestion(id: Nat): Bool` — removes a question by ID from `adminQuestions`. No auth guard (password check stays on frontend).
- Frontend: "Remove" button on each question card in the Admin Panel "View Questions" list tab, visible only after admin password authentication. Clicking shows a confirmation before deleting.
- Frontend: Compulsory login screen — users must log in via Internet Identity before accessing any part of the app. Show a login/welcome screen with an "Login with Internet Identity" button as the first screen. Only after login is successful should the main app be accessible.

### Modify
- Frontend `App.tsx`: Wrap app content in a login gate. If the user is not authenticated (identity is anonymous/undefined), show the login screen instead of the main content.
- Frontend `useAdminQueries.ts`: Add `useRemoveQuestion` mutation hook that calls `actor.removeQuestion(id)` and invalidates `adminQuestions` and `allQuestions` query keys.
- Frontend `AdminPanelScreen.tsx`: Add a "Delete" button per question in the list view, with a confirmation step. After delete, refresh the list.

### Remove
- Nothing removed.

## Implementation Plan
1. Add `removeQuestion(id: Nat): async Bool` to `main.mo` backend — filters out the question with matching ID from `adminQuestions`.
2. Update `backend.d.ts` to include `removeQuestion(id: bigint): Promise<boolean>`.
3. Create `LoginScreen.tsx` — a clean welcome/login page with Internet Identity login button.
4. Update `App.tsx` to wrap `AppContent` in a login gate: if `isInitializing`, show loading; if no valid identity, show `LoginScreen`; otherwise show main app.
5. Add `useRemoveQuestion` hook in `useAdminQueries.ts`.
6. Update `AdminPanelScreen.tsx` to show a Delete button with inline confirmation on each question card in the "View Questions" tab.
