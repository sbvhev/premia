import React from 'react';
import { Modal } from '@material-ui/core';

import TokenSearch from './TokenSearch';

interface CurrencySearchModalProps {
  isOpen: boolean;
  onDismiss: () => void;
}

export default function CurrencySearchModal({
  isOpen,
  onDismiss,
}: CurrencySearchModalProps) {
  return (
    <Modal open={isOpen} onClose={onDismiss}>
      <TokenSearch onDismiss={onDismiss} />
    </Modal>
  );
}
