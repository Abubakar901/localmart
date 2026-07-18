# LocalMart
A hyper-local marketplace app connecting customers with nearby neighbourhood stores.

## Tech Stack
- Next.js 15 (App Router) — frontend and backend in one app
- TypeScript
- Tailwind CSS
- NextAuth v5 (Google OAuth + Credentials)
- React Hot Toast
- MongoDB + Mongoose
- Nodemailer (SMTP email)
- Bcrypt (password hashing)
- Zod (validation)

## Features
- Google OAuth sign in
- Email/password authentication
- Forgot/reset password via email


---

## Setup

1. Clone the repo
```bash
   git clone https://github.com/Abubakar901/localMart
   cd localMart
```

2. Install dependencies
```bash
   npm install
```

3. Create a `.env` file in the root:
```env
   MONGODB_URL=your_mongodb_uri
   AUTH_GOOGLE_ID=your_google_client_id
   AUTH_GOOGLE_SECRET=your_google_client_secret
   AUTH_SECRET=your_random_secret
   SMTP_MAIL=your_email
   SMTP_PASSWORD=your_email_app_password
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SERVICE=gmail
   NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. Run the development server
```bash
   npm run dev
```

## Folder Structure

```
app/
├── api/
├──── (auth)/       — Auth pages (sign-in, sign-up, forgot-password)
components/
├── Auth/         — Auth components
├── ui/           — Reusable UI components
hooks/          — Custom hooks
lib/            — DB connection, utilities
models/         — Mongoose models
validators/     — Zod schemas
```

## Features
- Google OAuth sign in
- Email/password authentication
- Forgot/reset password via email

---

## Demo
Live link coming soon