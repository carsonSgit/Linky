import React, { useState, useEffect } from 'react';
import { urls, addUrl } from './urls';
import UrlButton from './UrlButton'; // Assuming this is a custom component you've created
import { Card, ICard } from './Card'; // Assuming this is a custom component you've created
import { clearIndex, crawlDocument } from './utils';
import { Button, ScrollArea, Group, Center, Stack, TextInput, Paper, Title } from '@mantine/core';
import { IconClipboard } from '@tabler/icons-react';
import { useRouter } from 'next/navigation'

interface ContextProps {
  className: string;
  selected: string[] | null;
  height: number;
}

const Context: React.FC<ContextProps> = ({ className, selected, height }) => { // Added height to the destructured props
  const [entries, setEntries] = useState(urls);
  const [cards, setCards] = useState<ICard[]>([]);

  const [url, setUrl] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    addUrl(url);
    await router.push('/chat');
  };

  const splittingMethod = 'markdown'; // markdown splitting

  // Scroll to selected card
  useEffect(() => {
    const element = selected && document.getElementById(selected[0]);
    element?.scrollIntoView({ behavior: 'smooth' });
  }, [selected]);

  const buttons = entries.map((entry, key) => (
    <UrlButton
      key={`${key}-${entry.loading}`}
      entry={entry}
      onClick={() => crawlDocument(entry.url, setEntries, setCards, splittingMethod, 256, 1)} // Chunk size of 256 and overlap of 1
    />
  ));

  return (
    <ScrollArea p="lg" h={height}> {/* Applied the height prop to the ScrollArea */}
    <Title order={1} mb="md" ml="xl">Sources</Title>
      <Paper p="xl" shadow="xs" radius="lg" withBorder mb="lg" mt="lg">
        <Center>
        <form onSubmit={handleSubmit}>
        <TextInput size="lg" radius="lg" placeholder='Paste your URL here' value={url} rightSection={<IconClipboard />} maw={800} w="100%" onChange={(e) => setUrl(e.target.value)}/>
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
          <Stack>
            {cards.map((card, key) => (
              <Card key={key} card={card} selected={selected} />
            ))}
          </Stack>
        </Paper>
      )}
    </ScrollArea>
  );
};

export default Context;
