import React, { useRef } from 'react';
import { Paper, Text, ScrollArea, Avatar, useMantineTheme, Stack } from '@mantine/core';
import { Message } from 'ai';

export default function Messages({ messages }: { messages: Message[] }) {
  const messagesEndRef = useRef(null);
  const theme = useMantineTheme();

  return (
    <ScrollArea style={{ height: '100%' }}>
      <Stack p="xs" style={{ minHeight: '100%' }}>
        {messages.map((msg, index) => (
          <Paper
            key={index}
            shadow="md"
            p="md"
            radius="md"
            style={{
              backgroundColor: theme.colors.gray[8],
              borderColor: theme.colors.gray[6],
              borderWidth: 1,
              borderStyle: 'solid',
              margin: '10px 0',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Avatar color="blue" radius="xl">
              {msg.role === 'assistant' ? '👻' : '🧑‍💻'}
            </Avatar>
            <Text
              c={msg.role === 'assistant' ? 'green' : 'blue'}
              style={{ marginLeft: 10 }}
            >
              {msg.content}
            </Text>
          </Paper>
        ))}
        <div ref={messagesEndRef} />
      </Stack>
    </ScrollArea>
  );
}
