import { useContext, useState } from 'react';
import { Box, ImageListItem, ImageListItemBar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DocumentData } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { ModalWindow } from '../../../shared/ui';
import { AuthContext } from '../../../app/context/Auth';

const ImageCard = ({ cardData, handleDeleteImage }: DocumentData) => {
    const { id, name, email, image, documentId } = cardData;
    const currentUser = useContext(AuthContext);
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const renderEditAndDeleteIcons = () => {
        if (currentUser?.displayName === name) {
            return (
                <Box>
                    <Link to={`/editor/${id}`}>
                        <EditIcon />
                    </Link>
                    <DeleteIcon
                        onClick={() => {
                            handleDeleteImage(id, documentId);
                        }}
                    />
                </Box>
            );
        }
        return null;
    };
    return (
        <>
            <ImageListItem sx={{ position: 'relative' }} onClick={handleOpen}>
                {renderEditAndDeleteIcons()}
                <img
                    srcSet={`${image} 2x`}
                    src={image}
                    alt={`created by ${name}`}
                    loading="lazy"
                    style={{ cursor: 'zoom-in' }}
                />
                <ImageListItemBar
                    title={
                        <p>
                            author - <b>{name}</b>
                        </p>
                    }
                    subtitle={<span>Contact: {email}</span>}
                    position="below"
                />
            </ImageListItem>
            <ModalWindow open={open} setOpen={setOpen}>
                <img src={image} alt={`created by ${name}`} loading="lazy" style={{ cursor: 'zoom-in' }} />
            </ModalWindow>
        </>
    );
};

export default ImageCard;
