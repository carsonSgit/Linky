import { Group, Button, Image } from '@mantine/core';
import { IconPhoto, IconDownload, IconArrowRight } from '@tabler/icons-react';
import './navbar.css';

export function Navbar() {

  return( 
    <Group justify='flex-end'>
        <Image src="/linky.png" alt="Navbar Image" 
          mt={15} mr={15} w={50} h='auto' fit='contain'/>
      
    </Group>
  );
}
