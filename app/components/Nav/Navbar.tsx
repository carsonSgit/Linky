import { Group, Title, UnstyledButton } from '@mantine/core';
import Link from 'next/link';
import { useMediaQuery } from '@mantine/hooks';
import Linky from '../Linky/linky';

function Navbar({ text }: { text: any }) {
  const isMobile = useMediaQuery('(max-width: 768px)');

  return( 
    <Group justify='space-between'>       
        <Title mb={20} ml={isMobile ? 30 : 60} ta="left" >
          {text.replace('Linky', <span style={{ color: '#01b7FF' }}>Linky</span>)}
        </Title>
      <UnstyledButton href="/" component={Link}>
        <Linky />
      </UnstyledButton>
    </Group>
  );
}

export default Navbar;
