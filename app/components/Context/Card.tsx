import React, { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import { Paper, Text } from '@mantine/core';

export interface ICard {
  pageContent: string;
  metadata: {
    hash: string;
  };
}

interface ICardProps {
  card: ICard;
  selected: string[] | null;
}

export const Card: FC<ICardProps> = ({ card, selected }) => {
  const isSelected = selected && selected.includes(card.metadata.hash);

  return (
    <Paper
      id={card.metadata.hash}
      shadow="md"
      radius="lg"
      p="lg"
      m="md"
      style={{
        backgroundColor: isSelected ? '#616264' : '#434446',
        borderColor: isSelected ? '#0076a5' : 'transparent',
        borderWidth: isSelected ? 2 : 1,
        borderStyle: 'solid',
        opacity: isSelected ? 0.8 : 0.4,
        transition: 'opacity 300ms ease-in-out',
        color: 'white',
      }}
      onMouseOver={(e) => {
        if (!isSelected) e.currentTarget.style.opacity = '0.8';
      }}
      onMouseOut={(e) => {
        if (!isSelected) e.currentTarget.style.opacity = '0.6';
      }}
    >
      <ReactMarkdown>{card.pageContent}</ReactMarkdown>
      <Text size="xs" fw={700}>
        {card.metadata.hash}
      </Text>
    </Paper>
  );
};
