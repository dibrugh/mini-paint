import { CssBaseline } from '@mui/material';
import { Header, ImagesCardList } from '../../../widgets';
import { FilterSelect } from '../../../entities';
import { useState } from 'react';

const Main = () => {
    const [selectedUsers, setSelectedUsers] = useState<null | { label: string; value: string }[]>(null);
    return (
        <>
            <Header />
            <FilterSelect setSelectedUsers={setSelectedUsers} />
            <ImagesCardList selectedUsers={selectedUsers} />
            <CssBaseline />
        </>
    );
};

export default Main;
