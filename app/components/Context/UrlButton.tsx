// UrlButton.tsx
import React, { FC } from 'react';
import { Button, Group, LoadingOverlay, Anchor } from '@mantine/core';

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
      {entry.title}
    </Button>
);

export default UrlButton;
