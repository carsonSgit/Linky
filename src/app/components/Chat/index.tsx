import React from 'react';
import { TextInput, Button, Group, Box, Stack, ActionIcon } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconArrowUp } from '@tabler/icons-react';
import Messages from './Messages';
import { Message } from 'ai/react';

interface ChatProps {
  input: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleMessageSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  messages: Message[];
}

const Chat: React.FC<ChatProps> = ({ input, handleInputChange, handleMessageSubmit, messages }) => {
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
      messages.length > 0 ? messages : [
        { id: '1', content: 'Hello, how can I help you today?', role: 'assistant' },
        { id: '2', content: 'I was wondering about your services.', role: 'user' },
        { id: '3', content: 'Sure, we offer a wide range of services including...', role: 'assistant' },
        { id: '4', content: 'That sounds great, can you tell me more about...', role: 'user' },
        { id: '5', content: 'Of course! Our services are designed to...', role: 'assistant' }
      ]
      } />
      
      <Box mt="md" mb="md">
        <form onSubmit={form.onSubmit(onSubmit)}>
          <Group justify="space-between">
            <TextInput
              required
              placeholder="Type your message here..."
              value={input}
              onChange={handleInputChange}
              rightSection={
                <ActionIcon
                  variant="filled"
                  aria-label="Send message"
                >
                  <IconArrowUp />
                </ActionIcon>
              }
            />
          </Group>
        </form>
      </Box>
    </Stack>
  );
};

export default Chat;
