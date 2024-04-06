import { Title, Text, TextInput, ActionIcon } from '@mantine/core';
import classes from './Welcome.module.css';
import { IconSearch } from '@tabler/icons-react';

export function Welcome() {
  return (
    <>
      <Title className={classes.title} ta="left" mt={100} ml={140} fz={130}>
        Hi, I'm {' '}
        <Text inherit variant="gradient" component="span" gradient={{ from: '#01b7FF', to: '#01b7FF' }}>
          Linky
        </Text>
        <TextInput className={classes.searchUrl} size="xl" radius="lg" mt={30} placeholder='Paste your URL here' fw={500}/>
        
      </Title>
    </>
  );
}
