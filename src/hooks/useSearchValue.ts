import { useState, BaseSyntheticEvent } from "react";

export function useSearchValue() {
    const [searchValue, setSearchValue] = useState("");
    const handleInputChange = (event: BaseSyntheticEvent) => {
        setSearchValue(event.target.value);
    };
    return { searchValue, handleInputChange };
}
