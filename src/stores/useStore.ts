import { useState, useEffect } from "react";

export function useStore<T, F>(
    store: (callback: (state: T) => unknown) => unknown,
    storeCallback: (state: T) => F
) {
    const stateOfStore = store(storeCallback) as F;
    const [state, setState] = useState<F>();

    useEffect(() => {
        setState(stateOfStore);
    }, [stateOfStore]);

    return state;
}
