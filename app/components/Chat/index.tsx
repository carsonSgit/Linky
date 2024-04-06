import React, { ChangeEvent, FormEvent } from 'react';
import { TextInput, Box, Stack, ScrollArea } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconMessageForward } from '@tabler/icons-react';
import Messages from './Messages';
import { Message } from 'ai/react';
import { useMediaQuery } from '@mantine/hooks';

interface Chat {
  input: string;
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleMessageSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>;
  messages: Message[];
}

const Chat: React.FC<Chat> = ({ input, handleInputChange, handleMessageSubmit, messages }) => {
  const form = useForm({
    initialValues: {
      messageInput: '',
    },
  });

  const isMobile = useMediaQuery('(max-width: 768px)');

  const chatContent = (
    <Stack p="lg">
      <Messages messages={
      messages.length > 0 ? messages : [{ id: '1', content: 'Hello, how can I help you today?', role: 'assistant' }]} />
      
      <Box mt="md" mb="md">
        <form
          onSubmit={handleMessageSubmit}
        >
            <TextInput
              size="lg"
              radius="lg"              
              placeholder="Talk with Linky..."
              value={input}
              onChange={handleInputChange}
              rightSection={<IconMessageForward />}
            />
        </form>
      </Box>
    </Stack>
  );

  return isMobile ? chatContent : (
    <ScrollArea>
      {chatContent}
    </ScrollArea>
  );
};

export default Chat;
