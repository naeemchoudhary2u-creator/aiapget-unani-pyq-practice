# AIAPGET Unani PYQ Practice

## Current State

The app is a full-stack MCQ practice app for AIAPGET Unani medicine students. It has:
- A Motoko backend with `adminQuestions`, `paymentRecords`, and `userSubscriptions` stored as NON-stable variables — so data is lost on every upgrade.
- The `addQuestion` backend function has an admin permission check that always fails (no Internet Identity login), blocking question saves.
- A React frontend with admin panel (add/view questions, payments, subscriptions tabs) and a subscription plans screen.
- The Free Trial and Yearly subscription buttons currently use color classes `bg-success` and `bg-gold` — user wants them changed to black (`bg-black text-white`).
- Admin panel fetches data once on tab switch but does NOT auto-poll — so changes from other devices don't show up in real time.

## Requested Changes (Diff)

### Add
- `system func preupgrade()` and `system func postupgrade()` in backend to save/restore `userSubscriptions` list to/from the stable `userSubscriptionsArray` — ensuring data survives every canister upgrade.
- Auto-polling every 10 seconds in the Admin Panel for payments and subscriptions tabs so data updates in real time across all devices.
- Auto-polling every 10 seconds for `allQuestions` so newly added questions appear on all devices immediately.

### Modify
- Backend: Change `var adminQuestions`, `var paymentRecords`, `var subscriptionSettings` to `stable var` so data is never lost on upgrade.
- Backend: Add `userSubscriptionsArray : [UserSubscription]` as a stable var for pre/postupgrade serialization of the List.
- Backend: Remove the admin permission check from `addQuestion` and `removeQuestion` — these are already protected by the frontend password prompt. The backend should accept calls from any principal.
- Frontend: Change the Free Trial button color from `bg-success text-white` to `bg-black text-white` (and hover `hover:bg-gray-900`).
- Frontend: Change the Yearly Plan "Subscribe" button color from `bg-gold text-white` to `bg-black text-white` (and hover `hover:bg-gray-900`).
- Frontend Admin Panel: Add `refetchInterval: 10000` to `usePaymentRecords`, `useAllSubscriptions`, and `useGetAdminQuestions` queries so they poll every 10 seconds automatically.

### Remove
- Nothing removed.

## Implementation Plan

1. Regenerate Motoko backend with stable storage for all three data stores, pre/postupgrade hooks, and no admin check on addQuestion/removeQuestion.
2. Update `useAdminQueries.ts` to add `refetchInterval: 10000` to `usePaymentRecords` and `useGetAdminQuestions`.
3. Update `useSubscriptionQueries.ts` to add `refetchInterval: 10000` to `useAllSubscriptions`.
4. Update `SubscriptionPlansScreen.tsx`: change Free Trial button and Yearly Plan button colors to black.
5. Validate and deploy.
