# AIAPGET Unani PYQ Practice

## Current State
- Full-stack app with Motoko backend and React frontend
- Admin panel with password protection (Naeem9472) to add/view/delete questions
- Questions are stored in backend but NOT in stable storage — they get wiped on every deployment
- Logo and hero banner images are referenced in code but the generated image files do not exist
- Subscription system with UPI/Razorpay payment and admin approval workflow

## Requested Changes (Diff)

### Add
- Stable storage for questions so they persist across canister upgrades/deployments
- Regenerated logo, hero banner, and PWA icon image assets

### Modify
- Backend `adminQuestions` variable must use `stable var` so data survives upgrades
- All other backend functionality remains unchanged

### Remove
- Nothing removed

## Implementation Plan
1. Regenerate Motoko backend with `stable var adminQuestions` so questions persist across upgrades
2. Images are already regenerated (app-logo, hero-banner, icons)
3. No frontend code changes needed — existing hooks/components already work correctly
