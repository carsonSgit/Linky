
import { Container, Group, Text } from '@mantine/core';
import { DarkToggle } from './Context/DarkToggle';

export default function Header({ className }: { className?: string }) {

  return (
    <Container
    >
      <Group>
        <Text>
          Header is here
        </Text>
        <DarkToggle/>
      </Group>
    </Container>
  );
}
