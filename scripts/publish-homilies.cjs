// Publish homilies prepared by homilies_to_json.py to the website database.
// Usage: node scripts/publish-homilies.cjs <homilies.json>
const admin = require('firebase-admin');
const path = require('path');
admin.initializeApp({ credential: admin.credential.cert(require(path.join(__dirname, '..', '.serviceAccountKey.json'))) });
(async () => {
  const items = JSON.parse(require('fs').readFileSync(process.argv[2], 'utf8'));
  const col = admin.firestore().collection('news');
  let n = 0;
  for (const h of items) {
    const when = admin.firestore.Timestamp.fromDate(new Date(`${h.date}T12:00:00Z`));
    await col.doc(h.id).set({
      title: h.title, slug: h.id, occasion: h.occasion, excerpt: h.excerpt, content: h.content,
      type: 'homily', status: 'published', authorName: 'Fr Charles Egbon', parishTags: ['caol', 'glenfinnan'],
      createdAt: when, updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    }, { merge: true });
    n++;
  }
  console.log(n, 'homilies published');
})().catch((e) => { console.error('ERR', e.message); process.exit(1); });
