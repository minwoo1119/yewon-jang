# Backend

NestJS backend for the research portfolio.

## API

Base prefix: `/api`

Available endpoints:

- `GET /api/health`
- `GET /api/portfolio`
- `PUT /api/portfolio`
- `POST /api/admin/auth/login`
- `POST /api/admin/uploads/image`

## Environment

Use [`.env.example`](/Users/minwoo/Documents/GitHub/yewon-jang/backend/.env.example) as the starting point.

Required values:

- `PORT`
- `FRONTEND_ORIGIN`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `PORTFOLIO_ADMIN_PASSWORD`

Optional values:

- `SUPABASE_PORTFOLIO_TABLE`
- `SUPABASE_STORAGE_BUCKET`

## Supabase Setup

Run the SQL in [setup.sql](/Users/minwoo/Documents/GitHub/yewon-jang/backend/supabase/setup.sql) in Supabase SQL Editor.

It creates:

- `portfolio_content` table
- update trigger for `updated_at`
- `portfolio-images` public storage bucket

## Server Deployment

### 1. Install and build

```bash
npm install
npm run build
```

### 2. Prepare environment

```bash
cp .env.example .env
```

Fill in the actual Supabase and admin password values.

### 3. Run as a service

Example `systemd` unit:

- [portfolio-backend.service](/Users/minwoo/Documents/GitHub/yewon-jang/backend/deploy/systemd/portfolio-backend.service)

Adjust:

- `WorkingDirectory`
- `EnvironmentFile`
- `User`
- `Group`

Then install it:

```bash
sudo cp deploy/systemd/portfolio-backend.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable portfolio-backend
sudo systemctl start portfolio-backend
```

### 4. Nginx reverse proxy

Example Nginx config:

- [portfolio-backend.conf](/Users/minwoo/Documents/GitHub/yewon-jang/backend/deploy/nginx/portfolio-backend.conf)

This example assumes:

- backend app runs on `127.0.0.1:3000`
- public domain is `yewon.duckdns.org`
- SSL is managed by Certbot

It also includes:

- forwarded headers
- `client_max_body_size 25M` for image upload
- ACME challenge path for Certbot

### 5. Production Notes

- The backend trusts the reverse proxy and reads forwarded headers.
- Image uploads currently go to Supabase Storage through the backend.
- Admin login currently validates against `PORTFOLIO_ADMIN_PASSWORD`.
- Frontend CORS is controlled by `FRONTEND_ORIGIN`.

## Validation

Validated locally:

- `npm run build`
- `npm run lint`
- `JEST_USE_WATCHMAN=0 npm test -- --runInBand --watchman=false`

`test:e2e` could not be completed in this sandbox because opening a local listener is blocked by the environment.
