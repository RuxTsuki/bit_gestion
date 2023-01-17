import { Link, useRouteError } from "react-router-dom";
import './error_page.css';

export const PageNotFound = () => {

    const error: any = useRouteError();
    console.error(error);

    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>

            <Link to={'/'}>Ir al Inicio</Link>
        </div>
    )
}
