import { useEffect, useState } from "react";

// Component imports
import SiteSearchRoot from "./SiteSearchRoot";
import SiteSearchPopup from "./SiteSearchPopup";

// Type imports
import { BaseDataWithRelease } from "@/types";

export interface SearchResult extends BaseDataWithRelease {
    displayName: string;
    category: string;
}

export default function SiteSearch() {
    const [focus, setFocus] = useState(-1);
    const handleFocusChange = (index: number) => {
        setFocus(index);
    };

    const [searchOpen, setSearchOpen] = useState(false);
    const handleSearchOpen = () => {
        setFocus(-1);
        setSearchValue("");
        setSearchOpen(true);
    };
    const handleSearchClose = () => setSearchOpen(false);

    const [searchValue, setSearchValue] = useState("");
    const handleInputChange = (event: React.BaseSyntheticEvent) => {
        setFocus(-1);
        setSearchValue(event.target.value);
    };

    const handleSelect = (option: SearchResult, keyPress = false) => {
        setSearchOpen(false);
    };

    const keyDownHandler = (event: KeyboardEvent) => {
        if (event.ctrlKey && event.key === "k") {
            event.preventDefault();
            if (!searchOpen) {
                handleSearchOpen();
            }
        }
    };

    useEffect(() => {
        window.addEventListener("keydown", keyDownHandler);
    }, []);

    return (
        <>
            <SiteSearchRoot handleSearchOpen={handleSearchOpen} />
            <SiteSearchPopup
                open={searchOpen}
                setOpen={setSearchOpen}
                onClose={handleSearchClose}
                value={searchValue}
                focus={focus}
                handleFocusChange={handleFocusChange}
                handleInputChange={handleInputChange}
                handleSelect={handleSelect}
            />
        </>
    );
}
