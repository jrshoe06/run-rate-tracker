# Run Rate Tracker — Power BI deployment

This folder is the Power BI implementation of the existing React POC.

- The React app remains the executable reference spec for forecast math.
- This Power BI project is the reporting-team-owned artifact for editing and publishing.
- Data is sourced from `/powerbi/data/*.csv`, generated from `/data/*.ts` via `npm run powerbi:csv`.

## Real-time scenario editing

1. **Mechanism A (primary): What-If parameters + field parameters** for instant in-report adjustments.
2. **Mechanism B: SharePoint list + Power Apps visual** for persistent named scenarios.

## Open and edit

See `/powerbi/docs/OPENING_IN_DESKTOP.md`.

## Key locations

- Semantic model: `/powerbi/RunRateTracker.SemanticModel/definition`
- Report definition: `/powerbi/RunRateTracker.Report`
- Docs: `/powerbi/docs`
- Power Apps spec: `/powerbi/powerapps/ScenarioEditor`

## Data source parameterization

Power Query is expected to use a `DataSource` parameter so the team can switch from local CSV to SharePoint (or later SQL warehouse) without rewriting report logic.
