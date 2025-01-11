import { useRouteError } from "react-router-dom"

export default () => {
    const error = useRouteError();

    let title = "Wystąpił błąd!";
    let message = "Coś poszło nie tak!"

    if (error instanceof Response && error.status === 500) {
        error.json().then(data => {
            message = data.message;
        });
    }

    if (error instanceof Response && error.status === 404) {
        title = "Nie znaleziono!";
        message = "Strona nie istnieje!";
    }

    return (
        <div className="h-full w-full bg-slate-200 flex justify-center items-center">
            <div className="bg-white p-8 border w-auto h-auto text-charcoal">
                <h1 className="font-cormorant text-xl font-medium uppercase">{title}</h1>
                <p className="font-lato uppercase font-bold text-xs tracking-wider">{message}</p>

            </div>
        </div>
    );
}