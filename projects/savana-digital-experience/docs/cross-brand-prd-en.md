# Savana | Urbanic Cross-brand Acquisition PRD

V0.3 · October 26, 2026 · Retrospective reconstruction and proposed rules.

Confirmed feature descriptions, design proposals and open decisions are distinguished. This is not an original historical PRD or evidence that all proposed behavior shipped. Parameters require business confirmation.

## 1. Confirmed scope and user need

Urbanic displayed Savana products in a core module and supported app-marketplace navigation and Savana app launching. Product value comes first: users encounter products, prices, style and brand expression before being invited to move. They should understand the destination and recover from interruption. This module ends at a valid Savana landing; the updated description confirms installed / uninstalled product paths using Deep Link or App Store / Google Play across iOS / Android. Detection implementation and post-install product restoration still require verification.

## 2. Proposed requirements

Show Savana branding, product imagery, name, accurate price information and an explicit destination action. Do not imply checkout occurs inside Urbanic. Confirm module placement, product count, recommendation logic and card versus button actions.

Prevent repeated navigation triggers. Use the agreed link and platform approach to launch Savana or open the marketplace. Missing arrival confirmation does not prove the app is absent. Offer retry, marketplace and return actions; timing and automatic fallback need platform validation.

After installation, users open Savana. Restore a valid product context only if supported and verified; otherwise use a clear default destination. Confirm link parameters, supported environments and source attribution.

## 3. Recovery states

| Situation | Proposed recovery |
| Invalid link or route | Explain failure; offer retry and an alternative |
| Product removed | Explain unavailability; offer other products or home |
| Marketplace unavailable | Retain retry and return; alternative distribution is unconfirmed |
| Source lost after installation | Allow normal default entry and browsing |
| User cancels or returns | Do not count arrival or issue a coupon |
| Network interruption or repeated click | Avoid repeated navigation and check the actual outcome |

## 4. Context and integration

Use minimal source, campaign, product, language and market context. Links must not contain replayable credentials or establish login from attribution tags. Agree field validation, expiry, target lookup, default destination and authorization timing with the responsible teams.

## 5. Measurement and acceptance

Suggested events: module impression, click, navigation attempt, marketplace handoff, linked app arrival and recovery. Define click-through and linked-arrival rates with user deduplication, comparable windows and unattributed traffic. Marketplace visits are not installs or activations.

Validate app and marketplace paths, no arrival confirmation, post-install entry with and without context, invalid products, cancellation, repeat clicks and both languages. Finalize placement, actions, platforms, links, source fields and fallback behavior before implementation.


## Updated framing and measurement boundary

Additional metric scope: Exposure, CTR, Store Visit Rate, Install Conversion, First Open and Migration Conversion. Define installation, first open and migration completion separately; attribution capability and measured results have not been supplied.
