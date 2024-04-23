import { useFetchImages, handleDelete } from '../../../features';
import { useMediaQuery, Box, Container, Modal } from '@mui/material';

import ImageList from '@mui/material/ImageList';
import { ImageCard } from '../../../entities';
import { useState } from 'react';

type OptionType = { label: string; value: string };
type ImagesCardListProps = {
    selectedUsers: OptionType[] | undefined;
};

const ImagesCardList = ({ selectedUsers }: ImagesCardListProps) => {
    const { imagesData } = useFetchImages(selectedUsers);
    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState({
        image: '',
        name: '',
    });

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDeleteImage = (id: string, documentId: string) => {
        handleDelete(id, documentId);
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

    const matchDownSm = useMediaQuery('(max-width:700px)');

    return (
        imagesData && (
            <Container sx={{ paddingTop: '20px' }}>
                <ImageList cols={matchDownSm ? 2 : 4} gap={8}>
                    {imagesData.map((el) => (
                        <ImageCard
                            key={el.id}
                            cardData={el}
                            handleDeleteImage={handleDeleteImage}
                            setSelectedImage={setSelectedImage}
                            onClick={handleOpen}
                        />
                    ))}
                </ImageList>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <img
                            srcSet={`${selectedImage.image}`}
                            src={selectedImage.image}
                            alt={`created by ${selectedImage.image}`}
                            loading="lazy"
                            style={{ cursor: 'zoom-in', width: '100%', height: 'auto' }}
                        />
                    </Box>
                </Modal>
            </Container>
        )
    );
};

export default ImagesCardList;
