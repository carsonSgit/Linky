export const urls = [
  {
    url: "https://mantine.dev",
    title: "Mantine UI",
    seeded: false,
    loading: false,
  },
];

// Function to add a new URL
export const addUrl = async (newUrl: string) => {
  try {
    const response = await fetch(newUrl);
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
      const match = html.match(strategy);
      if (match && match[1]) {
        title = match[1];
        break;
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
  }
};
