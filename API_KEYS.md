# API Keys Reference

This file lists all required API keys / environment variables for Unhinged Threads.

**Never commit real keys to git.**

---

## Required Keys

### Supabase
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Printful
- `PRINTFUL_API_KEY`

### Google Analytics (optional)
- `NEXT_PUBLIC_GA_ID`

---

## How to add them

1. Create / edit `.env.local` in the project root
2. Add the keys like this:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

PRINTFUL_API_KEY=your-printful-api-key

NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

3. Restart the dev server after changing `.env.local`

---

## Current Status

- [x] Supabase keys added
- [x] Printful key added
- [ ] Google Analytics (optional)

---

Last updated: May 2026
