import { showNotification } from '@mantine/notifications';

interface UrlEntry {
  url: string;
  title: string;
  seeded: boolean;
  loading: boolean;
}

export const urls: UrlEntry[] = [];

// Function to add a new URL
export const addUrl = async (newUrl: string, setLoading: (loading: boolean) => void, onError: (error: string) => void) => {
  setLoading(true); // Start loading
  try {
    // const response = await fetch(newUrl);
    // if (!response.ok) throw new Error('Failed to fetch URL');
    // await response.text();

    // Generate title as "URL 1", "URL 2", etc., based on the existing number of URLs
    const title = `URL ${urls.length + 1}`;

    urls.push({
      url: newUrl,
      title: title,
      seeded: false,
      loading: false,
    });
  } catch (error) {
    console.error("Error fetching URL:", error);
    onError(error instanceof Error ? error.message : String(error));
    showNotification({
      title: 'Error',
      message: error instanceof Error ? error.message : String(error),
      color: 'red',
    });
  } finally {
    setLoading(false); // End loading
  }
};
