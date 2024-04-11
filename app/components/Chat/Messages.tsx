import React, { useRef } from 'react';
import { Paper, Text, ScrollArea, Avatar, useMantineTheme, Stack } from '@mantine/core';
import { Message } from 'ai';

export default function Messages({ messages }: { messages: Message[] }) {
  const messagesEndRef = useRef(null);
  const theme = useMantineTheme();

  return (
    <ScrollArea>
      <Stack p="xs" style={{ minHeight: '100%' }}>
        {messages.map((msg, index) => (
          <div 
            key={index} 
            style={{
              display: 'flex',
              justifyContent: msg.role === 'assistant' ? 'flex-start' : 'flex-end'
            }}
          >
            <Paper
              shadow="md"
              p="md"
              radius="lg"
              style={{ 
                maxWidth: '80%', 
                display: 'flex',
                alignItems: 'center'
              }}
              withBorder
            >
              {msg.role === 'assistant' ? (
                <Avatar radius="xl" src="/linky.png" alt="Linky" />
              ) : (
                <Avatar radius="xl">
                🧑‍💻
                </Avatar>
              )}      
              <Text
                // c={msg.role === 'assistant' ? 'green' : 'blue'}
                style={{ marginLeft: 10 }}
              >
                {msg.content}
              </Text>
            </Paper>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </Stack>
    </ScrollArea>
  );
}
