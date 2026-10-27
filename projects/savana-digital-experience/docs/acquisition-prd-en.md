# Savana | Urbanic Acquisition, Authorization and Coupon PRD

V0.1 · October 26, 2026 · Retrospective reconstruction and proposed rules.

Based on the project owner’s feature descriptions. This is not an original historical PRD or evidence that every proposed behavior shipped. The diagrams describe a proposed interaction flow.

## 1. Background and confirmed scope

Savana offered a more accessible fashion proposition alongside Urbanic’s move upmarket. Confirmed features: an Urbanic module displaying Savana products; app-marketplace navigation and Savana app launching; authorized direct login for Urbanic customers; coupon issuance.

Proposed scope: product entry, cross-app handoff, authorization, login, eligibility and issuance, outcome feedback and recovery. Flash Sale and the storewide campaign are downstream shopping contexts. Their promotion, checkout and fulfillment rules are outside this document, and stacking is not assumed.

## 2. Goals and user task

Help interested Urbanic customers understand the Savana destination, reach it, authorize account access, understand their coupon outcome and continue shopping. Proposed measures include linked arrival, authorization completion, eligible-customer issuance success and later shopping behavior. No measured funnel results or improvement targets have been supplied.

## 3. Functional requirements

| ID | Capability | Status |
| F01 | Urbanic product module and Savana actions | Capability confirmed; presentation details pending |
| F02 | App launch and marketplace navigation | Capabilities confirmed; fallback rules proposed |
| F03 | Authorized existing-customer login | Capability confirmed; identity and consent contract pending |
| F04 | Eligibility and coupon outcome | Issuance confirmed; qualification and coupon rules pending |
| F05 | Recovery and duplicate-request protection | Proposed |
| F06 | Events and cross-team contracts | Proposed |

## 4. Entry and cross-app navigation

Proposed: display brand, product and accurate price information, and make the Savana destination explicit before leaving Urbanic. Prevent repeated navigation triggers. Confirm card actions, module placement, target systems and markets.

Use the selected link approach to attempt app entry or navigate to the marketplace. Lack of launch confirmation is not proof the app is absent. Offer retry, marketplace and return actions.

After installation, the user opens Savana. Restoring the original product or source across installation depends on verified platform and link capabilities; it is not promised. If context is unavailable or a product is invalid, use a clear default destination with a way to continue browsing.

## 5. Authorization and login

Proposed: explain the account relationship, requested information and purpose; provide confirmation and cancellation. Validate identity through the agreed authorization service rather than trusting a client-provided user ID.

Success establishes or restores Savana login before eligibility checks. Cancellation must not silently log the user in or issue a coupon. Confirm handling of logged-out Urbanic customers, pre-existing Savana accounts, account conflicts, expired authorization and possible guest browsing.

## 6. Eligibility and issuance

Proposed: let the service determine qualification and persist the issue result, with a business identifier protecting against duplicate issuance. Only apply first-login restrictions, limits, inventory or other conditions if the business actually adopts them.

Eligible → issue → show the final result. Ineligible or already claimed → explain the outcome and allow shopping. Unknown or processing → query the business record before retrying; do not equate an unknown outcome with failure.

Confirm recipient rules, coupon value, validity, thresholds, categories, limits, supply and reissue ownership. No numerical values or thresholds are assumed.

## 7. Outcome and shopping continuation

Separate login success from coupon success. If login succeeds but issuance fails, retain the valid login and handle the entitlement independently. Show applicable coupon terms and a way to view or use the coupon.

Return to a valid recoverable product context where supported; otherwise use a clear default page. Coupon applicability to Flash Sale or the storewide campaign must follow confirmed offer rules.

## 8. States and recovery

| State | Proposed response |
| No app launch confirmation | Offer retry, marketplace or return; do not assert installation status |
| Context lost after installation | Continue in a clear default experience |
| Invalid product or route | Explain and provide alternative browsing |
| Authorization canceled or invalid | Do not issue; offer reauthorization or exit |
| Account conflict | Use the confirmed account-resolution process; no silent merge |
| Ineligible or already claimed | Explain the outcome and allow shopping |
| Login succeeded, issuance failed | Preserve login; query and recover entitlement separately |
| Unknown issuance or repeated request | Query the unique business record and resolve the result |
| Network interruption | Restore safe context and validate outcomes before retry |

## 9. Integration and measurement

Agree ownership across Urbanic, Savana, authorization, coupon and attribution services. Proposed fields include source, entry or campaign ID, target route, product, language and market, authorization transaction ID, issue business ID and outcome code. Names and protocols are not presumed existing implementations.

Source parameters are not identity credentials. Keep replayable credentials and raw personal identifiers out of links, analytics and ordinary logs; use the agreed authorization channel.

Suggested events: module impressions and clicks; navigation initiation and attributable arrival; authorization display, confirmation, cancellation and result; eligibility, issuance request and final result; shopping continuation, coupon use and ordering.

Define deduplication and observation windows before calculating click-through, linked arrival, authorization completion and eligible-customer issuance success. Specify unattributed traffic and purchase-attribution limitations; do not attribute total sales or DAU to this feature alone.

## 10. Acceptance and open decisions

Validate both app and marketplace routes; interrupted handoffs; invalid products; consent success and cancellation; authorization expiry and account conflict; eligible and ineligible outcomes; duplicate requests; unknown and failed issuance; continued shopping and bilingual content.

Critical decisions: account and authorization model, coupon rules, supported platforms and links, market and currency, campaign timing, context restoration across installation and entitlement-recovery ownership. Confirm these before turning this discussion draft into implementation specifications.
