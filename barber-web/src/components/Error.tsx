import { useRouteError, isRouteErrorResponse } from "react-router-dom"
import useDocumentTitle from "../hooks/useDocumentTitle";

export default () => {
    useDocumentTitle("MStudio - błąd");

    const error = useRouteError();

    let title = "Wystąpił błąd!";
    let message = "Coś poszło nie tak!"

    if (isRouteErrorResponse(error)) {
        if (error.status === 403) {
            title = "Dostęp zabroniony!";
            message = "Nie masz uprawnień do przeglądania tej strony";
            window.location.href = '/login';
            return null;
        } else {
            message = error.data.message || error.statusText;
        }
    }
    else if (error instanceof Error) {
        message = error.message;
    }
    else if (typeof error === 'string') {
        message = error;
    }

    return (
        <div className="h-screen w-screen bg-stone-100 flex justify-center items-center">
            <div className="bg-white px-32 py-24 border border-stone-300 w-auto h-auto text-charcoal flex flex-col justify-center items-center">
                <h1 className="font-cormorant text-xl font-medium uppercase p-4">{title}</h1>
                <p className="font-lato uppercase font-bold text-xs tracking-wider p-4">{message}</p>
            </div>
        </div>
    );
}