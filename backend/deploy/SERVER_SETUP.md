# Server Setup

This project is expected to run with:

- frontend on `127.0.0.1:3001`
- backend on `127.0.0.1:3000`
- Nginx serving `https://yewon.duckdns.org`
- `/` proxied to the frontend
- `/api/` proxied to the backend

## 1. Upload the project

Example server path:

```bash
/srv/portfolio
```

Expected layout:

```text
/srv/portfolio/frontend
/srv/portfolio/backend
```

## 2. Prepare the backend

```bash
cd /srv/portfolio/backend
npm install
npm run build
cp .env.example .env
```

Fill in `.env`:

```env
PORT=3000
FRONTEND_ORIGIN=https://yewon.duckdns.org

SUPABASE_URL=https://<your-project-ref>.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<your-secret-key>
SUPABASE_PORTFOLIO_TABLE=portfolio_content
SUPABASE_STORAGE_BUCKET=portfolio-images

PORTFOLIO_ADMIN_PASSWORD=<admin-password>
```

## 3. Prepare the frontend

```bash
cd /srv/portfolio/frontend
npm install
npm run build
cp .env.example .env.production
```

Fill in `.env.production`:

```env
NEXT_PUBLIC_API_BASE_URL=https://yewon.duckdns.org/api
```

## 4. Install the backend service

Copy the example systemd unit:

```bash
sudo cp /srv/portfolio/backend/deploy/systemd/portfolio-backend.service /etc/systemd/system/
```

If your server path is not `/srv/portfolio/backend`, edit the file first:

- `WorkingDirectory`
- `EnvironmentFile`
- `ExecStart` if needed
- `User`
- `Group`

Then enable it:

```bash
sudo systemctl daemon-reload
sudo systemctl enable portfolio-backend
sudo systemctl start portfolio-backend
sudo systemctl status portfolio-backend
```

## 5. Install the frontend service

Copy the example frontend unit:

```bash
sudo cp /srv/portfolio/frontend/deploy/systemd/portfolio-frontend.service /etc/systemd/system/
```

If your server path is not `/srv/portfolio/frontend`, edit the file first:

- `WorkingDirectory`
- `EnvironmentFile`
- `ExecStart`
- `User`
- `Group`

Then enable it:

```bash
sudo systemctl daemon-reload
sudo systemctl enable portfolio-frontend
sudo systemctl start portfolio-frontend
sudo systemctl status portfolio-frontend
```

## 6. Install the Nginx config

Copy the domain config:

```bash
sudo cp /srv/portfolio/backend/deploy/nginx/yewon.duckdns.org.conf /etc/nginx/sites-available/yewon.conf
sudo ln -s /etc/nginx/sites-available/yewon.conf /etc/nginx/sites-enabled/yewon.conf
```

If another file already uses `yewon.duckdns.org`, remove or replace it first.

Check and reload Nginx:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

## 7. Issue the certificate

If SSL is not created yet:

```bash
sudo certbot --nginx -d yewon.duckdns.org
```

## 8. Verify

Backend on the server:

```bash
curl http://127.0.0.1:3000/api/health
curl http://127.0.0.1:3000/api/portfolio
```

Frontend on the server:

```bash
curl http://127.0.0.1:3001
```

Public domain:

```bash
curl https://yewon.duckdns.org/api/health
curl https://yewon.duckdns.org
```

## Notes

- The backend currently reads `.env` from the backend working directory.
- The frontend should use `NEXT_PUBLIC_API_BASE_URL=https://yewon.duckdns.org/api`.
- The frontend production env file in this guide is `.env.production`.
- `client_max_body_size 25M` is included for image uploads.
- Do not expose `SUPABASE_SERVICE_ROLE_KEY` to the frontend.
