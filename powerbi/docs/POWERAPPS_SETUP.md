# Power Apps visual setup

1. In Power BI Desktop, add the **Power Apps for Power BI** visual.
2. Bind fields from `Scenarios` to the visual (include `scenarioId`).
3. Use app spec from `/powerbi/powerapps/ScenarioEditor/app-spec.md`.
4. Publish the app to same tenant/workspace audience.
5. Configure visual to open the published app.

## Requirements

- Power Apps license for scenario editors.
- SharePoint list provisioned (`RunRateScenarios`).
- Same tenant for Power BI + Power Apps.
