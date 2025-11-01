import React, { SyntheticEvent } from 'react';
import { Snackbar, Alert, SnackbarCloseReason } from '@mui/material';


interface GenericToastProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  message: string
  autoHideDuration?: number
}

export default function GenericToast({
  open,
  setOpen,
  message,
  autoHideDuration
}: GenericToastProps) {
  const handleClose = (
    event: Event | SyntheticEvent,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') return; // クリック外で閉じないように
    setOpen(false);
  };

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={autoHideDuration ?? 5000} // 指定がなければ5秒後に自動で閉じる
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
}
