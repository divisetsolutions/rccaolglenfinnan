// Fixed facts and wording for the public pages. Edit here, not in the page files.

export const PARISH = {
  name: 'Caol and Glenfinnan',
  full: 'The Catholic Parish of Caol and Glenfinnan',
  diocese: 'Diocese of Argyll and the Isles',
  priest: 'Fr Charles Egbon, MSP',
  phone: '01397 719281',
  phoneHref: 'tel:+441397719281',
  email: 'caol@rcdai.org.uk',
  charity: 'SC002876',
  url: 'https://www.rccaolglenfinnan.org.uk',
  liturgyToday: 'https://universalis.com/europe.scotland.argyll/today.htm',
  dioceseDonate: 'https://www.rcdai.org.uk/donate/',
};

/**
 * Shown on the homepage and Mass times page while the parish priest is away.
 * Set `active` to false (or empty the list) when he is back.
 */
export const AWAY = {
  active: true,
  message: 'Fr Charles is not available at present. For urgent pastoral matters, please contact one of these priests.',
  contacts: [
    { name: 'Fr David', phone: '01397 702174', href: 'tel:+441397702174' },
    { name: 'Fr Joe', phone: '01855 811203', href: 'tel:+441855811203' },
    { name: 'Fr Danny', phone: '01397 712238', href: 'tel:+441397712238' },
  ],
};

export const CHURCHES = {
  caol: {
    id: 'caol',
    slug: '/caol',
    name: 'St John the Evangelist',
    short: 'St John’s',
    place: 'Caol, Fort William',
    setting: 'Beneath Ben Nevis',
    address: ['St John’s Road', 'Caol', 'Fort William', 'PH33 7PR'],
    email: 'caol@rcdai.org.uk',
    map: 'https://www.google.com/maps/search/?api=1&query=Saint+John+the+Evangelist+R.C.+Church+Caol+Fort+William',
    lat: 56.8369,
    lng: -5.1005,
    hero: '/img/caol-exterior.jpg',
    inside: '/img/caol-interior.jpg',
    gallery: [
      { src: '/img/caol-interior.jpg', alt: 'The folded timber ceiling above the nave of St John’s' },
      { src: '/img/caol-altar.jpg', alt: 'Candles lit around the altar at St John’s' },
      { src: '/img/caol-nave.jpg', alt: 'Looking down the nave of St John’s towards the sanctuary' },
      { src: '/img/caol-cross.jpg', alt: 'The Lenten cross at St John’s' },
    ],
    summary:
      'A family church among the houses of Caol, where most of the parish lives and works. Built in 1970, with a wide star of a ceiling that gathers everyone round the altar.',
    story: [
      'St John’s was built in 1970 for the growing Catholic community of Caol, the village that grew up on the shore of Loch Linnhe at the foot of Ben Nevis. It has been a spiritual home to families here ever since.',
      'The church is modern and full of light. Its folded ceiling rises over the nave like a tent, and the pews fan out so that nobody sits far from the altar. Weekday Mass, confessions and adoration all take place here, and the priest lives next door.',
      'Visitors are welcomed as friends. If you are in Fort William for the hills or the Caledonian Canal, we are ten minutes from the town centre.',
    ],
    visiting: [
      'Free parking beside the church.',
      'Level access from the car park into the church.',
      'Buses from Fort William town centre stop in Caol, a short walk away.',
    ],
  },
  glenfinnan: {
    id: 'glenfinnan',
    slug: '/glenfinnan',
    name: 'St Mary & St Finnan',
    short: 'St Mary & St Finnan',
    place: 'Glenfinnan',
    setting: 'Above Loch Shiel',
    address: ['Glenfinnan', 'Inverness-shire', 'PH37 4LT'],
    email: 'glenfinnan@rcdai.org.uk',
    map: 'https://www.google.com/maps/search/?api=1&query=Saint+Mary+and+Saint+Finnan+Church+Glenfinnan',
    lat: 56.8714,
    lng: -5.4441,
    hero: '/img/glenfinnan-exterior.jpg',
    inside: '/img/glenfinnan-interior.jpg',
    gallery: [
      { src: '/img/glenfinnan-interior.jpg', alt: 'Gothic arches and the rose window inside St Mary & St Finnan' },
      { src: '/img/glenfinnan-nave.jpg', alt: 'The tartan aisle carpet leading to the altar at Glenfinnan' },
      { src: '/img/glenfinnan-lady-chapel.jpg', alt: 'The Lady chapel at St Mary & St Finnan' },
      { src: '/img/glenfinnan-stations.jpg', alt: 'A Station of the Cross and the Sacred Heart statue at Glenfinnan' },
      { src: '/img/glenfinnan-autumn.jpg', alt: 'St Mary & St Finnan in autumn, with the hills of Loch Shiel behind' },
    ],
    summary:
      'A Gothic church on the hillside above Loch Shiel, designed by Edward Welby Pugin and completed in 1873. Pilgrims and travellers from all over the world step inside every day.',
    story: [
      'St Mary & St Finnan stands on a rise above Loch Shiel, with the mountains of Moidart and Ardgour behind it. It was designed by Edward Welby Pugin and completed in 1873, and it is counted among the loveliest churches in Scotland.',
      'Inside there are stone arches, a rose window and an aisle laid with tartan. People who came to see the viaduct or the monument often find themselves sitting here in silence for longer than they planned.',
      'Mass is celebrated here every Sunday afternoon. Couples come from far and wide to be married in this church, and it is a place of baptisms and funerals for the families of the glen.',
    ],
    visiting: [
      'The church is on the A830 Road to the Isles, about 17 miles west of Fort William.',
      'A short, fairly steep drive leads up from the road. Parking at the church is limited.',
      'Glenfinnan railway station on the West Highland Line is about a ten minute walk.',
    ],
  },
} as const;

