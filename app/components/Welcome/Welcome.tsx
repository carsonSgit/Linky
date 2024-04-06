import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addUrl } from '../Context/urls';
import { Title, Text, TextInput, ActionIcon, Loader } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import classes from './Welcome.module.css';
import { IconClipboard } from '@tabler/icons-react';

const Welcome = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false); // Define loading state
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Start loading
    const onError = (error: string) => {
      console.error("Error:", error);
      showNotification({
        title: 'Error',
        message: error,
        color: 'red',
      });
    };
    await addUrl(url, setLoading, onError);
    await router.push('/chat');
  };

  return (
    <>
      <Title className={classes.title} ta="left" mt={100} ml={140} fz={130}>
        Hi, I'm {' '}
        <Text inherit variant="gradient" component="span" gradient={{ from: '#01b7FF', to: '#01b7FF' }} pr={3}>
          Linky
        </Text>
        .
        <form onSubmit={handleSubmit}>
          <TextInput className={classes.searchUrl} size="xl" radius="lg" mt={30} placeholder='Paste your URL here' fw={500} rightSection={loading ? <Loader size="xs" /> : <IconClipboard />} value={url} onChange={(e) => setUrl(e.target.value)}/>
        </form>
      </Title>
    </>
  );
}

export default Welcome;