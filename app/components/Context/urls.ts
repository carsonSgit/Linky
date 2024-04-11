import { showNotification } from '@mantine/notifications';
import { Crawler } from '../../api/crawl/crawler';

interface UrlEntry {
  url: string;
  title: string;
  seeded: boolean;
  loading: boolean;
}

export const urls: UrlEntry[] = [];

// Callbacks array to notify about changes
const changeListeners: (() => void)[] = [];

export const notifyChange = () => {
  changeListeners.forEach(listener => listener());
};

export const onChange = (listener: () => void) => {
  changeListeners.push(listener);
  return () => {
    const index = changeListeners.indexOf(listener);
    if (index > -1) {
      changeListeners.splice(index, 1);
    }
  };
};

// Function to add a new URL
export const addUrl = async (newUrl: string, setLoading: (loading: boolean) => void, onError: (error: string) => void) => {
  setLoading(true); // Start loading
  try {
    const crawler = new Crawler();
    const title = await crawler.fetchTitle(newUrl);

    urls.push({
      url: newUrl,
      title: title,
      seeded: false,
      loading: false,
    });
    notifyChange(); // Notify about the change
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
