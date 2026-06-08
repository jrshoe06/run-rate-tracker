# DAX measures and TS parity notes

This model ports the forecast engine from `/lib/forecast/engine.ts`.

> Runtime DAX↔TS numeric parity is validated operationally with curated golden checks in this document plus CI model validation; this repo test suite does not execute a live tabular engine.

## Capacity

- **[Total Capacity Points]** — Ports `computeMonthlyCapacity()`.
- **[Eligible Capacity Points]** — Ports `getEligibleResources()` + `computeMonthlyCapacity()`.
- **[Available Capacity Points]** — Ports `runForecast()` available capacity step.
- **[Capacity Per Role]** — Honors attorney toggle.

## Demand

- **[Current Workload Burden]** — Ports `computeCurrentWorkloadBurden()`.
- **[Scenario Demand Points]** — Ports `computeDemandBurden()` even spread behavior.
- **[What-If Demand Points]** — Applies sliders (volume/spread/start offset).
- **[Total Demand Points]** — Scenario + What-If + current burden.

## Backlog (recursive carry-forward)

- **[New Backlog Points]** — `MAX(0, demand - available)`.
- **[Carried Backlog Points]** — Date-iteration carry-forward and drain equivalent.
- **[Ending Backlog Points]** — Ending state.
- **[Peak Backlog Points]** — Horizon max.
- **[Estimated Clearance Month]** — First zero month after first backlog.

If strict recursion is needed for engine-level parity, materialize a `BacklogByMonth` calculated table using `GENERATE` + `ADDCOLUMNS` and reference it from the measures.

## Risk

- **[Utilization Pct]**
- **[Risk Status]**
- **[Risk Color Hex]**

## Staffing and external outputs

- **[Required Additional FTE]**
- **[FTE Gap After What-If]**
- **[External Capacity Band]**
- **[External Completion Window]**
- **[External Recommended Action]**

## Test references

Behavior is pinned by `/tests/forecast.test.ts` (backlog creation/drain, utilization thresholds, FTE calculations).
