# AIAPGET Unani PYQ Practice

## Current State
- Full-stack MCQ practice app with static questions and backend-stored questions
- `TopicBrowserScreen` handles both "Browse by Year" and "Browse by Topic" modes
- `useAllQuestions` hook fetches from backend and merges with static questions
- Bug: `useAllQuestions` is `enabled: !!actor`, so query never runs until actor resolves — meanwhile `TopicBrowserScreen` uses `data = []` as default, showing empty lists
- Bug: `adminQuestions` in backend uses `var` (not `stable`), so added questions are lost on every deploy

## Requested Changes (Diff)

### Add
- Nothing new

### Modify
- `TopicBrowserScreen.tsx`: Change default from `[]` to `staticQuestions` so questions show immediately even while actor loads
- `useAdminQueries.ts` (`useAllQuestions`): Change `enabled: !!actor` to `enabled: true` so the query runs immediately and returns staticQuestions when actor is null
- Backend `main.mo`: Change `var adminQuestions` and `var subscriptionSettings` to `stable var` so questions persist across canister upgrades

### Remove
- Nothing

## Implementation Plan
1. Fix `TopicBrowserScreen.tsx` — import and use `staticQuestions` as default for `useAllQuestions` data
2. Fix `useAllQuestions` in `useAdminQueries.ts` — set `enabled: true` so it runs immediately  
3. Fix backend `main.mo` — use `stable var` for `adminQuestions` and `subscriptionSettings`
