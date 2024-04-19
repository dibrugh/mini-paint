import { UsefetchImages } from '../ImagesCRUD/lib/UsefetchImages';

export const UseFilterByUsers = () => {
    const { imagesData } = UsefetchImages();
    const usersList = Array.from(new Set(imagesData?.map((el) => el.name)));
    const usersData = usersList.map((el) => ({
        label: el,
        value: el,
    }));

    return { usersList, usersData };
};
