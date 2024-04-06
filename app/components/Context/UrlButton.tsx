// UrlButton.tsx
import React, { FC } from 'react';
import { Button, LoadingOverlay, ActionIcon, Text } from '@mantine/core';
import { IconShare2 } from '@tabler/icons-react';

export interface IUrlEntry {
  url: string;
  title: string;
  seeded: boolean;
  loading: boolean;
}

interface IURLButtonProps {
  entry: IUrlEntry;
  onClick: () => Promise<void>;
}

const UrlButton: FC<IURLButtonProps> = ({ entry, onClick }) => (
    <Button
      variant="light"
      color={entry.seeded ? 'green' : 'gray'}
      onClick={onClick}
      style={{ position: 'relative' }}
    >
      {entry.loading && <LoadingOverlay visible overlayProps={{ blur: 2 }} loaderProps={{ size: "sm", type: "bars" }}/>}
      <ActionIcon c={entry.seeded ? 'green' : 'gray'} variant='subtle' mr="xs">
        <IconShare2 />
      </ActionIcon>
      <Text>
        {entry.title}
      </Text>
    </Button>
);

export default UrlButton;
