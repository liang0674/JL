# Savana | Homepage Flash Sale PRD

V0.3 · October 26, 2026 · Retrospective reconstruction and proposed rules.

Confirmed feature descriptions, design proposals and open decisions are distinguished. This is not an original historical PRD or evidence that all proposed behavior shipped. Parameters require business confirmation.

## 1. Confirmed scope and goal

Flash Sale was a core homepage module continuously presenting special-price products. The objective is to connect price appeal with understandable selection and purchase. The updated description confirms an always-on product with a limited product pool, time limits and Countdown, Limited Inventory / Stock Status, and Original Price → Sale Price. It targets traffic, value perception, conversion and revisits. Reminders, rounds, reservations and price guarantees remain unconfirmed; durations, stock allocations and thresholds are open.

## 2. Task and coverage

Home → Flash Sale Entry → Flash Sale Feed → Product Detail → Size / Variant → Add to Bag → Cart → Checkout, then the store’s order and payment outcomes. Align with the existing store’s order and payment services rather than assuming a separate transaction system.

## 3. Proposed activity states

| State | Presentation and action |
| Not effective / configuration | Do not show invalid prices |
| Upcoming | Communicate start time and countdown; no unconfirmed reservation promise |
| Active / Ending Soon | Show valid prices, stock and countdown; ending-soon threshold pending |
| Some SKUs unavailable | Distinguish SKU availability and disable invalid choices |
| Countdown End / Campaign Ended / Product Disabled | Stop expired offers; explain changes and request review |
| Refresh / empty / load failure | Refresh effective state, retain valid selections and offer retry |

## 4. Homepage, products and options

Clearly identify Flash Sale and show trustworthy product and price information. Any comparison price needs an agreed definition and evidence; do not assume “original price.” Flash Sale Feed is confirmed as the destination browsing scene. Specific “view all” controls, sorting and update cadence require detail.

Keep the homepage and destination coherent. After SKU selection, show the relevant price and availability. Identify missing required options; offer alternatives for sold-out choices; explain changed prices before confirmation. Final availability and pricing are service decisions.

## 5. Cart, checkout and orders

Proposed: identify promotional products and valid discounts in cart; revalidate when quantity changes and at checkout / submission according to agreed contracts. If an offer expires after browsing or adding, explain affected products and new totals and allow changes. Adding to cart must not imply a price or inventory reservation that has not been confirmed.

Handle payment failures and unknown outcomes through order lookup before encouraging another payment. Cancellation and refunds restoring stock or eligibility require separate rules.

## 6. Open pricing and operational rules

Confirm schedule, timezone, market, currency, SKUs, limits, stock ownership and reservation, comparison prices, coupons, campaign priority, shipping and thresholds. If start and end times exist, use an agreed effective time source rather than only the device clock. Countdown is confirmed; agree the time source, refresh, end state and network recovery.

## 7. Measurement and acceptance

Track module impressions, clicks, destination arrival, option selection, valid cart addition, checkout, submission, final payment and interruptions from stock, ending or price changes. Define denominators, windows and source attribution; not every promotional sale comes from the homepage module.

Test price continuity, SKU states, quantity updates, offer expiry, stock changes, unavailable coupons, repeated requests and unknown payment results, including both languages. Confirm real page coverage and all pricing, reservation and order contracts before implementation.


## Updated framing and measurement boundary

The product role spans Traffic × Conversion × Retention. Updated product pools with time, stock and price information are intended to support decisions and revisits. Measures include Module CTR, PLP → PDP, Add to Cart, Conversion and Repeat Visit; these are evaluation dimensions, not proof of improved retention.
