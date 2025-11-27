export const prefix = 'otab';

export const SEARCH_ENGINES = {
  google: {
    name: 'Google',
    icon: 'https://www.google.com/favicon.ico',
    url: 'https://www.google.com/search?q=',
  },
  bing: {
    name: 'Bing',
    icon: 'https://www.bing.com/favicon.ico',
    url: 'https://www.bing.com/search?q=',
  },
  duckduckgo: {
    name: 'DuckDuckGo',
    icon: 'https://duckduckgo.com/favicon.ico',
    url: 'https://duckduckgo.com/?q=',
  },
  brave: {
    name: 'Brave',
    icon: 'https://brave.com/static-assets/images/brave-favicon.png',
    url: 'https://search.brave.com/search?q=',
  },
  yahoo: {
    name: 'Yahoo',
    icon: 'https://www.yahoo.com/favicon.ico',
    url: 'https://search.yahoo.com/search?p=',
  },
} as const;
