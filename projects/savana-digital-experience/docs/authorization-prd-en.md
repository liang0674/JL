# Savana | Existing-customer Authorization and Coupon PRD

V0.3 · October 26, 2026 · Retrospective reconstruction and proposed rules.

Confirmed feature descriptions, design proposals and open decisions are distinguished. This is not an original historical PRD or evidence that all proposed behavior shipped. Parameters require business confirmation.

## 1. Confirmed scope and goal

Urbanic customers could authorize one-tap Savana login, automatically associate or create a Savana account, and receive a Welcome Coupon after login. This module starts at the consent explanation and ends with explicit account and entitlement outcomes plus shopping continuation. Recipient conditions, value, thresholds and frequency are unresolved.

## 2. Authorization and account handling

Proposed: explain the account relationship, requested information and purpose; offer confirmation and cancellation. Validate identity through the agreed authorization service, not a source tag or client-provided ID.

Confirmation validates identity and account relationships, then establishes or restores login. Cancellation must not create authorization or issue coupons. Do not silently merge account conflicts. Confirm logged-out Urbanic paths, existing Savana accounts, expired consent, linkage, alternative login and possible guest browsing.

## 3. Eligibility and issuance

Let the responsible service determine qualification and record issuance. Customer status, campaign validity, prior receipt and coupon stock are possible inputs only when adopted by the business.

Proposed: eligible customer → uniquely identified issue request → final coupon outcome. Duplicate requests should resolve to the same business record. Ineligible or already received → explain and permit shopping. Unknown or pending → query the record before retrying or reissuing.

The defined activation journey continues through coupon feedback, Shop Now, browsing, adding to bag, coupon application and checkout. Application still depends on actual coupon eligibility.

## 4. Outcome matrix

| Account | Entitlement | Proposed feedback |
| Not logged in | Do not issue | Reauthorize or exit |
| Logged in | Issued | Show terms, view and use actions |
| Logged in | Ineligible or already received | Explain; continue shopping |
| Logged in | Confirmed failure | Keep login; recover the entitlement independently |
| Logged in | Unknown or processing | Show query / pending access |
| Authorization expired | Do not continue issuance | Reauthorize and reconcile the existing request |

Show actual coupon value, validity, threshold and scope. Restore a valid source destination where possible, otherwise use a clear default. Flash Sale and campaign applicability require confirmed rules.

## 5. Measurement, acceptance and open decisions

Track consent display, confirmation, cancellation and outcome; eligibility; issuance request and final result; coupon viewing and use. Authorization success uses authorization entrants as denominator; issuance success uses eligible customers who should receive a coupon. Define windows, duplicates and reissue treatment.

Test success, cancellation, expiry, conflicts, claimed and ineligible states, failures, pending results, repeat requests and recovery. Confirm account model, permissions, eligibility, coupon parameters, frequency, stock, campaign period, recovery ownership and offer relationships before implementation.


## Updated framing and measurement boundary

The experience serves Migration + Activation through low friction and immediate reward. Additional edge cases include duplicate phone numbers and expired or inapplicable coupons. Metrics cover Authorization Rate, Login Completion, Coupon Claim, Coupon Usage and First Purchase Conversion; measured results remain unavailable.
