import { useEffect, useState } from "react";

// Component imports
import SiteSearchRoot from "./SiteSearchRoot";

// MUI imports

export default function SiteSearch() {
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

    const [focus, setFocus] = useState(-1);
    const handleFocusChange = (index: number) => {
        setFocus(index);
    };
    const handleFocusChangeKey = (
        values: any[],
        direction: "ArrowUp" | "ArrowDown"
    ) => {
        let index;
        if (direction === "ArrowUp") {
            index = focus - 1;
            if (index < 0) {
                index = values.length - 1;
            }
        } else {
            index = focus + 1;
            if (index > values.length - 1) {
                index = 0;
            }
        }
        setFocus(index);
        // document
        //     .getElementById(getURL(values[index]))
        //     ?.scrollIntoView({ behavior: "instant", block: "center" });
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

    return <SiteSearchRoot handleSearchOpen={handleSearchOpen} />;
}
