import React, { useState, useEffect } from 'react';
import { urls } from './urls';
import UrlButton from './UrlButton'; // Assuming this is a custom component you've created
import { Card, ICard } from './Card'; // Assuming this is a custom component you've created
import { clearIndex, crawlDocument } from './utils';
import { Button, ScrollArea, Group, Box, Center, Stack, TextInput, Paper } from '@mantine/core';
import { IconClipboard } from '@tabler/icons-react';

interface ContextProps {
  className: string;
  selected: string[] | null;
}

const Context: React.FC<ContextProps> = ({ className, selected }) => {
  const [entries, setEntries] = useState(urls);
  const [cards, setCards] = useState<ICard[]>([]);

  const splittingMethod = 'markdown'; // Always use markdown splitting

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
    <ScrollArea p="lg" h="100%">
      <Paper p="xl" shadow="xs" radius="lg" withBorder>
        <Center>
        <TextInput size="lg" radius="lg" placeholder='Paste your URL here' rightSection={<IconClipboard />} maw={500} w="100%"/>
        </Center>
        <Group gap="xs" m="md">
          {buttons}
        </Group>
        <Center>
        <Button      
            variant="filled"
            onClick={() => clearIndex(setEntries, setCards)}
          >
            Clear Index
        </Button>
        </Center>
      </Paper>
      {cards.length > 0 && (
        <Paper p="xl" shadow="xs" radius="lg" withBorder>
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
