'use client';

import Chat from '@/components/Chat';
import { DarkToggle } from '@/components/Context/DarkToggle';
import { IndexMenu } from '@/components/Context/IndexMenu';
import { SimpleGrid, Paper } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { useChat } from 'ai/react';
import { useEffect, useRef, useState, FormEvent } from 'react';

const ChatPage: React.FC = () => {
  const { height, width } = useViewportSize();

  const [gotMessages, setGotMessages] = useState(false);
  const [context, setContext] = useState<string[] | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    onFinish: async () => {
      setGotMessages(true);
    },
  });

  const prevMessagesLengthRef = useRef(messages.length);

  const handleMessageSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmit(e);
    setContext(null);
    setGotMessages(false);
  };

  useEffect(() => {
    const getContext = async () => {
      const response = await fetch("/api/context", {
        method: "POST",
        body: JSON.stringify({
          messages,
        }),
      });
      const { context } = await response.json();
      setContext(context.map((c: any) => c.id));
    };
    if (gotMessages && messages.length >= prevMessagesLengthRef.current) {
      getContext();
    }

    prevMessagesLengthRef.current = messages.length;
  }, [messages, gotMessages]);

  return (
    <>
      <SimpleGrid
      cols={{ base: 1, sm: 2,}}
      spacing={{ base: 10, sm: 'xl' }}
      verticalSpacing={{ base: 'md', sm: 'xl' }}
    >
      <Paper p="xl" shadow="xs" radius="lg" h={height} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
      <Chat
          input={input}
          handleInputChange={handleInputChange}
          handleMessageSubmit={handleMessageSubmit}
          messages={messages}
        />
      </Paper>
      <IndexMenu />
    </SimpleGrid>
    </>
  );
}

export default ChatPage;