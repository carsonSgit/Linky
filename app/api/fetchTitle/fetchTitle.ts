import cheerio from 'cheerio';

async function fetchTitle(url: string): Promise<string> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
    }
    const html = await response.text();
    const $ = cheerio.load(html);
    const title = $('title').text();
    return title || 'No title found';
  } catch (error) {
    console.error(`Error fetching title for ${url}:`, error);
    throw error;
  }
}

export default fetchTitle;