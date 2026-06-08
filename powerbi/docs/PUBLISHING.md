# Publishing automation

## One-time tenant setup

1. Create Entra ID app registration (service principal).
2. Grant API permissions for Power BI/Fabric deployment (admin consent).
3. Add app to target workspace with Member or Admin role.
4. Enable required Fabric tenant settings for service principals.

## GitHub secrets

Add repository secrets:

- `POWERBI_TENANT_ID`
- `POWERBI_CLIENT_ID`
- `POWERBI_CLIENT_SECRET`
- `POWERBI_WORKSPACE_ID`

## Workflow behavior

- `validate` always runs on PR/path changes.
- `publish` only runs on `main` pushes and skips cleanly when secrets are missing.
- Deployment uses import overwrite flow for `.pbip` bundle.

## Rollback

- Re-run workflow from prior commit or re-import prior artifact.
- Maintain tagged baseline releases for semantic model/report rollback.
