# Dova Futures Limited Website

Production-ready single-page website with Express backend contact handler.

## Features
- Contact form with backend email delivery to `info@dovafutures.com`
- Frontend + backend validation
- Honeypot spam protection
- Dual submit options: **Send Email** and **Send via WhatsApp**
- Active social links (Instagram, TikTok, WhatsApp)
- Structured asset paths under `/assets`

## Run locally
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy env file:
   ```bash
   cp .env.example .env
   ```
3. Fill SMTP values in `.env`.
4. Start server:
   ```bash
   npm start
   ```
5. Open `http://localhost:3000`.

## Environment variables
See `.env.example` for required values.
