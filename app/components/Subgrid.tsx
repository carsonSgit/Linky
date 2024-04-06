import { SimpleGrid, Skeleton, Container, Stack, useMantineTheme, px } from '@mantine/core';
import { ReactNode } from 'react'; // Import ReactNode type

// Define SubgridProps type to accept children
interface SubgridProps {
  children: ReactNode;
}

const BASE_HEIGHT = 360;
const getSubHeight = (children: number, spacing: number) =>
  BASE_HEIGHT / children - spacing * ((children - 1) / children);

export function Subgrid({ children }: SubgridProps) {
  const theme = useMantineTheme();
  return (
    <Container my="md">
      <SimpleGrid cols={{ base: 1, xs: 2 }}>
        {/* Render children inside SimpleGrid */}
        {children}
      </SimpleGrid>
    </Container>
  );
}
