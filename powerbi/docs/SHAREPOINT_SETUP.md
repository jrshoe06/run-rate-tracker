# SharePoint setup for persistent scenarios

## List

- **List name:** `RunRateScenarios`
- Use columns matching `/powerbi/data/Scenarios.csv` exactly:
  - `scenarioId` (Single line of text)
  - `scenarioName` (Single line of text)
  - `clientName` (Single line of text)
  - `caseType` (Choice)
  - `caseSubtype` (Single line of text, optional)
  - `projectedVolume` (Number)
  - `projectedStartMonth` (Single line of text `YYYY-MM`)
  - `targetCompletionMonth` (Single line of text `YYYY-MM`)
  - `expectedCycleTimeOverrideDays` (Number, optional)
  - `productivityWeightOverride` (Number, optional)
  - `notes` (Multiple lines of text)

## Permissions

- Editors: BAL reporting team (Contribute/Edit)
- Viewers: read-only stakeholders

## Power Query source swap

Replace CSV source with:

```m
let
    SiteUrl = "https://<tenant>.sharepoint.com/sites/<site>",
    Source = SharePoint.Tables(SiteUrl, [Implementation="2.0", ViewMode="Default"]),
    RunRateScenarios = Source{[Name="RunRateScenarios"]}[Items]
in
    RunRateScenarios
```

Keep query names and output schema unchanged.

## Refresh

- For published report: automatic page refresh every 5 minutes (Premium/Fabric required)
- Add manual refresh button for non-Premium workspaces.
