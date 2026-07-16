# Multi-Tenant CRM/ERP Platform — Architecture

## Current State (codebase today)

Frontend: Next.js 16 with Tailwind CSS 4
Auth: Supabase OTP (email-only)
Database: Supabase Postgres (3 tables: profiles, workflows, dashboard_stats)
Deployment: Vercel (auto-deploys from GitHub)

## Target Architecture: Multi-Tenant CRM/ERP

### 1. Multi-Tenant Model

Each tenant = one organization. Users belong to one organization.

```
organizations            users                    roles
┌──────────────┐        ┌──────────────────┐     ┌──────────────┐
│ id (uuid) PK │◄──┐   │ id (uuid) PK     │     │ id (uuid) PK │
│ name         │   └───│ org_id (FK)       │◄────│ name         │
│ slug         │       │ email             │     │ permissions  │
│ created_at   │       │ role_id (FK)      │     └──────────────┘
└──────────────┘       │ created_at        │
                       └──────────────────┘
```

Every data table gets `org_id` for isolation. RLS policies filter by `org_id`.

### 2. Core Modules

| Module | Tables | Purpose |
|--------|--------|---------|
| **Auth & Org** | organizations, users, roles, invitations | Login, org setup, user mgmt |
| **CRM** | contacts, deals, activities, notes | Sales pipeline, lead tracking |
| **ERP** | invoices, products, orders | Billing, inventory, purchases |
| **Projects** | projects, tasks, time_entries | Project management, timesheets |
| **Files** | files, folders | Document storage per org |

### 3. Supabase RLS Strategy

All tables have `org_id`. Policies check `auth.org_id()` (a custom JWT claim set at login).

```sql
-- Helper function
create or replace function public.org_id() returns uuid
  language sql stable
  as $$ select coalesce(
    (select raw_user_meta_data->>'org_id' from auth.users where id = auth.uid()),
    '00000000-0000-0000-0000-000000000000'
  )::uuid $$;

-- Example RLS policy for every table
create policy "tenant_isolation" on contacts
  for all using (org_id = org_id());
```

### 4. Frontend Routing

```
/                           → Landing / marketing page (public)
/login                      → Auth (OTP)
/verify                     → OTP verification
/app                        → App shell (sidebar + header)
  /app/{org_slug}/dashboard → Org dashboard with KPIs
  /app/{org_slug}/crm       → Contacts, deals, pipeline
  /app/{org_slug}/erp       → Invoices, products
  /app/{org_slug}/projects  → Projects & tasks
  /app/{org_slug}/settings  → Org settings, invite users
```

### 5. Component Tree

```
Navbar (public)
└── Public pages (/, /login, /verify, /contact, /portfolio, /profile)

AppShell (protected)
├── Sidebar (org nav: dashboard, crm, erp, projects, settings)
├── Header (org name, user menu, notifications)
└── Main content area (page-specific components)
    ├── DashboardPage (KPIs, charts, recent activity)
    ├── CRMPage
    │   ├── ContactsTable
    │   ├── DealPipeline (Kanban)
    │   └── ActivityTimeline
    ├── ERPPage
    │   ├── InvoiceList
    │   ├── ProductCatalog
    │   └── OrderHistory
    ├── ProjectsPage
    │   ├── ProjectBoard
    │   └── TaskList
    └── SettingsPage
        ├── OrgProfile
        ├── UserManagement
        └── InviteForm
```

### 6. Build Order (Phased)

**Phase 1 — Foundation** (critical path)
- Organizations table + signup flow (create org on first login)
- RLS helper functions + org_id on all data tables
- App shell layout with sidebar
- Org settings page (name, members)

**Phase 2 — CRM Core**
- Contacts table + CRUD UI
- Deals pipeline (Kanban view)
- Activities / notes

**Phase 3 — ERP Core**
- Invoices (create, send, track payment)
- Products / services catalog
- Orders

**Phase 4 — Projects & Automation**
- Projects + tasks
- Automations (email reminders, webhooks)
- Reporting

### 7. Key Design Decisions

| Decision | Choice | Why |
|----------|--------|-----|
| Tenant model | Organization-based (not user-based) | Real companies have multiple users |
| RLS approach | `org_id` column on every table + helper function | Simple, readable, no JOIN overhead |
| Org slug in URL | `/app/{slug}/...` | Clean URLs, scoped data |
| User roles | admin, member, viewer | Fine-grained access per org |
| Invitation flow | OTP email with org context | Reuses existing Supabase auth |
| UI framework | Tailwind only (no shadcn) | Already established, lightweight |
