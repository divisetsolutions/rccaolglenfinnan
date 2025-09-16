import { NextResponse } from 'next/server';
import { parseStringPromise } from 'xml2js'; // Import xml2js

const RSS_FEED_URL = 'https://www.vaticannews.va/en.rss.xml';

export async function GET() {
  try {
    const response = await fetch(RSS_FEED_URL);
    const xmlText = await response.text();

    // Use xml2js to parse the XML content
    const result = await parseStringPromise(xmlText, { explicitArray: false, ignoreAttrs: false });

    let vaticanArticle = null;

    // Access the first item in the RSS feed
    const item = result.rss.channel.item[0];

    if (item) {
      const title = item.title;
      const link = item.link;
      const pubDate = item.pubDate;
      const excerpt = item.description;
      // Strip HTML tags from excerpt
      const cleanExcerpt = excerpt ? excerpt.replace(/<[^>]*>/g, '') : '';
      // xml2js parses attributes into an object with '$' key
      const featuredImageUrl = item['media:content']?.$?.url || item.enclosure?.$?.url;

      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-*|-*$/g, '');

      vaticanArticle = {
        id: `vatican-${slug}`,
        title,
        excerpt: cleanExcerpt.substring(0, 150) + '...',
        slug: link,
        featuredImageUrl,
        createdAt: new Date(pubDate).toISOString(),
      };
    }

    return NextResponse.json(vaticanArticle);
  } catch (error) {
    console.error('Error fetching Vatican News in API route:', error);
    return NextResponse.json(null, { status: 500 });
  }
}
