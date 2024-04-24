import { useState } from 'react';
import { Box, ImageListItem, ImageListItemBar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DocumentData } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { ModalWindow } from '../../../shared/ui';
import { handleDelete } from '../../../features';
import { useUser } from '../../../app/store/useUser';

const ImageCard = ({ cardData }: DocumentData) => {
    const { id, name, image, documentId } = cardData;
    const { email, displayName } = useUser();
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleDeleteImage = (event: React.MouseEvent<SVGSVGElement, MouseEvent>, id: string, documentId: string) => {
        handleDelete(id, documentId);
        event.stopPropagation();
    };

    const renderEditAndDeleteIcons = () => {
        if (displayName === name) {
            return (
                <Box
                    sx={{
                        position: 'absolute',
                        top: 5,
                        right: 5,
                        cursor: 'pointer',
                        display: 'flex',
                        gap: '10px',
                    }}
                >
                    <Link to={`/editor/${id}`}>
                        <EditIcon />
                    </Link>
                    <DeleteIcon
                        onClick={(event) => {
                            handleDeleteImage(event, id, documentId);
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
