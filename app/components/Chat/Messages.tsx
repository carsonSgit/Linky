import React, { useRef } from 'react';
import { Paper, Text, Avatar, Stack, ScrollArea } from '@mantine/core';
import { Message } from 'ai';
import { CodeHighlight, InlineCodeHighlight } from '@mantine/code-highlight';

export default function Messages({ messages }: { messages: Message[] }) {
  const messagesEndRef = useRef(null);

  // Function to process message content and replace code blocks with InlineCodeHighlight components
  const processMessageContent = (message: string): React.ReactNode[] => {
    const codeBlockRegex = /```(\w+)\s*([\s\S]+?)```/g; // Adjusted regex to allow optional whitespace after the language
    const inlineCodeRegex = /`([^`]+)`/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;

    // Split the message by multiline code blocks, keeping the delimiters
    const splitMessage = message.split(/(```\w+\s*[\s\S]+?```)/g);

    splitMessage.forEach((part, index) => {
      if (codeBlockRegex.test(part)) {
        // Reset the lastIndex for global regex to ensure it matches from the beginning of the string
        codeBlockRegex.lastIndex = 0;
        const match = codeBlockRegex.exec(part);
        if (match) {
          const [, language, code] = match;
          parts.push(
            <ScrollArea key={`block-${index}`} m="sm" maw="inherit">
              <CodeHighlight code={code.trim()} language={language} withCopyButton={false}/>
            </ScrollArea>
          );
        }
      } else {
        // This part is either plain text or contains inline code blocks
        let intermediateLastIndex = 0;
        part.replace(inlineCodeRegex, (match, code, matchIndex) => {
          // Add preceding text if there is any
          if (matchIndex > intermediateLastIndex) {
            parts.push(part.slice(intermediateLastIndex, matchIndex));
          }
          // Add the InlineCodeHighlight component for the inline code block
          parts.push(
            <InlineCodeHighlight key={`inline-${index}-${matchIndex}`} code={code.trim()} />
          );
          intermediateLastIndex = matchIndex + match.length;
          return match; // This return is not used but is necessary for the replace function
        });

        // Add any remaining text after the last inline code block
        if (intermediateLastIndex < part.length) {
          parts.push(part.slice(intermediateLastIndex));
        }
      }
    });

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
