// Wording for the weddings page. Edit here, not in the page files.
// Source: the parish "Marriage Guidelines for Glenfinnan" and the Marriage Enquiry Form.

export const REGISTRAR = {
  name: 'Fort William Registration Office',
  phone: '01397 704583',
  href: 'tel:+441397704583',
  guide: 'https://www.nrscotland.gov.uk/registration/registering-a-marriage-or-civil-partnership/',
};

/** Wedding photographs, shown as a ribbon once there are at least four. Add a focal point in FOCUS (content.ts) for each. */
export const WEDDING_PHOTOS: { src: string; alt: string }[] = [];

export type SituationId = 'catholic' | 'mixed' | 'unbaptised' | 'civil' | 'neither';
export type HomeId = 'parish' | 'scotland' | 'abroad';

export const SITUATIONS: { id: SituationId; label: string; heading: string; summary: string; papers: string[]; note?: string }[] = [
  {
    id: 'catholic',
    label: 'We are both Catholic',
    heading: 'Two Catholics marrying in the Church',
    summary: 'This is the simplest path. You prepare with a priest, gather your papers, and the Church gladly witnesses your vows.',
    papers: [
      'A baptism certificate for each of you, issued within the last six months.',
      'Your confirmation certificates, if you have been confirmed.',
      'Evidence that you are both free to marry.',
      'The pre-nuptial enquiry form, which a priest completes with you.',
      'A certificate from a marriage preparation course.',
    ],
  },
  {
    id: 'mixed',
    label: 'One of us is Catholic, the other is a baptised Christian',
    heading: 'A Catholic marrying a baptised Christian',
    summary: 'Many couples marry this way at Glenfinnan. The priest who prepares you asks the bishop for a permission on your behalf, and it is usually a simple matter.',
    papers: [
      'A recent baptism certificate for the Catholic partner, and a baptism certificate for the other partner.',
      'A confirmation certificate for the Catholic partner, if confirmed.',
      'Evidence that you are both free to marry.',
      'The pre-nuptial enquiry form, which a priest completes with you.',
      'A certificate from a marriage preparation course.',
      'The bishop’s permission, which your priest applies for.',
    ],
    note: 'The Catholic partner promises to keep practising the faith and to do all they can to have your children baptised and brought up as Catholics. The other partner is told about this promise and is not asked to make it.',
  },
  {
    id: 'unbaptised',
    label: 'One of us is Catholic, the other is not baptised',
    heading: 'A Catholic marrying someone who is not baptised',
    summary: 'You can be married in the Church. The priest who prepares you asks the bishop for a dispensation, so please allow a little more time.',
    papers: [
      'A baptism certificate for the Catholic partner, issued within the last six months.',
      'A confirmation certificate for the Catholic partner, if confirmed.',
      'Evidence that you are both free to marry.',
      'The pre-nuptial enquiry form, which a priest completes with you.',
      'A certificate from a marriage preparation course.',
      'The bishop’s dispensation, which your priest applies for.',
    ],
    note: 'The Catholic partner promises to keep practising the faith and to do all they can to have your children baptised and brought up as Catholics. The other partner is told about this promise and is not asked to make it. Your priest may suggest some extra conversations about the faith as you prepare.',
  },
  {
    id: 'civil',
    label: 'We are already married in a civil ceremony',
    heading: 'Already married, and hoping for a marriage in the Church',
    summary: 'If at least one of you is Catholic, you can exchange your vows before God in the Church. The preparation and the Church papers are the same as for any other couple.',
    papers: [
      'Proof of your civil marriage.',
      'Baptism certificates, as recent as you can obtain.',
      'Evidence that you were both free to marry.',
      'The pre-nuptial enquiry form, which a priest completes with you.',
      'A certificate from a marriage preparation course.',
    ],
    note: 'You are already married in law, so the Scottish civil forms are not needed again.',
  },
  {
    id: 'neither',
    label: 'Neither of us is Catholic',
    heading: 'When neither of you is Catholic',
    summary: 'St Mary & St Finnan is a Catholic church, and a wedding here is a sacrament of the Catholic Church. For that reason we are only able to marry couples where at least one partner is Catholic.',
    papers: [],
    note: 'If Glenfinnan means a great deal to you, do still write to us. In some circumstances a simple blessing of a marriage is possible, and we will gladly talk it through with you.',
  },
];

