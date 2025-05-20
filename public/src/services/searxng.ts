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

// Default SearXNG instance URL - using localhost for local installation
const DEFAULT_SEARXNG_URL = 'http://localhost:8888';

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
  instanceUrl: string = DEFAULT_SEARXNG_URL
): Promise<SearXNGResponse> => {
  try {
    // Set format to JSON to get structured data
    params.format = 'json';
    
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