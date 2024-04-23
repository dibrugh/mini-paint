import { Box, ImageListItem, ImageListItemBar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DocumentData } from 'firebase/firestore';

import { useContext } from 'react';
import { AuthContext } from '../../../app/context/Auth';
import { Link } from 'react-router-dom';

const ImageCard = ({ cardData, handleDeleteImage }: DocumentData) => {
    const { id, name, email, image, documentId } = cardData;
    const currentUser = useContext(AuthContext);

    return (
        <ImageListItem sx={{ position: 'relative' }}>
            {currentUser?.displayName === name ? (
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
                        onClick={() => {
                            handleDeleteImage(id, documentId);
                        }}
                    />
                </Box>
            ) : null}
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
    );
};

export default ImageCard;
