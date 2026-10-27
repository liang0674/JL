# Shanghai Disney App | Ordering Interaction Specification

Portfolio reconstruction based on the supplied presentation. Confirmed design evidence, proposed rules and unresolved scope are distinguished below. This is not a claim about the complete historical production specification.

## 1. Context and role

The project connects in-park ordering with the Shanghai Disney app through embedded HTML, supporting Chinese and English. My role was design team lead and project lead, working directly with the U.S. Disney team.

## 2. Confirmed entry paths

| Entry | Route visible in the materials | Important distinction |
| Mobile Order | Dashboard / order list → restaurant list | Select a restaurant before ordering |
| Order Food | Restaurant detail → menu when operating; welcome page when closed | Closed-location page provides a route to other restaurants |
| My Food Order | Dashboard / confirmation page → order list | Detailed order states remain unconfirmed |
| General access QR code | Scanner → restaurant list | Does not identify one particular restaurant |
| Location access QR code | Scanner → specified location context | Check operating status before the menu |
| Table access QR code | Scanner → table-service context | Table payload and service rules require confirmation |
| QSR check-in QR code | Redemption result with a four-digit pickup number | Redemption conditions and repeat-scan behavior require confirmation |

The historical materials also distinguish Disney, Koubei and other scanner entry paths. Their current external-app behavior is outside this reconstruction.

## 3. Main flow

App entry → restaurant list → restaurant details → Order Food → login check → operating-status decision → embedded menu.

Scanner → QR-type recognition → restaurant selection or a specific location / table context → login check → operating-status decision → embedded menu.

Menu → item details → required meal selections and specifications → add to cart → review quantity and amount → payment entry. Full payment and fulfillment behavior needs additional source material.

## 4. Menu and meal configuration

Confirmed evidence includes restaurant information, categories, item images, prices, direct add controls, configurable items, cart and Payment entry. Meal examples contain adult / child drink groups, Select N requirements, expandable choices, required ice settings, quantity and Add.

Proposed rules: show selected versus required counts; prevent incomplete configurations from being submitted; identify the missing group or specification; enforce selection limits while allowing changes. Preserve configurations when reopening them. Distinguish identical drinks with different specifications.

Proposed rules: synchronize item quantity, cart quantity and amount; disable payment for an empty cart; validate availability and price on the server. Final quantity, pricing and configuration rules need product and engineering agreement.

## 5. States and recovery

| State | Proposed feedback and recovery |
| Loading / timeout | Show progress, preserve native back navigation and allow retry |
| Invalid QR code | Explain the problem; offer rescan or restaurant selection |
| Login interrupted | Allow login retry; confirm whether guest browsing is permitted |
| Restaurant closed | Explain unavailability and return to the restaurant list; this branch is documented |
| Required selection missing | Identify the incomplete group and retain completed choices |
| Sold out / changed price | Identify affected items and request review of updated information |
| Network failure | Retain choices; establish request outcome before retrying a write |
| Payment outcome unknown | Route to order-status lookup rather than encouraging immediate repayment |

## 6. Bilingual and embedded-app coordination

Proposed rules: inherit the app language, preserve restaurant and selection context during language changes, and maintain matching translations for products, options and errors. Currency symbols shown in mockups do not establish the real settlement currency.

Coordinate login, QR context, language, navigation layers, loading failures and payment-result callbacks between native app and HTML teams. Exact protocols remain subject to confirmation.

## 7. Unresolved scope and validation

Confirm payment providers, discount calculations, cancellation and processing states, duplicate-payment protection, order lifecycle, pickup notifications, table-service fulfillment and refunds.

Validate routing by QR type, recovery from closed restaurants, login continuation, meal selection limits, cart persistence, back navigation and bilingual text fit. Suggested funnel and recovery metrics are measurement proposals; no measured outcomes have been supplied.
