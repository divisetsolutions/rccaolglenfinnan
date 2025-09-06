# RCCAOL Glenfinnan Website (v2.0)

**Domain:** [rccaolglenfinnan.org.uk](https://rccaolglenfinnan.org.uk)  
**Last updated:** 5 September 2025  

This repository contains the source code and configuration for the official website of the Roman Catholic parishes of **St John the Evangelist, Caol** and **St Mary & St Finnan, Glenfinnan**.  

The website serves as the **primary digital hub** for parishioners and visitors, providing Mass times, news, newsletters, and information about the sacraments.  

---

## ✨ Features

- Fully responsive design (desktop, tablet, mobile).  
- Homepage with next Mass/service, news highlights, and newsletter link.  
- Dedicated parish sections (Caol & Glenfinnan).  
- Editable Mass & Service schedule.  
- News & Events blog with tagging per parish.  
- Newsletter archive (PDF uploads).  
- Sacraments information (Baptism, Marriage, etc.).  
- Photo galleries for parish life.  
- Secure contact form (with spam protection).  
- Online donations (Stripe & PayPal).  
- Admin CMS with Firebase Authentication & MFA.  
- SEO-friendly (sitemap, metadata, JSON-LD).  

---

## 🛠 Technology Stack

- **Frontend:** [Next.js 14+](https://nextjs.org/) (React, TypeScript)  
- **Styling:** TailwindCSS, [shadcn/ui](https://ui.shadcn.com/)  
- **Backend-as-a-Service:** Firebase (Firestore, Authentication, Cloud Functions, Storage)  
- **Rich Text Editor:** TipTap (with backend sanitisation)  
- **Image Optimisation:** `next/image` + Firebase Resize Images extension  
- **Donations:** Stripe & PayPal SDKs  
- **CI/CD:** GitHub Actions → Vercel (staging & production)  

---

## 📂 Project Structure

```
/src
  /app        # Next.js App Router
  /components # Shared React components
  /styles     # TailwindCSS config
  /lib        # Utility functions (Firebase SDK, helpers)
/functions    # Firebase Cloud Functions
```

---

## ⚡️ Development Setup

### Prerequisites
- Node.js 18+  
- Yarn or npm  
- Firebase CLI (`npm install -g firebase-tools`)  
- Vercel CLI (`npm install -g vercel`)  

### Installation
```bash
git clone https://github.com/<your-org>/rccaolglenfinnan.org.uk.git
cd rccaolglenfinnan.org.uk
npm install
```

### Environment Variables
Create a `.env.local` file in the root with:

```
NEXT_PUBLIC_FIREBASE_API_KEY=xxxx
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxxx
NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxxx
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=xxxx
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=xxxx
NEXT_PUBLIC_FIREBASE_APP_ID=xxxx
STRIPE_SECRET_KEY=xxxx
PAYPAL_CLIENT_ID=xxxx
SENDGRID_API_KEY=xxxx
```

*(Values are provided via Firebase Console & Stripe/PayPal dashboards.)*

---

## 🚀 Running the Project

### Local Development
```bash
npm run dev
```
Runs the Next.js frontend on `http://localhost:3000` with Firebase emulators.

### Deploy to Staging
Push changes to the `develop` branch.  
GitHub Actions will automatically deploy to the **staging environment** on Vercel.

### Deploy to Production
Merge/push to the `main` branch.  
GitHub Actions will deploy to **production** at [rccaolglenfinnan.org.uk](https://rccaolglenfinnan.org.uk).

---

## 🔒 Security & Compliance

- Admin CMS protected by Firebase Authentication with MFA.  
- Role-based access (admin, editor).  
- Firestore and Storage rules restrict write access to authenticated users.  
- Cloudflare Turnstile / reCAPTCHA v3 for anti-spam.  
- Fully **UK GDPR compliant**, with Privacy Policy & Terms of Service.  
- Stripe & PayPal integrations follow **PCI DSS** standards.  

---

## 📈 Future Enhancements

- Parish calendar integration (Google Calendar).  
- AI-assisted SEO descriptions (Gemini API).  
- Multi-language support (Polish, Gaelic).  
- Progressive Web App (offline access to Mass times & contacts).  

---

## 🙏 Credits

- Parish of St John the Evangelist, Caol  
- Parish of St Mary & St Finnan, Glenfinnan  
- Diocese of Argyll & the Isles  

---

## 📜 License

This project is maintained by the parish and its collaborators.  
See [LICENSE](./LICENSE) for details.