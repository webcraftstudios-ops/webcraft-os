# Apps Script — Optioneel

Apps Script is alleen nodig wanneer formules onvoldoende controle geven of wanneer `case_view` actief moet worden bijgewerkt na een form-submit.

## Principe

```javascript
function onFormSubmit(e) {
  const ss = SpreadsheetApp.getActive();
  const caseView = ss.getSheetByName('case_view');

  const flowValues = e.namedValues['flow_id'];
  if (!flowValues || !flowValues[0]) {
    // Log ontbrekende flow_id en stop.
    return;
  }

  const flow = flowValues[0];
  const personId = flow.replace('flow', 'person');
  const carId = flow.replace('flow', 'car');
  const adId = flow.replace('flow', 'ad');
  const consentId = flow.replace('flow', 'consent');

  // Zoek bestaande case_view-rij op flow_id.
  // Update bestaande rij of voeg nieuwe rij toe.
  // Bepaal case_complete, status, next_action en missing_fields.
}
```

## Wanneer wel gebruiken

- Formules worden te fragiel.
- Er zijn veel dubbele records.
- Er is actieve logging nodig.
- Nieuwe submissions moeten automatisch genormaliseerd worden.

## Wanneer niet gebruiken

- Als formules al stabiel werken.
- Als de flow nog vaak wijzigt.
- Als debugging daardoor complexer wordt.

## Minimale logging

Leg minstens vast:

```text
timestamp
source_form
flow_id
result
issue
```

## Spike03-advies

Begin met formules. Voeg Apps Script pas toe na een duidelijke failure die met formules niet proper oplosbaar is.
