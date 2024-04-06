import { showNotification } from '@mantine/notifications';

export const urls = [
  {
    url: "https://mantine.dev",
    title: "Mantine UI",
    seeded: false,
    loading: false,
  },
];

// Function to add a new URL
export const addUrl = async (newUrl: string, setLoading: (loading: boolean) => void, onError: (error: string) => void) => {
  setLoading(true); // Start loading
  try {
    const response = await fetch(newUrl);
    if (!response.ok) throw new Error('Failed to fetch URL');
    const html = await response.text();

    // Define an array of strategies to extract the title
    const titleExtractStrategies = [
      /<title>(.*?)<\/title>/i, // Standard <title> tag
      /<meta property="og:title" content="(.*?)"\/?>/i, // Open Graph title
      /<meta name="twitter:title" content="(.*?)"\/?>/i, // Twitter title
    ];

    let title = "Default Title"; // Fallback title

    // Try each strategy in sequence
    for (const strategy of titleExtractStrategies) {
      try {
        const match = html.match(strategy);
        if (match && match[1]) {
          title = match[1];
          break;
        }
      } catch (strategyError) {
        console.error("Error with strategy:", strategyError);
        showNotification({
          title: 'Error in title extraction',
          message: strategyError instanceof Error ? strategyError.message : String(strategyError),
          color: 'orange',
        });
      }
    }

    urls.push({
      url: newUrl,
      title: title,
      seeded: false,
      loading: false,
    });
  } catch (error) {
    console.error("Error fetching URL title:", error);
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
