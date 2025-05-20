import axios from 'axios';

// Define the SearXNG result types
export interface SearXNGResult {
  title: string;
  url: string;
  content: string;
  engine: string;
  parsed_url?: string[];
  engines?: string[];
  positions?: number[];
  score?: number;
  category?: string;
  pretty_url?: string;
  publishedDate?: string;
  img_src?: string;
  thumbnail?: string;
  seed?: string;
  template?: string;
}

export interface SearXNGResponse {
  query: string;
  number_of_results: number;
  results: SearXNGResult[];
  answers: string[];
  corrections: string[];
  infoboxes: any[];
  suggestions: string[];
  unresponsive_engines: string[];
}

// SearXNG instance configuration
export interface SearXNGConfig {
  useExternal: boolean;
  localUrl: string;
  externalUrl: string;
}

// Default SearXNG instance URL - using localhost for local installation
const DEFAULT_LOCAL_SEARXNG_URL = 'http://localhost:8888';

// Default configuration
export const DEFAULT_SEARXNG_CONFIG: SearXNGConfig = {
  useExternal: false,
  localUrl: DEFAULT_LOCAL_SEARXNG_URL,
  externalUrl: 'https://searx.be' // Example of a public SearXNG instance
};

// Get the active SearXNG URL based on configuration
export const getActiveSearXNGUrl = (config: SearXNGConfig = DEFAULT_SEARXNG_CONFIG): string => {
  return config.useExternal ? config.externalUrl : config.localUrl;
};

// Default SearXNG instance URL - will be determined by configuration
const DEFAULT_SEARXNG_URL = DEFAULT_LOCAL_SEARXNG_URL;

export interface SearXNGSearchParams {
  q: string;
  categories?: string;
  engines?: string;
  language?: string;
  pageno?: number;
  time_range?: 'day' | 'week' | 'month' | 'year';
  format?: 'json' | 'csv' | 'rss';
  safesearch?: 0 | 1 | 2;
}

export const searchSearXNG = async (
  params: SearXNGSearchParams,
  config?: SearXNGConfig | string
): Promise<SearXNGResponse> => {
  try {
    // Set format to JSON to get structured data
    params.format = 'json';
    
    // Determine the instance URL based on the provided config or string
    let instanceUrl: string;
    
    if (typeof config === 'string') {
      // If a string is provided, use it directly as the instance URL
      instanceUrl = config;
    } else if (config) {
      // If a config object is provided, get the active URL based on the config
      instanceUrl = getActiveSearXNGUrl(config);
    } else {
      // Use the default configuration
      instanceUrl = getActiveSearXNGUrl(DEFAULT_SEARXNG_CONFIG);
    }
    
    console.log(`Searching SearXNG at: ${instanceUrl}`);
    const response = await axios.get(`${instanceUrl}/search`, { params });
    return response.data;
  } catch (error) {
    console.error('Error searching SearXNG:', error);
    throw error;
  }
};

// Convert SearXNG results to the format expected by our UI
export const convertSearXNGResults = (searxngResults: SearXNGResult[]): any[] => {
  return searxngResults.map(result => ({
    title: result.title,
    link: result.url,
    description: result.content,
    // Add additional fields that our UI expects
    id: result.url,
    pubDate: result.publishedDate,
    // For image results
    image: result.img_src || result.thumbnail,
    // Add source information
    source: 'searxng',
    engine: result.engine,
    // Try to extract host from URL
    host: result.pretty_url ? new URL(result.url).hostname : undefined
  }));
};