import { Group, Title, UnstyledButton } from '@mantine/core';
import Link from 'next/link';
import { useMediaQuery } from '@mantine/hooks';
import Linky from '../Linky/linky';

function Navbar({ text }: { text: string }) {
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Replace only occurrences of "Linky" with styled version
  const styledText = text.replace(
    /Linky/g,
    '<span style="color: #01b7FF">Linky</span>'
  );

  return( 
    <Group justify='space-between'>       
        <Title mb={20} ml={isMobile ? 30 : 60} ta="left" dangerouslySetInnerHTML={{ __html: styledText }} />
      <UnstyledButton href="/" component={Link}>
        <Linky />
      </UnstyledButton>
    </Group>
  );
}

export default Navbar;