export type Church = (typeof CHURCHES)[keyof typeof CHURCHES];

export const NAV = [
  { href: '/calendar', label: 'Mass times' },
  { href: '/about', label: 'Our parish' },
  { href: '/sacraments', label: 'Sacraments' },
  { href: '/news', label: 'News' },
  { href: '/homilies', label: 'Homilies' },
  { href: '/newsletters', label: 'Newsletter' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
];

export const SACRAMENTS = [
  {
    id: 'baptism',
    title: 'Baptism',
    image: '/img/glenfinnan-lady-chapel.jpg',
    intro: 'Baptism is the doorway into the life of Christ and the family of the Church.',
    body: [
      'We are delighted to baptise the children of families who live in the parish or have a connection with it. Please get in touch with Fr Charles before you set a date or book a venue, so that we can meet you and help you prepare.',
      'Adults who would like to be baptised are just as welcome. The usual path is the RCIA, described further down this page.',
    ],
    steps: ['Contact the parish to introduce yourselves.', 'Meet Fr Charles for a short preparation.', 'Choose godparents. At least one must be a confirmed, practising Catholic.', 'Agree a date, usually during or after Sunday Mass.'],
  },
  {
    id: 'confession',
    title: 'Confession',
    image: '/img/caol-cross.jpg',
    intro: 'The sacrament of Reconciliation, where Christ forgives and we begin again.',
    body: [
      'Confession is offered each week at both churches. The current times are on the Mass times page, and you can always ask for another time that suits you.',
      'If it has been years, or you have forgotten what to say, do not worry. Tell the priest, and he will help you through it.',
    ],
    steps: [],
  },
  {
    id: 'communion-confirmation',
    title: 'First Holy Communion and Confirmation',
    image: '/img/caol-altar.jpg',
    intro: 'Children are prepared for these sacraments in the parish, together with their families and school.',
    body: [
      'If your child is of an age to receive First Reconciliation, First Holy Communion or Confirmation, please let the parish know early in the school year so that they can join the preparation.',
      'Adults who were never confirmed can be prepared at any time. Speak to Fr Charles.',
    ],
    steps: [],
  },
  {
    id: 'marriage',
    title: 'Marriage',
    image: '/img/glenfinnan-nave.jpg',
    intro: 'Couples marry in both our churches, and many travel a long way to be married at Glenfinnan.',
    body: [
      'Congratulations on your engagement. Please contact Fr Charles as early as you can, and before you confirm a date with anyone else. A Catholic wedding needs time for preparation and paperwork, especially if you live outside the parish or one of you is not Catholic.',
      'There are two sides to the paperwork. The Church asks for a marriage preparation course and a set of documents gathered with the help of your own parish priest. Scottish civil law asks each of you to send a Marriage Notice form (M10) to the registrar, no earlier than three months and no later than 29 days before the wedding.',
      'If you are not Catholic and would simply love a blessing in this place, write to us as well. We will gladly talk through what is possible.',
    ],
    steps: ['Write to the parish with your names, where you live and the date you hope for.', 'Fr Charles confirms whether the church is free and what your situation requires.', 'Complete marriage preparation and the Church papers through your home parish.', 'Send your M10 forms to the registrar within the legal window.', 'Bring the Marriage Schedule from the registrar on the day.'],
  },
  {
    id: 'anointing',
    title: 'Anointing of the Sick',
    image: '/img/glenfinnan-stations.jpg',
    intro: 'For anyone who is seriously ill, facing an operation, or growing frail with age.',
    body: [
      'Please do not wait until the last moment. Ring the parish and Fr Charles will come to the house, the Belford Hospital or a care home.',
      'If you know someone who is housebound and would like Holy Communion brought to them, let us know and we will arrange regular visits.',
    ],
    steps: [],
  },
  {
    id: 'funerals',
    title: 'Funerals',
    image: '/img/glenfinnan-prayer.jpg',
    intro: 'When someone you love has died, the parish is here to pray with you and to walk with you.',
    body: [
      'Please contact Fr Charles as soon as you are able, at any hour for someone who is dying. Your funeral director will also be in touch with us, and together we will agree the day and time.',
      'We will help you choose readings and hymns for the Funeral Mass or service, and the parish will remember your loved one at Mass.',
    ],
    steps: [],
  },
  {
    id: 'becoming-catholic',
    title: 'Becoming Catholic',
    image: '/img/loch.jpg',
    intro: 'The RCIA is a gentle, unhurried way of finding out what Catholics believe and why.',
    body: [
      'The Rite of Christian Initiation of Adults is for anyone who is curious about the faith, whether you were never baptised, were baptised in another Christian tradition, or were baptised Catholic and never went further.',
      'There is no pressure and no commitment in coming along. Parishioners who want to understand their faith more deeply are welcome too. Contact the parish for the date of the next session.',
    ],
    steps: [],
  },
];

export const RIBBON = [
  { src: '/img/glenfinnan-exterior.jpg', alt: 'St Mary & St Finnan above Loch Shiel' },
  { src: '/img/caol-interior.jpg', alt: 'Inside St John’s, Caol' },
  { src: '/img/loch.jpg', alt: 'Still water and pine woods in the West Highlands' },
  { src: '/img/glenfinnan-interior.jpg', alt: 'The rose window at Glenfinnan' },
  { src: '/img/caol-altar.jpg', alt: 'The altar at St John’s lit with candles' },
  { src: '/img/glenfinnan-autumn.jpg', alt: 'Glenfinnan church in autumn' },
  { src: '/img/caol-exterior.jpg', alt: 'St John’s, Caol, under snow' },
  { src: '/img/glenfinnan-nave.jpg', alt: 'The tartan aisle at Glenfinnan' },
];

/**
 * Where the subject sits in each photograph, as "across% down%".
 * Frames that crop a photo (the arches especially) keep this point in view.
 */
export const FOCUS: Record<string, string> = {
  '/img/caol-exterior.jpg': '45% 50%',
  '/img/caol-interior.jpg': '53% 50%',
  '/img/caol-nave.jpg': '53% 50%',
  '/img/caol-altar.jpg': '50% 50%',
  '/img/caol-cross.jpg': '55% 40%',
  '/img/glenfinnan-exterior.jpg': '39% 50%',
  '/img/glenfinnan-autumn.jpg': '61% 50%',
  '/img/glenfinnan-interior.jpg': '50% 50%',
  '/img/glenfinnan-nave.jpg': '42% 50%',
  '/img/glenfinnan-prayer.jpg': '42% 50%',
  '/img/glenfinnan-lady-chapel.jpg': '50% 66%',
  '/img/glenfinnan-stations.jpg': '50% 45%',
  '/img/fr-charles.jpg': '62% 50%',
  '/img/loch.jpg': '44% 50%',
};

export const focus = (src: string) => ({ objectPosition: FOCUS[src] ?? '50% 50%' });
