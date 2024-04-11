import React, { useRef } from 'react';
import { Paper, Text, Avatar, Stack, ScrollArea } from '@mantine/core';
import { Message } from 'ai';
import { CodeHighlight, InlineCodeHighlight } from '@mantine/code-highlight';

export default function Messages({ messages }: { messages: Message[] }) {
  const messagesEndRef = useRef(null);

  // Function to process message content and replace code blocks with InlineCodeHighlight components
  const processMessageContent = (message: string) => {
    const codeBlockRegex = /```(\w+)\s([\s\S]+?)```/g;
    const inlineCodeRegex = /`([^`]+)`/g; // Regex to match inline code blocks
    const parts = [];
    let lastIndex = 0;

    // First, replace multiline code blocks
    message.replace(codeBlockRegex, (match, language, code, index) => {
      // Add preceding text if there is any
      if (index > lastIndex) {
        parts.push(message.slice(lastIndex, index));
      }
      // Add the CodeHighlight component for the code block
      parts.push(
        <ScrollArea key={`block-${index}`} m="sm">
          <CodeHighlight code={code.trim()} language={language} withCopyButton={false}/>
        </ScrollArea>
      );
      lastIndex = index + match.length;
      return match; // This return is not used but is necessary for the replace function
    });

    // Then, replace inline code blocks
    const intermediateText = message.slice(lastIndex); // Text after handling multiline code blocks
    let intermediateLastIndex = 0;
    intermediateText.replace(inlineCodeRegex, (match, code, index) => {
      // Add preceding text if there is any
      if (index > intermediateLastIndex) {
        parts.push(intermediateText.slice(intermediateLastIndex, index));
      }
      // Add the InlineCodeHighlight component for the inline code block
      parts.push(
        <InlineCodeHighlight key={`inline-${index}`} code={code.trim()} />
      );
      intermediateLastIndex = index + match.length;
      return match; // This return is not used but is necessary for the replace function
    });

    // Add any remaining text after the last inline code block
    if (intermediateLastIndex < intermediateText.length) {
      parts.push(intermediateText.slice(intermediateLastIndex));
    }

    return parts;
  };

  return (
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
                maxWidth: '90%', 
                display: 'flex',
                alignItems: 'center'
              }}
              withBorder
            >
          {msg.role === 'assistant' ? (
            <Avatar radius="xl" src="/linky.png" alt="Linky" />
          ) : (
            <Avatar radius="xl">🧑‍💻</Avatar>
          )}
          <Text m="xs" maw="inherit">
            {processMessageContent(msg.content)}
          </Text>
        </Paper>
      </div>
      ))}
      <div ref={messagesEndRef} />
    </Stack>
  );
}
