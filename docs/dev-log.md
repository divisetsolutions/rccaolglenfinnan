# RCCAOL Glenfinnan - Development Log

**Project Start:** 6 September 2025

This log will track the development progress, key decisions, and actions taken while building the RCCAOL Glenfinnan website (v2.0).

---

### Session 1: Project Initialization

*   **[2025-09-06]** User requested the creation of this development log.
*   **[2025-09-06]** Confirmed project plan based on `techspec.md` and `README.md`.
*   **[2025-09-06]** Initialized Next.js project with TypeScript, Tailwind CSS, and App Router.
*   **[2025-09-06]** Configured `shadcn/ui` and `tailwindcss-animate`.
*   **[2025-09-06]** Set up Firebase project and integrated with the application.
*   **[2025-09-06]** Created basic site layout and homepage structure.
*   **[2025-09-06]** Implemented main navigation and created placeholder pages for News, Newsletters, Sacraments, and Contact.
*   **[2025-09-06]** Created dynamic route for parish pages.
*   **[2025-09-06]** Created a seed script for parish data and connected the dynamic parish pages to Firestore.
*   **[2025-09-06]** Implemented the News & Events blog with a seed script, dynamic article pages, and a news list page.
*   **[2025-09-06]** Implemented the Newsletter archive with a seed script and a page to display the list of newsletters.
*   **[2025-09-06]** Implemented the basic Admin CMS with a login page, protected dashboard, and authentication context.
*   **[2025-09-06]** Built out the content management features for News & Events in the Admin Dashboard, including creating, editing, and deleting articles.
*   **[2025-09-06]** Implemented the content management features for Newsletters, including uploading and deleting.
*   **[2025-09-06]** Implemented the editable Mass & Service schedule with a seed script, admin management page, and public display component.
*   **[2025-09-06]** Implemented the secure contact form with a Firebase Cloud Function for sending emails.
*   **[2025-09-06]** Implemented online donations with Stripe and PayPal.
*   **Next Action:** The core features of the website are now implemented. The next steps would be to deploy the site, and work on the future enhancements listed in the tech spec.

---

### Session 2: Local Environment Setup & Admin Feature Testing

*   **[2025-09-06]** Guided user through setting up the local development environment, including creating and configuring a new Firebase project.
*   **[2025-09-06]** Assisted with creating the first admin user in Firebase Authentication.
*   **[2025-09-06]** Debugged and resolved a Firestore index issue required for querying news articles.
*   **[2025-09-06]** Debugged and resolved a server-side rendering (SSR) issue with the Tiptap rich text editor on both the "new article" and "edit article" pages.
*   **[2025-09-06]** Successfully tested the full CRUD (Create, Read, Update, Delete) functionality for the "News & Events" section.
*   **[2025-09-06]** Successfully tested the upload, view, and delete functionality for the "Newsletters" section.
*   **[2025-_09-06]** Implemented the missing UI form for adding new schedule items in the admin dashboard.
*   **[2025-09-06]** Successfully tested adding and deleting items in the "Schedule" section.
*   **Next Action:** With all admin features tested and confirmed working, the next step is to deploy the website.

---

### Session 3: Security Hardening & Cloud Function Deployment

*   **[2025-09-06]** Performed a security review of the codebase.
*   **[2025-09-06]** Added the `.serviceAccountKey.json` file to `.gitignore` to prevent committing sensitive credentials.
*   **[2025-09-06]** Confirmed that no other sensitive information is hardcoded in the repository.
*   **[2025-09-06]** Addressed the `functions.config()` deprecation in the Firebase Cloud Function by migrating to `.env` variables.
*   **[2025-09-06]** Initialized the project as a Firebase project by creating a `firebase.json` file.
*   **[2025-09-06]** Resolved multiple deployment errors for the cloud function, including missing runtime and package dependencies.
*   **[2025-09-06]** Successfully deployed the `sendContactEmail` cloud function to Firebase.
*   **Next Action:** With the backend function deployed and all admin features tested, the project is ready for front-end deployment.

---

### Session 4: Vercel Deployment Troubleshooting

*   **[2025-09-09]** Attempted to deploy the front-end to Vercel.
*   **[2025-09-09]** Encountered persistent build failures during the deployment process.
*   **[2025-09-09]** The build failure issue has been escalated to the senior team for investigation.
*   **[2025-09-09]** Reverted the project to the last known stable state pending resolution.
*   **Next Action:** Await feedback from the senior team and investigate alternative deployment strategies or troubleshoot the Vercel build issue.

---

### Session 5: Deployment Success & Next Steps

*   **[2025-09-09]** Resumed troubleshooting of Vercel deployment failures.
*   **[2025-09-09]** Identified and fixed a misconfiguration in `tailwind.config.ts` related to Tailwind CSS v4.
*   **[2025-09-09]** Diagnosed and resolved missing environment variables (`STRIPE_SECRET_KEY` and Firebase config) in the Vercel build environment.
*   **[2025-09-09]** Temporarily disabled TypeScript build errors in `next.config.ts` to work around a known Next.js 15 bug.
*   **[2025-09-09]** Successfully deployed the website to Vercel.
*   **Next Action:** Begin UI/UX improvements based on the `techspec.md` to create a more serene and welcoming design.

---

### Session 6: Homepage UI Improvements

*   **[2025-09-09]** Began UI/UX improvements based on the `techspec.md`.
*   **[2025-09-09]** Added a hero image carousel to the homepage to showcase both parishes.
*   **[2025-09-09]** Installed and configured the `shadcn/ui` Carousel component and its dependencies.
*   **[2025-09-09]** Added the parish logo to the main navigation bar.
*   **[2025-09-09]** Replaced the default favicon with the parish logo.
*   **[2025-09-09]** Debugged and resolved several build and runtime errors related to missing dependencies and incorrect component usage.
*   **Next Action:** Continue with UI/UX improvements, focusing on the rest of the homepage and other key pages.
