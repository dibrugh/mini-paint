import { Modal, Box } from '@mui/material';
import React from 'react';

type ModalWindowProps = {
    children: React.ReactNode;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ModalWindow({ open, setOpen, children }: ModalWindowProps) {
    const handleClose = () => {
        setOpen(false);
    };
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        outline: 'none',
        transform: 'translate(-50%, -50%)',
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>{children}</Box>
        </Modal>
    );
}
