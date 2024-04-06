// UrlButton.tsx
import React, { FC } from 'react';
import { Button, LoadingOverlay, ActionIcon, Text, Loader } from '@mantine/core';
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
  loading: boolean; 
}

const UrlButton: FC<IURLButtonProps> = ({ entry, onClick, loading }) => (
    <div style={{ position: 'relative' }}>
      <Button
        variant="light"
        color={entry.seeded ? 'green' : 'gray'}
        onClick={onClick}
        style={{ position: 'relative' }}
        disabled={loading}
      >
        {(entry.loading || loading) && <LoadingOverlay visible overlayProps={{ blur: 2 }} loaderProps={{ size: "sm", type: "bars" }}/>}
        <ActionIcon color={entry.seeded ? 'green' : 'gray'} variant='subtle' mr="xs" component="a" href={entry.url} target="_blank">
          <IconShare2 />
        </ActionIcon>
        <Text>
          {entry.title}
        </Text>
      </Button>
    </div>
);

export default UrlButton;

