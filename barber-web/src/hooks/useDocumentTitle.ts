import { useLayoutEffect } from "react";

const useDocumentTitle = (title: string) => {
    useLayoutEffect(() => {
        document.title = title;
    }, [title]);
};

export default useDocumentTitle;