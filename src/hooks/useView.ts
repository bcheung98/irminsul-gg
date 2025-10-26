import { useState, BaseSyntheticEvent } from "react";

export function useView<T>(initialValue: T) {
    const [view, setView] = useState<T>(initialValue);
    const handleView = (_: BaseSyntheticEvent, view: T) => {
        if (view !== null) {
            setView(view);
        }
    };
    return { view, handleView };
}
