import React, { ChangeEvent, FormEvent } from 'react';
import { TextInput, Box, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconMessageForward } from '@tabler/icons-react';
import Messages from './Messages';
import { Message } from 'ai/react';

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

  const onSubmit = (values: { messageInput: string }) => {
    handleMessageSubmit(values.messageInput as unknown as React.FormEvent<HTMLFormElement>);
    form.reset();
  };

  return (
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
};

export default Chat;
