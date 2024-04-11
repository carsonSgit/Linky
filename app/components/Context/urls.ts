import { showNotification } from '@mantine/notifications';

interface UrlEntry {
  url: string;
  title: string;
  seeded: boolean;
  loading: boolean;
}

export const urls: UrlEntry[] = [];

// Function to add a new URL
export const addUrl = async (newUrl: string, title: string, setLoading: (loading: boolean) => void, onError: (error: string) => void) => {
  setLoading(true); // Start loading
  try {
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
