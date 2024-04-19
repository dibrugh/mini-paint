import { CssBaseline } from '@mui/material';
import { Header, ImagesCardList } from '../../../widgets';
import { FilterSelect } from '../../../entities';

const Main = () => {
    return (
        <>
            <Header />
            <FilterSelect />
            <ImagesCardList />
            <CssBaseline />
        </>
    );
};

export default Main;
