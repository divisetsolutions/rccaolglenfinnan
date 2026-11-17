// Fr Charles's book, What Remains. Wording and links for the book page and the homepage panel.
// Readers' words are quoted exactly as published by Diviset Solutions.

export const BOOK = {
  title: 'What Remains',
  subtitle: 'Faith at the Edge of Scotland',
  author: 'Fr Charles Egbon, MSP',
  cover: '/img/what-remains-book-fr-charles-egbon.png',
  coverAlt: 'The paperback of What Remains by Fr Charles Egbon, with St Mary & St Finnan, Glenfinnan, on the cover',
  price: '£9.99',
  format: 'Paperback, 115 pages',
  order: 'https://payhip.com/b/DLxbZ',
  about: 'https://www.divisetsolutions.com/books/what-remains',
  amazon: 'https://www.amazon.co.uk/dp/1919325239',
  publisher: 'Diviset Solutions',
};

/** The gift wording is shown in November and December and steps back by itself in January. */
export const isChristmasSeason = (now = new Date()) => now.getUTCMonth() >= 10;

/** Last order date for delivery in the UK before Christmas (Royal Mail and Bookvault timings). Update each year. */
export const CHRISTMAS_LAST_ORDER = { date: '2026-12-10', label: 'Thursday 10 December' };

/** 'before' until the end of the last order day, 'after' once it has passed, null if the date is for another year. */
export function christmasOrderState(now = new Date()): 'before' | 'after' | null {
  const last = new Date(`${CHRISTMAS_LAST_ORDER.date}T23:59:59Z`);
  if (now.getUTCFullYear() !== last.getUTCFullYear()) return null;
  return now <= last ? 'before' : 'after';
}

export const bookHeadline = (christmas: boolean) =>
  christmas ? 'A Christmas gift for the one who still prays for everyone' : 'A book for the one who still prays for everyone';

export const BOOK_PRAISE = [
  {
    quote:
      'Every parent who has watched their child drift from their faith knows that feeling of anxiety, the questioning of their own responsibility. Where did I fail? Fr Charles’s book is rare in that it binds grief and hope together, without ignoring the pain or wallowing in it. For any parent weighed down by such a cross, I would recommend this book.',
    source: 'Ann Dods, broadcaster, Oban Cathedral',
  },
  {
    quote:
      'This book made me feel that the life of an ordinary person of faith is worth something. That it is seen.',
    source: 'Mrs Heather Berriman, Caol Parish',
  },
  {
    quote:
      'To an 86-year-old man living on his own in the Western Highlands, this book rings very true. Reading it is like listening to music: when it is finished it does not go away but lingers in the memory and affects how one reacts to life. I like it very much.',
    source: 'Patrick Samuels, poet and parishioner, Scottish Highlands',
  },
  {
    quote:
      'This book is a work of beauty: beauty in the monotony of the daily struggle, the harsh weather conditions, and then the beauty of the faithfulness of each person. It is something that can be read all over again.',
    source: 'Brunhild Tynan, great-grandmother and retired teacher, Bangor, Wales',
  },
];