export const HOMES: { id: HomeId; label: string; heading: string; text: string }[] = [
  {
    id: 'parish',
    label: 'In the parish of Caol and Glenfinnan',
    heading: 'Fr Charles prepares you',
    text: 'You are our own parishioners, so your preparation and paperwork are done here. Send the enquiry below and Fr Charles will arrange to meet you.',
  },
  {
    id: 'scotland',
    label: 'Elsewhere in Scotland',
    heading: 'Start with your own parish priest',
    text: 'Your preparation and paperwork are done in the parish where you live, not here. Your priest meets you, arranges your marriage preparation and gathers your papers. He also gives you a letter of permission to marry outside your parish. If you live in another diocese, the finished file is sent through your diocesan office to the Diocese of Argyll and the Isles.',
  },
  {
    id: 'abroad',
    label: 'Outside Scotland',
    heading: 'Start with your own parish priest at home',
    text: 'Your preparation and paperwork are done in the parish where you live. Your priest arranges your marriage preparation, gathers your papers and gives you a letter of permission to marry here. The finished file is sent through your diocese to the Diocese of Argyll and the Isles. Papers crossing borders take time, so begin early, and ask the registrar in Fort William which documents they will need from you.',
  },
];

export const WEDDING_STEPS: { when: string; title: string; text: string }[] = [
  {
    when: 'At least six months ahead',
    title: 'Write to us',
    text: 'Send the enquiry on this page with the dates you hope for. Fr Charles checks the church diary and the Church’s calendar, and tells you which path fits your situation.',
  },
  {
    when: 'Over the following months',
    title: 'Prepare with a priest',
    text: 'You take a marriage preparation course and gather your papers. Couples from outside the parish do this with their own parish priest.',
  },
  {
    when: 'When your papers are complete',
    title: 'Your file comes to the diocese',
    text: 'Your priest sends the file to the Diocese of Argyll and the Isles. Once it is approved, Fr Charles confirms your date.',
  },
  {
    when: 'Three months to 29 days before',
    title: 'Give notice to the registrar',
    text: 'Each of you sends a Marriage Notice form (M10) to the registrar in Fort William. It cannot arrive earlier than three months before the wedding, or later than 29 days before.',
  },
  {
    when: 'In the week before',
    title: 'Collect the Marriage Schedule',
    text: 'One of you collects the Marriage Schedule in person from the registrar. It is issued no more than seven days before the wedding.',
  },
  {
    when: 'On the day',
    title: 'Bring the Schedule to the church',
    text: 'Without the Marriage Schedule the wedding cannot go ahead. It is signed in the church straight after the ceremony.',
  },
  {
    when: 'Within three days',
    title: 'Return the Schedule',
    text: 'The signed Schedule goes back to the registrar within three days, and your marriage is registered.',
  },
];

export const WEDDING_FAQ: { q: string; a: string }[] = [
  {
    q: 'Do we have to be parishioners to marry at Glenfinnan?',
    a: 'No. Most couples who marry here come from elsewhere. At least one of you must be Catholic, and you will need a letter of permission from your own parish priest.',
  },
  {
    q: 'How far ahead should we begin?',
    a: 'At least six months, and earlier if you live abroad or one of you is not Catholic. Please do not book a reception or travel until Fr Charles has agreed a date with you.',
  },
  {
    q: 'Can a priest we know celebrate our wedding?',
    a: 'Yes, a priest who is a friend or a relative is welcome. He writes to Fr Charles to ask for the delegation he needs to marry you in this parish.',
  },
  {
    q: 'One of us has been married before. What should we do?',
    a: 'Tell us at the very start. The Church has to be sure that you are both free to marry before a date can be agreed, and that can take time.',
  },
  {
    q: 'We are Catholic but have been away from Mass for a long time. Are we still welcome?',
    a: 'You are. Expect an honest conversation about what Christian marriage means, and an encouragement to come back to Mass and the sacraments as you prepare.',
  },
  {
    q: 'Where do we do our marriage preparation course?',
    a: 'In your own parish or diocese, arranged through your parish priest. He will know what is offered near you.',
  },
  {
    q: 'Can we have music, flowers and a photographer?',
    a: 'Tell us what you are hoping for when you send your enquiry, and we will talk through what works well in the church.',
  },
  {
    q: 'We married elsewhere and would like to renew our vows at Glenfinnan. Is that possible?',
    a: 'Write to us and tell us a little about your marriage. What we can offer depends on your circumstances, and for some couples a simple blessing is the right way to mark the day.',
  },
];
