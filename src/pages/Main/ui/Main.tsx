import { signOut } from '../../../features';

const Main = () => {
    return (
        <>
            <div>Main Page</div>
            <button onClick={signOut}>Sign out</button>
        </>
    );
};

export default Main;
