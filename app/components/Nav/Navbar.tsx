import { Group, UnstyledButton } from '@mantine/core';
import Link from 'next/link'
import './navbar.css';
import Linky from '../Linky/linky';

export function Navbar() {

  return( 
    <Group justify='flex-end'>      
    <UnstyledButton href="/" component={Link}>
      <Linky />
      </UnstyledButton>  
    </Group>

  );
}
