import React, { useState, useEffect } from 'react';
import { urls, addUrl } from './urls';
import UrlButton from './UrlButton';
import { Card, ICard } from './Card';
import { clearIndex, crawlDocument } from './utils';
import { Button, ScrollArea, Group, Center, Stack, TextInput, Paper, Title, Loader, Overlay } from '@mantine/core';
import { IconClipboard } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { showNotification } from '@mantine/notifications';
import { Subgrid } from '../Subgrid';

interface ContextProps {
  className: string;
  selected: string[] | null;
  height: number;
}

const Context: React.FC<ContextProps> = ({ className, selected, height }) => {
  const [entries, setEntries] = useState(urls);
  const [cards, setCards] = useState<ICard[]>([]);
  const [loading, setLoading] = useState(false);

  const [url, setUrl] = useState('');
  const router = useRouter();

  // In your component
const handleAddUrl = async (url: string) => {
  setLoading(true);
  try {
    await addUrl(url, setLoading, (error) => {
      console.error("Failed to add URL:", error);
      showNotification({
        title: 'Error',
        message: error,
        color: 'red',
      });
    });
    setEntries(prevEntries => [...prevEntries, {
      url: url,
      title: `URL ${prevEntries.length + 1}`,
      seeded: false,
      loading: false,
    }]);
    setUrl('');
  } catch (error) {
    console.error("Failed to add URL:", error);
    showNotification({
      title: 'Error',
      message: error instanceof Error ? error.message : String(error),
      color: 'red',
    });
  } finally {
    setLoading(false);
  }
};

  const splittingMethod = 'markdown'; // markdown splitting

  // Scroll to selected card
  useEffect(() => {
    const element = selected && document.getElementById(selected[0]);
    element?.scrollIntoView({ behavior: 'smooth' });
  }, [selected]);

  const buttons = entries.map((entry) => (
    <UrlButton
      key={entry.url}
      entry={entry}
      onClick={() => crawlDocument(entry.url, setEntries, setCards, splittingMethod, 256, 1)}
      loading={loading}
    />
  ));

  return (
    <ScrollArea p="lg" h={height}> {/* Applied the height prop to the ScrollArea */}
    <Title order={1} mb="md" ml="xl">Sources</Title>
      <Paper p="xl" shadow="xs" radius="lg" withBorder mb="lg" mt="lg">
        <Center>
          <form onSubmit={(e) => {
            e.preventDefault();
            handleAddUrl(url);
          }}>
            <TextInput size="lg" radius="lg" placeholder='Paste your URL here' value={url} rightSection={<IconClipboard />} maw={800} width="100%" onChange={(e) => setUrl(e.target.value)}/>
          </form>
        </Center>
        <Group gap="xs" m="md">
          {buttons}
        </Group>
        <Center>
        <Button      
            variant="filled"
            color="#01b7ff"
            onClick={() => clearIndex(setEntries, setCards)}
          >
            Clear Index
        </Button>
        </Center>
      </Paper>
      {cards != null && (
        <Paper p="xl" shadow="xs" radius="lg" withBorder mt={12}>
          <Subgrid>
            {cards.map((card, key) => (
              <Card key={key} card={card} selected={selected} />
            ))}
          </Subgrid>
        </Paper>
      )}
    </ScrollArea>
  );
};

export default Context;
