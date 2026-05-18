import { Platform } from 'react-native';

import { FALLBACK_NEWS } from '@/data/fallbackNews';
import type { NewsArticle } from '@/types/news';

const BASE_URL = 'https://belgium.tomorrowland.com';
const WELCOME_URL = `${BASE_URL}/en/welcome/`;

const HTML_CARD_REGEX =
  /<a href="([^"]+)" class="_cardLink_u66kc_53[^"]*"[^>]*>[\s\S]*?<img src="([^"]+)"[\s\S]*?<h3 class="_title_u66kc_231">([^<]+)<\/h3>[\s\S]*?<p class="_description_u66kc_247">([^<]+)<\/p>/g;

type CardsBlock = {
  type?: string;
  section?: { title?: string };
  cards?: Array<{
    title?: string;
    text?: string;
    image?: { url?: string };
    button?: { href?: string; link?: string };
  }>;
};

function decodeHtml(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"');
}

function resolveUrl(href: string): string {
  const decoded = decodeHtml(href.trim());
  if (!decoded) return BASE_URL;
  if (decoded.startsWith('http')) return decoded;
  return `${BASE_URL}${decoded.startsWith('/') ? decoded : `/${decoded}`}`;
}

function mapCard(card: NonNullable<CardsBlock['cards']>[number]): NewsArticle | null {
  const title = decodeHtml(String(card.title ?? '').trim());
  const description = decodeHtml(String(card.text ?? '').trim());
  const imageUrl = String(card.image?.url ?? '').trim();
  const url = resolveUrl(String(card.button?.href ?? card.button?.link ?? ''));

  if (!title || !description || !imageUrl || !url) return null;
  return { title, description, imageUrl, url };
}

function parseNextData(html: string, limit: number): NewsArticle[] {
  const marker = '<script id="__NEXT_DATA__"';
  const start = html.indexOf(marker);
  if (start === -1) return [];

  const jsonStart = html.indexOf('>', start) + 1;
  const jsonEnd = html.indexOf('</script>', jsonStart);
  if (jsonEnd === -1) return [];

  let data: { props?: { pageProps?: { doc?: { blocks?: CardsBlock[] } } } };
  try {
    data = JSON.parse(html.slice(jsonStart, jsonEnd));
  } catch {
    return [];
  }

  const blocks = data.props?.pageProps?.doc?.blocks;
  if (!Array.isArray(blocks)) return [];

  const newsBlock = blocks.find(
    (block) =>
      block.type === 'cards' &&
      String(block.section?.title ?? '')
        .toLowerCase()
        .includes('news'),
  );

  if (!newsBlock?.cards?.length) return [];

  return newsBlock.cards
    .map(mapCard)
    .filter((article): article is NewsArticle => article !== null)
    .slice(0, limit);
}

function parseHtmlCards(html: string, limit: number): NewsArticle[] {
  const newsStart = html.indexOf('News &amp; Updates');
  if (newsStart === -1) return [];

  const newsEnd = html.indexOf('Creativity', newsStart);
  const section = html.slice(newsStart, newsEnd > 0 ? newsEnd : newsStart + 50000);
  const cardRegex = new RegExp(HTML_CARD_REGEX.source, 'g');

  const articles: NewsArticle[] = [];
  let match: RegExpExecArray | null;

  while ((match = cardRegex.exec(section)) !== null && articles.length < limit) {
    articles.push({
      title: decodeHtml(match[3]),
      description: decodeHtml(match[4].trim()),
      imageUrl: match[2],
      url: resolveUrl(match[1]),
    });
  }

  return articles;
}

async function fetchWelcomeHtml(): Promise<string> {
  const response = await fetch(WELCOME_URL, {
    headers: { Accept: 'text/html,application/xhtml+xml' },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch welcome page (${response.status})`);
  }

  return response.text();
}

export async function fetchBelgiumNews(limit = 3): Promise<NewsArticle[]> {
  // Browsers block cross-origin HTML fetch (CORS); native apps can load live data.
  if (Platform.OS === 'web') {
    return FALLBACK_NEWS.slice(0, limit);
  }

  try {
    const html = await fetchWelcomeHtml();
    const fromNextData = parseNextData(html, limit);
    if (fromNextData.length > 0) return fromNextData;

    const fromHtml = parseHtmlCards(html, limit);
    if (fromHtml.length > 0) return fromHtml;
  } catch {
    // Network/CORS or parse failure — use bundled fallback below.
  }

  return FALLBACK_NEWS.slice(0, limit);
}
