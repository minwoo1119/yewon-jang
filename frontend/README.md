## Environment

Create `.env.local` from [`.env.example`](/Users/minwoo/Documents/GitHub/yewon-jang/frontend/.env.example).

```bash
cp .env.example .env.local
```

Set `NEXT_PUBLIC_API_BASE_URL` to your backend API base URL.

Example:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
```

## Getting Started

Run the frontend on a different port from the backend.

```bash
npm install
npm run dev -- --port 3001
```

Start the backend separately, then open [http://localhost:3001](http://localhost:3001).

## Backend Endpoints

The frontend expects these backend endpoints:

- `GET /api/portfolio`
- `PUT /api/portfolio`
- `POST /api/admin/auth/login`
- `POST /api/admin/uploads/image`
