## Fix Summary for 403 Forbidden Error on Excel Upload

### Root Cause
The `/upload` route was restricted to only "admin" and "quality" roles. Users with "manager", "viewer", or "advisor" roles received a 403 Forbidden error when trying to upload Excel/CSV files.

### Changes Made

**1. `app.py` line 1016**
- Changed: `@roles("admin", "quality")` 
- To: `@roles("admin", "quality", "manager")`

This enables users with the "manager" role to upload Excel/CSV files for audit ingestion.

**2. `docs/permissions-matrix.md` line 34**
- Updated permissions matrix to reflect manager upload access:
- `| `/upload` | ✅ | ✅ | ✅ | ❌ | ❌ | File ingestion |`

### Result
- Managers can now upload Excel/CSV files without 403 errors
- Admin and Quality role access remains unchanged
- Fix is consistent with other data-entry routes in the application