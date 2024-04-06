import { Group } from '@mantine/core';
import './navbar.css';
import Linky from '../Linky/linky';

export function Navbar() {

  return( 
    <Group justify='flex-end'>        
      <Linky />
    </Group>
  );
}
