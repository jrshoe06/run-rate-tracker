# Run Rate Tracker — Demand Planning Dashboard

A POC dashboard for legal operations capacity planning, focused on immigration case demand forecasting for the Google account.

## Tech Stack

- **Next.js 14** (App Router) + TypeScript
- **Tailwind CSS** for styling
- **Recharts** for data visualizations
- **Vitest** + `@testing-library/react` for tests
- **Mock data** — local TS fixtures, no external DB

## Features

- **Demand vs Capacity forecasting** — month-by-month horizon across 12 months
- **Backlog tracking** — carry-forward logic with drain/clearance detection
- **Risk classification** — On Track / At Risk / Capacity Constrained thresholds
- **4 seeded scenarios** — H-1B Extensions, H-1B, Amendments, PERM
- **Custom scenario builder** — create and compare new demand scenarios
- **Internal view** — full resource roster, staffing details, FTE gap analysis
- **External/client view** — redacted output safe to share with Google (no PII, no staffing details)
- **Assumptions panel** — tune capacity, risk thresholds, horizon, and filters live
- **Forecast API** — `POST /api/forecast` for programmatic access

## Project Structure

```
run-rate-tracker/
├── app/                     # Next.js App Router pages
│   ├── page.tsx             # Main dashboard (client component)
│   ├── scenarios/page.tsx   # Scenario management
│   ├── internal/page.tsx    # Internal resource view
│   ├── external/page.tsx    # Redacted client-facing view
│   └── api/forecast/        # REST API route
├── components/
│   ├── ui/                  # Card, Badge (RiskBadge)
│   ├── dashboard/           # KpiCard, 6 chart components
│   ├── scenarios/           # ScenarioForm, ScenarioList
│   ├── views/               # InternalView, ExternalView, ViewToggle
│   └── assumptions/         # AssumptionsPanel
├── data/                    # Mock data fixtures
│   ├── resources.ts         # 25 paralegals + 7 attorneys
│   ├── skillMappings.ts     # Per-resource case type eligibility
│   ├── productivityWeights.ts
│   ├── currentWorkload.ts   # ~150 active cases
│   └── scenarios.ts         # 4 seeded demand scenarios
├── lib/
│   ├── forecast/
│   │   ├── engine.ts        # Core forecast algorithm (pure functions)
│   │   ├── eligibility.ts   # Skill mapping resolution helpers
│   │   └── redact.ts        # toExternalView() — redaction module
│   ├── assumptions.ts       # Default assumptions
│   └── utils.ts             # Date, number, class utilities
├── types/index.ts           # All TypeScript interfaces
└── tests/                   # Vitest test files
    ├── forecast.test.ts
    ├── eligibility.test.ts
    └── redact.test.ts
```

## Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
npm test         # Run Vitest unit tests
npm run build    # Production build
```

## Forecast Algorithm

1. **Eligibility** — identify resources with `Primary` or `Secondary` capability for the case type, active, and within effective date range
2. **Capacity** — sum monthly capacity points across eligible resources, adjusted for unavailable dates
3. **Workload burden** — subtract existing active case load from available capacity
4. **Demand spreading** — divide scenario volume × productivity weight evenly across the intake window
5. **Monthly loop** — compare `demand + carried backlog` vs `available capacity`; create or drain backlog
6. **Risk classification** — utilization < 85% → On Track; 85–100% → At Risk; ≥ 100% → Capacity Constrained

## Forecast API

```http
POST /api/forecast
Content-Type: application/json

{
  "scenario": {
    "scenarioId": "MY-001",
    "scenarioName": "Custom Scenario",
    "clientName": "Google",
    "caseType": "H-1B",
    "projectedVolume": 200,
    "projectedStartMonth": "2026-07",
    "targetCompletionMonth": "2026-09"
  },
  "assumptions": {
    "forecastHorizonMonths": 12
  }
}
```

## Redaction Contract

`toExternalView()` strips all of the following before returning a client-safe payload:
- Individual resource names and IDs
- Per-person capacity data
- Raw skill mappings and capability levels
- Individual case details

The `deepScanForForbiddenKeys()` utility is used in tests to verify no forbidden fields leak through.

## Test Coverage

| File | Tests |
|------|-------|
| `tests/forecast.test.ts` | 8 tests — backlog creation, carry-forward, drain, FTE math, risk thresholds |
| `tests/eligibility.test.ts` | 7 tests — capability level filtering, date ranges, inactive resources |
| `tests/redact.test.ts` | 5 tests — forbidden key scanning, external view shape |

## Power BI deployment

A parallel Power BI implementation lives in [`/powerbi`](./powerbi). The React POC remains the executable spec; the Power BI build is the reporting-team-owned artifact that reads the same mock data. See [`/powerbi/README.md`](./powerbi/README.md).
