import { useState, useEffect } from 'react';
import { Group, Title, UnstyledButton } from '@mantine/core';
import Link from 'next/link';
import './navbar.css';
import Linky from '../Linky/linky';

export function Navbar() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768); 
    };

    checkIsMobile(); 

    window.addEventListener('resize', checkIsMobile); 

    return () => {
      window.removeEventListener('resize', checkIsMobile); 
    };
  }, []);

  return( 
    <Group justify='space-between'>       
      {window.location.pathname === '/chat' && 
        <Title mb={20} ml={isMobile ? 30 : 70} ta="left" >
          Chat with <span style={{ color: '#01b7FF' }}>Linky</span>.
        </Title>
      }   
      <UnstyledButton href="/" component={Link}>
        <Linky />
      </UnstyledButton>
    </Group>
  );
}
