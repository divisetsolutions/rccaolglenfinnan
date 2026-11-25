# Catholic Parish of Caol and Glenfinnan website

**Live site:** [www.rccaolglenfinnan.org.uk](https://www.rccaolglenfinnan.org.uk)
**Last updated:** 25 November 2026

Source code for the website of the Catholic parish of **St John the Evangelist, Caol** and **St Mary & St Finnan, Glenfinnan**, in the Diocese of Argyll and the Isles.

## What the site does

- Mass times for the next fourteen days, with feast days, funerals and weeks without weekday Mass already applied, plus an away notice that switches itself off on the return date.
- A page for each church, and a sacraments page.
- Weddings at Glenfinnan: who can marry here, the steps and civil forms, an enquiry form, and a list of dates already booked (read from the parish Google Calendar; no names or other private details are shown).
- Sunday homilies, weekly newsletters and parish news, with news from the diocese, Scotland and Rome.
- Giving: each church has its own link through the diocese's MyGivingHub page. The site takes no payments itself.
- Prayer requests and a contact form, both sent through Formspree.
- An admin area (Firebase Authentication) for the schedule, news and newsletters.
- Search and sharing: page titles and descriptions, a sharing card for each page, structured data, a sitemap, `robots.txt` and `/llms.txt`.

## Technology

- [Next.js](https://nextjs.org/) 15 (App Router, TypeScript) with Tailwind CSS
- Firebase: Firestore, Authentication and Storage (`firestore.rules`, `storage.rules`)
- Hosting on Vercel. Pushing to `main` deploys to production.

## Layout

```
src/app         pages (App Router)
src/components  shared components
src/lib         page wording, data access, schedule logic, structured data
public/img      photos
scripts         homily and newsletter publishing
```

Most fixed page wording lives in `src/lib/content.ts`, `src/lib/weddings.ts` and `src/lib/book.ts`.

## Running it locally

```bash
npm install
npm run dev
```

Create `.env.local` with:

```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
GEMINI_API_KEY=
WEDDING_CALENDAR_ICS=
```

`WEDDING_CALENDAR_ICS` is the calendar's secret address. It is set only in Vercel and must never be committed, because this repository is public. Without it the booked dates list hides itself.

## Credits

Parish of St John the Evangelist, Caol, and St Mary & St Finnan, Glenfinnan, Diocese of Argyll and the Isles.

## Licence

See [LICENSE](./LICENSE).
