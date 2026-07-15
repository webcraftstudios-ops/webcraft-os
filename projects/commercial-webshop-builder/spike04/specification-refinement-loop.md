# Specification Refinement Loop

## Purpose

A customer request may be understandable but not searchable enough. The sourcing process adds value when it turns that request into a more precise specification.

## Loop

```text
original request
-> first channel checks
-> new specification evidence
-> improved search terms
-> selected channel retry
-> compare outcome quality
-> record next action
```

## Refinement triggers

Refine when new evidence provides:

- a better model generation or body style;
- an exact part name or translated term;
- a part number, marking or supplier reference;
- dimensions, diameter, pattern or connector information;
- left, right, front, rear or market context;
- fitment information;
- a related required component;
- evidence excluding a wrong search direction.

## Recording rule

For each refinement record:

```text
refinement_source
new_information
changed_search_terms
channels_retried
quality_before
quality_after
extra_active_time
```

## Decision rule

A refinement is useful when it:

- raises outcome quality;
- makes a reliable non-match possible;
- reveals a necessary intake field;
- prevents further low-value searching.

A refined search that produces no stronger lead is still evidence if it shows that availability or missing information, rather than terminology, is the limiting factor.

## Evidence

`PR2@fc9991e0d3912c193319b3484c376f9fb94089b9:spikes/spike04-manual-source-check/03-process/specification-refinement-loop.md`
