# Website Technical Specification  
**Domain:** rccaolglenfinnan.org.uk (v2.0)  
**Last updated:** 19 September 2025  

---

## 1. Executive Summary  
This document defines the technical specification for the website of the Roman Catholic parishes of **St John the Evangelist, Caol** and **St Mary & St Finnan, Glenfinnan**.  

The site will be the **primary digital hub** for parishioners and visitors, providing Mass times, news, sacraments information, and contact details in a **welcoming, modern, and pastoral interface**.  

- **Architecture:** Serverless, using **Next.js** on **Vercel** with **Firebase** backend.  
- **Priorities:** Performance, scalability, security, maintainability, and minimal cost.  
- **Design Influence:** Inspired by *olem.org.uk* — uncluttered, accessible, and visually beautiful.  

---

## 2. Guiding Principles  

### 2.1 Pastoral UX Philosophy  
- **Serene & Welcoming:** Calm, uncluttered design reflecting the parish’s spirit.  
- **Pastoral Imagery:** High-quality photos of churches, landscape, and parish life.  
- **Accessibility:** Legible fonts, WCAG AA colour contrast, clear navigation.  
- **Simplicity:** Key info (e.g., Mass times, contact details) available within two clicks.  

### 2.2 Technical Philosophy  
- **Performance First:** Static Site Generation (SSG), optimised images, Vercel edge network.  
- **Cost Control:** Operate within free tiers of Firebase and Vercel.  
- **Maintainability:** CMS and codebase simple enough for a parish volunteer to manage.  

---

## 3. Scope  

### In Scope (MVP)  
- **Responsive Public Website** (desktop, tablet, mobile).  
- **Homepage:** Welcome, next Mass/service, news highlights, newsletter link.  
- **Parish Sections:** History, clergy, contact info.  
- **Mass & Service Times:** Editable schedules.  
- **News & Events:** Blog-style section with tagging per parish.  
- **Newsletter Archive:** PDFs of current/past newsletters.  
- **Sacraments Information:** Static pages (Baptism, Marriage, etc.).  
- **Photo Galleries:** Lightweight, performant.  
- **Contact Page:** Maps, secure anti-spam form.  
- **Admin CMS:** Authentication (with MFA), role-based access (admin/editor).  
- **Core Functionality:** Content management, uploads, donations (Stripe/PayPal).  
- **SEO Foundations:** Sitemap, metadata, JSON-LD for events.  

### Out of Scope (Post-MVP)  
- AI-assisted content generation.  
- Direct email marketing.  
- Livestreaming.  
- Parishioner accounts or forums.  
- Online shop/e-commerce.  

---

## 4. System Architecture  

- **Frontend:** Next.js 14+ (React, TypeScript) hosted on Vercel.  
- **Rendering:**  
  - **SSG** (default): Homepage, About, Sacraments, Contact.  
  - **ISR**: News & Events list page (regenerates every 15 minutes).  
- **Data Fetching:** Firestore via Firebase Web SDK (v9+).  
- **Backend:** Firebase (Firestore, Authentication, Storage) for core data; **n8n webhook** for contact form processing.  

---

## 5. Technology Stack  

- **Frontend:** Next.js, React, TypeScript, TailwindCSS, shadcn/ui.  
- **Backend:** Firebase (Firestore, Authentication, Storage) for core data; **n8n** for workflow automation (e.g., contact form).  
- **Rich Text:** TipTap (with backend sanitisation).  
- **Image Optimisation:** next/image (frontend) + Firebase resize/convert (backend).  
- **Donations:** Stripe & PayPal SDKs.  
- **CI/CD:** GitHub Actions → Vercel (staging/prod pipelines).  

---

## 6. Data Models (Firestore)  

### Parishes  
```json
{
  "id": "caol",
  "name": "St. John the Evangelist",
  "shortName": "Caol",
  "address": "St. John's Road, Caol, PH33 7PR",
  "contactInfo": {
    "email": "stjohnscaol@rcdai.org.uk",
    "phone": "01397 123456"
  },
  "aboutContent": "<p>Sanitized HTML...</p>",
  "clergyInfo": "<p>Sanitized HTML...</p>"
}
```  

