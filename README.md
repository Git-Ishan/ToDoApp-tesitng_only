# TaskFlow Todo App

A responsive todo app built with plain HTML, CSS, and JavaScript. No build step or framework is required.

## Run locally

1. Extract this folder.
2. Open `index.html` in your browser, or use the VS Code Live Server extension.
3. Add, complete, filter, and delete tasks. Tasks are stored in this browser's `localStorage`.

## Deploy on Vercel

### Option A — GitHub (recommended)

1. Create or sign in to a GitHub account.
2. Create a new repository, for example `taskflow-todo`.
3. Upload `index.html`, `style.css`, and `script.js` to the repository root.
4. Sign in to Vercel and choose **Add New → Project**.
5. Import the GitHub repository.
6. For a plain HTML/CSS/JS project, leave the framework preset as **Other** and leave build and output directory settings empty/default. Deploy.
7. Open the Vercel-provided URL and test the app.

After you push changes to the connected GitHub branch, Vercel will normally build and deploy the update automatically.

### Option B — Vercel CLI

Install Node.js first, then run:

```bash
npm install --global vercel
cd taskflow-todo-app
vercel
```

Follow the prompts. When ready to publish a production deployment, run `vercel --prod`.

## Connect a domain purchased through Hostinger

You can keep the domain registered at Hostinger; you do not need to transfer it to Vercel.

1. Open the project in Vercel → **Settings → Domains**.
2. Add the domain you want to use, such as `www.example.com` or `todo.example.com`.
3. Vercel will show the DNS record(s) required for that domain. Use the exact values it provides.
4. In Hostinger, open **hPanel → Domains → your domain → DNS / Nameservers** (the wording may vary).
5. Add or update the requested DNS record(s). For a subdomain, this is commonly a CNAME; for an apex/root domain, Vercel may request an A record or another supported configuration. Do not guess the value—copy the values displayed by Vercel.
6. Return to Vercel and wait for domain verification and HTTPS certificate setup. DNS propagation can take time.

If you use existing email on your domain, do not delete or replace MX, SPF, DKIM, or other email-related DNS records. If you already have records for the website, review them before changing anything.

## Important

- This is a static frontend. There is no account system or shared database.
- Tasks are stored in `localStorage` in the current browser on the current device. They will not automatically sync to another device or user.
- The Google Fonts import requires an internet connection; system fallback fonts are used if it is unavailable.
