import { signOut } from '../../../features';
// Нет navigate после signOut

const Main = () => {
    return (
        <>
            <div>Main Page</div>
            <button
                onClick={async () => {
                    try {
                        signOut();
                    } catch (error) {
                        console.log(error.message);
                    }
                }}
            >
                Sign out
            </button>
        </>
    );
};

export default Main;
