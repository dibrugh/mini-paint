import { Link, useRouteError } from 'react-router-dom';

export default function Error() {
    const error = useRouteError() as Error; // Type assertion to 'Error'
    console.error(error);

    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.message}</i>
            </p>
            <Link to="/">Return to Home Page</Link>
        </div>
    );
}
