// src/hooks/useToast.ts

import { useState } from 'react';

export const useToast = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const showToast = (msg: string) => {
    setMessage(msg);
    setOpen(true);
  };

  return {
    open,
    setOpen,
    message,
    showToast,
  };
};
