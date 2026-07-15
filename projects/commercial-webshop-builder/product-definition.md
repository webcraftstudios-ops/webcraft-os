# Product Definition

## Product

Classic Parts Finder is a productized manual sourcing service for difficult-to-find classic-car parts.

The service does not currently operate as a webshop or marketplace. Its value is the structured work between an initial request and a defensible next result:

```text
request
-> completeness check
-> specification refinement
-> channel selection
-> manual search
-> lead or documented non-match
-> recommended next action
```

## Primary buyer

The primary buyer is a classic-car owner or restorer who lacks the time, terminology, specialist knowledge, or search process required to find a specific part.

Parts suppliers and specialists are potential information or supply sources. A supplier subscription is not validated as the current primary offer.

## Problem

Parts requests are often too vague for reliable sourcing. Match quality depends on details such as:

- make, model, year or generation;
- exact part type and side or position;
- original, reproduction, used or new preference;
- condition;
- photo, part number, measurements or markings;
- fitment and related mounting parts;
- market or vehicle-variant context where relevant.

## Current service promise

The service may promise a documented sourcing effort and a clearer next action. It may not promise that a matching part will be found, fit, remain available, or meet a specific condition.

## Commercial hypotheses

The original Spike01 considered:

- a free request during a beta;
- a paid highlighted request;
- paid personal search help;
- an annual offer for specialists or parts dealers.

The figures **€19** and **€46** are pilot pricing hypotheses only. They are not validated prices, approved public prices or authorized offers. Payment validation has not started.

## Payment boundary

```text
payment_permission: no
public_price_authorization: no
payment_validation: not_started
```

No payment request may be sent and no checkout, Mollie, Stripe or other payment implementation may be created under the current scope.

## Current direction

```text
commercial_model: productized sourcing service
direction: improve_intake + continue_manual_tests
build_permission: no
automation_permission: no
payment_permission: no
```

## Evidence

- Original hypothesis: `main@905e0360256f0120bf7374333e6e79831e01e5c1:projects/commercial-webshop-builder/experiments/oldtimer-onderdeel-gezocht-spike-01.md`
- Manual sourcing scope: `PR2@fc9991e0d3912c193319b3484c376f9fb94089b9:spikes/spike04-manual-source-check/01-scope/spike04-scope.md`
- Manual sourcing process: `PR2@fc9991e0d3912c193319b3484c376f9fb94089b9:spikes/spike04-manual-source-check/03-process/manual-sourcing-sop.md`
