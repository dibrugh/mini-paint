import { ImageListItem, ImageListItemBar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { DocumentData } from 'firebase/firestore';
import { handleDelete } from '../../../features';

const ImageCard = ({ cardData }: DocumentData) => {
    const { id, name, email, image, documentId } = cardData;

    return (
        <ImageListItem sx={{ position: 'relative' }}>
            <DeleteIcon
                onClick={() => {
                    handleDelete(id, documentId);
                    console.log('Deleted', id);
                }}
                sx={{
                    position: 'absolute',
                    top: 5,
                    right: 5,
                    borderRadius: '50%',
                    background: '#e1d9d9',
                    padding: '5px',
                    cursor: 'pointer',
                }}
            />
            <img srcSet={`${image} 2x`} src={image} alt={`created by ${name}`} loading="lazy" />
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
