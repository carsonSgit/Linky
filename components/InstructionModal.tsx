import React from 'react';
import { Modal, Text, Title, Button } from '@mantine/core';

interface InstructionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InstructionModal: React.FC<InstructionModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      title={<Title order={2}>Instructions for Linky</Title>}
      size="lg"
    >
      <Text>
        Linky demonstrates a simple RAG pattern using 
        <Text component="a" href="https://pinecone.io" target="_blank" color="blue"> Pinecone </Text> 
        and Vercel&apos;s AI SDK.
      </Text>
    </Modal>
  );
};

export default InstructionModal;
