export const prefix = 'otab';

export const SEARCH_ENGINES = {
  google: {
    name: 'Google',
    icon: '/icons/favicon_google.ico',
    url: 'https://www.google.com/search?q=',
  },
  bing: {
    name: 'Bing',
    icon: '/icons/favicon_bing.ico',
    url: 'https://www.bing.com/search?q=',
  },
  duckduckgo: {
    name: 'DuckDuckGo',
    icon: '/icons/favicon_duckduckgo.ico',
    url: 'https://duckduckgo.com/?q=',
  },
  brave: {
    name: 'Brave',
    icon: '/icons/favicon_brave.png',
    url: 'https://search.brave.com/search?q=',
  },
  yahoo: {
    name: 'Yahoo',
    icon: '/icons/favicon_yahoo.ico',
    url: 'https://search.yahoo.com/search?p=',
  },
} as const;