### Schedule  
```json
{
  "title": "Sunday Mass",
  "dayOfWeek": "Sunday",
  "time": "11:00",
  "parishId": "caol",
  "type": "mass",
  "isActive": true,
  "notes": "All welcome.",
  "specialDate": null
}
```  

### News  
```json
{
  "title": "Parish Summer Fete a Great Success",
  "slug": "parish-summer-fete-2025-success",
  "content": "<p>Sanitized HTML...</p>",
  "excerpt": "A brief summary...",
  "authorName": "Parish Council",
  "createdAt": "Firebase Timestamp",
  "updatedAt": "Firebase Timestamp",
  "status": "published",
  "featuredImageUrl": "gs://bucket/image.webp",
  "parishTags": ["caol", "glenfinnan"],
  "type": "event", // 'news', 'event', or 'homily'
  "eventStartDate": "Firebase Timestamp",
  "eventEndDate": "Firebase Timestamp",
  "eventLocation": "St. John's Church Hall"
}
```  

### Newsletters  
```json
{
  "title": "Newsletter - 5th Sunday of Lent",
  "issueDate": "Firebase Timestamp",
  "fileUrl": "gs://bucket/newsletter.pdf",
  "parishTags": ["caol", "glenfinnan"]
}
```  

### Users  
```json
{
  "email": "priest@example.com",
  "displayName": "Fr. John Smith",
  "role": "admin"
}
```

### Galleries
```json
{
  "title": "Summer Fete 2025",
  "description": "Photos from our annual summer fete.",
  "createdAt": "Firebase Timestamp",
  "updatedAt": "Firebase Timestamp",
  "coverImageUrl": "gs://bucket/image.webp",
  "images": [
    {
      "url": "gs://bucket/image1.webp",
      "caption": "Optional caption for image 1"
    },
    {
      "url": "gs://bucket/image2.webp",
      "caption": "Optional caption for image 2"
    }
  ]
}
```

---

## 7. Security & Access Control  
```  

- **Admin Dashboard:** Firebase Auth with MFA.  
- **Firestore Rules:**  
  - Public read only for `status == published`.  
  - Write restricted to authenticated users with correct role.  
- **Storage Rules:**  
  - Public read for specific folders (images/, newsletters/).  
  - Write restricted to admins.  
- **Cloud Functions:** Secure with Auth token validation + App Check (for functions still in use). Contact form processing is now handled by n8n.  
- **Anti-Spam:** Cloudflare Turnstile or reCAPTCHA v3 (server-side validation).  
- **Accounts:** Each admin/editor must use a unique parish email address (no shared logins).  

---

## 8. Privacy & Compliance  

- Full **UK GDPR compliance**.  
- Privacy Policy + Terms of Service pages.  
- Contact form with explicit consent checkbox.  
- Cookie consent (for analytics, maps, and donation integrations).  
- Stripe/PayPal integration will follow **PCI DSS compliance**.  

---

## 9. Deployment & Environments  

- **Environments:**  
  - `rccaolglenfinnan-dev` (staging).  
  - `rccaolglenfinnan-prod` (production).  
- **CI/CD:**  
  - **Build Stability:** Enhanced build process robustness by resolving numerous linting (e.g., 'any' types, unused variables) and prerendering errors, ensuring consistent deployments.  
  - `develop` branch → staging.  
  - `main` branch → production.  
- **Secrets Management:** All API keys stored in Vercel environment variables.  
- **Preview Deployments:** Enabled for feature branches.  

---

## 10. Developer Tooling (Optional)  

- **Gemini CLI:** For scaffolding Cloud Functions, refactoring, and generating tests.  
- Use is optional and limited to the development team.  

---

## 11. Future Enhancements  

- Parish Calendar (Google Calendar integration).  
- AI-assisted SEO descriptions (Gemini API).  
- Multi-language support (Polish, Gaelic).  
- Progressive Web App (offline Mass times & contacts).  
