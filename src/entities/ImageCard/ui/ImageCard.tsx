import { DocumentData } from 'firebase/firestore';

const ImageCard = ({ cardData }: DocumentData) => {
    const { name, email, image } = cardData;
    return (
        <>
            <p>{name}</p>
            <p>{email}</p>
            <img src={image} alt={`created by ${name}`} />
        </>
    );
};

export default ImageCard;
