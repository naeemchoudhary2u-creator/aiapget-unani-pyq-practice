# AIAPGET Unani PYQ Practice

## Current State
The app has a backend `addQuestion` function protected by `#admin` role check. The frontend has an admin password prompt (Naeem9472) that gates access to the Add Question form. However, since users call the backend anonymously (no Internet Identity login), every call to `addQuestion` fails with "Unauthorized: Only admins can add questions" — the backend rejects anonymous callers.

Similarly, `removeQuestion` has the same admin-only backend check.

## Requested Changes (Diff)

### Add
- Nothing new

### Modify
- `addQuestion` backend function: remove the `#admin` permission check so anonymous callers can add questions (security is handled by the frontend password prompt)
- `removeQuestion` backend function: remove the `#admin` permission check so anonymous callers can remove questions (security is handled by the frontend password prompt)

### Remove
- The `#admin` role guard from `addQuestion` and `removeQuestion` in Motoko backend

## Implementation Plan
1. Regenerate backend Motoko code with `addQuestion` and `removeQuestion` as open shared functions (no caller check)
2. All other functions remain unchanged
