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
        backgroundColor: isSelected ? '#4B5563' : '#1F2937',
        borderColor: isSelected ? '#0EA5E9' : 'transparent',
        borderWidth: isSelected ? 4 : 0,
        borderStyle: 'double',
        opacity: isSelected ? 1 : 0.6,
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
