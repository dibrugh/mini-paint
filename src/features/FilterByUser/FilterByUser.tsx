import { useFetchImages } from '../../features/index';

export const UseFilterByUsers = () => {
    const { imagesData } = useFetchImages();
    const usersList = Array.from(new Set(imagesData?.map((el) => el.name)));
    const usersData = usersList.map((el) => ({
        label: el,
        value: el,
    }));

    return { usersData };
};
