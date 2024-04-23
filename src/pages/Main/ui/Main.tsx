import { CssBaseline } from '@mui/material';
import { Header, ImagesCardList } from '../../../widgets';
import { FilterSelect } from '../../../entities';
import { useState } from 'react';

type OptionType = { label: string; value: string };

const Main = () => {
    const [selectedUsers, setSelectedUsers] = useState<OptionType[]>();
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
