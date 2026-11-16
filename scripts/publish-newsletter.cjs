// Publish newsletter PDFs to the website.
// Usage: node scripts/publish-newsletter.cjs <folder of YYYY-MM-DD.pdf files>
const admin = require('firebase-admin');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const bucketName = 'rccaolglenfinnan-rcdai.firebasestorage.app';
admin.initializeApp({ credential: admin.credential.cert(require(path.join(__dirname, '..', '.serviceAccountKey.json'))), storageBucket: bucketName });
(async () => {
  const dir = process.argv[2];
  const bucket = admin.storage().bucket();
  for (const file of fs.readdirSync(dir).filter((f) => /^\d{4}-\d{2}-\d{2}\.pdf$/.test(f)).sort()) {
    const date = file.slice(0, 10);
    const dest = `newsletters/newsletter-${date}.pdf`;
    const token = crypto.randomUUID();
    await bucket.upload(path.join(dir, file), { destination: dest, metadata: { contentType: 'application/pdf', cacheControl: 'public, max-age=3600', metadata: { firebaseStorageDownloadTokens: token } } });
    const fileUrl = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodeURIComponent(dest)}?alt=media&token=${token}`;
    const title = `Parish newsletter, ${new Date(`${date}T12:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })}`;
    await admin.firestore().collection('newsletters').doc(`newsletter-${date}`).set({ title, fileUrl, issueDate: admin.firestore.Timestamp.fromDate(new Date(`${date}T12:00:00Z`)), parishTags: ['caol', 'glenfinnan'] });
    console.log('published', title);
  }
})().catch((e) => { console.error('ERR', e.message); process.exit(1); });
