import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio'; // Import cheerio

const DIOCESE_NEWS_ARCHIVE_URL = 'https://www.rcdai.org.uk/news-archive';

export async function GET() {
  try {
    const response = await fetch(DIOCESE_NEWS_ARCHIVE_URL);
    const htmlText = await response.text();

    const $ = cheerio.load(htmlText); // Load HTML into cheerio

    let dioceseArticle = null;

    // Find the first news article.
    // Based on inspection, news articles are within <div class="fl-module fl-module-callout">
    // The title is within an <h3> with class 'fl-callout-title' and an <a> tag.
    // The date is not directly available in the main callout, so we'll use a placeholder for now.
    // The excerpt is within a <p> tag inside a div with class 'fl-callout-text'.
    // The featured image is an <img> tag within a div with class 'fl-callout-photo'.

    const firstArticle = $('div.fl-module.fl-module-callout').first();

    if (firstArticle.length > 0) {
      const titleElement = firstArticle.find('h3.fl-callout-title a').first();
      const link = titleElement.attr('href');
      const title = titleElement.text().trim();

      const createdAt = new Date().toISOString(); // Placeholder for now

      const excerptElement = firstArticle.find('div.fl-callout-text p').first();
      const excerpt = excerptElement.text().trim().substring(0, 150) + '...';

      const imageElement = firstArticle.find('div.fl-callout-photo img').first();
      const featuredImageUrl = imageElement.attr('src');

      if (title && link) {
        const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-*|-*$/g, '');

        dioceseArticle = {
          id: `diocese-${slug}`,
          title,
          excerpt,
          slug: link,
          featuredImageUrl,
          createdAt,
        };
      }
    }

    return NextResponse.json(dioceseArticle);
  } catch (error) {
    console.error('Error fetching Diocese News in API route:', error);
    return NextResponse.json(null, { status: 500 });
  }
}