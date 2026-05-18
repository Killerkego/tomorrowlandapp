import type { NewsArticle } from '@/types/news';

/** Latest known News & Updates items from belgium.tomorrowland.com (offline fallback). */
export const FALLBACK_NEWS: NewsArticle[] = [
  {
    title: 'How to order',
    description: 'How to order your Pass or Package for Tomorrowland Belgium 2026.',
    imageUrl:
      'https://imgproxy.prod.tomorrowland.com/Q44uxxvgXosaLwqzio1oe5lYdBMte1gz6MGMR5chZ-Y/w:768/f:webp/aHR0cHM6Ly90bGJlLWFzc2V0cy5wcm9kLnRvbW9ycm93bGFuZC5jb20vMjAyNS9hY3RzLzI1MDcyNi0xNDQzNDEtdGwyNWJlLWl2Yi5qcGc.webp',
    url: 'https://belgium.tomorrowland.com/en/sales-info/how-to-order-your-tickets',
  },
  {
    title: 'Relive Tomorrowland 2025',
    description: 'Relive Tomorrowland Belgium 2025 through the different live sets.',
    imageUrl:
      'https://imgproxy.prod.tomorrowland.com/hMBLpIozZT9mCW1witB9x-oz7B4PuehK8uXSfadgHa0/w:768/f:webp/aHR0cHM6Ly90bGJlLWFzc2V0cy5wcm9kLnRvbW9ycm93bGFuZC5jb20vMjAyNS9zY2VuZXJ5LzI1MDcxOS0yMDE0NTUtdGwyNWJlLS1maWxsZS1yb2VsYW50cy0zLmpwZw.webp',
    url: 'https://belgium.tomorrowland.com/en/line-up',
  },
  {
    title: 'This is Tomorrowland',
    description:
      'Discover all about Tomorrowland, its history, DreamVille, Global Journey and more.',
    imageUrl:
      'https://imgproxy.prod.tomorrowland.com/rZFMgb_IWT1ZrlLDVH70A220qPa3MXTIUpm-VgT71Zs/w:768/f:webp/aHR0cHM6Ly90bGJlLWFzc2V0cy5wcm9kLnRvbW9ycm93bGFuZC5jb20vMjAyNS90bDI1YmUtZnJpX3cxLmpwZw.webp',
    url: 'https://belgium.tomorrowland.com/en/welcome/this-is-tomorrowland',
  },
];
