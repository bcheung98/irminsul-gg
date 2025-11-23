import { useEffect, useState } from "react";

// Component imports
import SiteSearchRoot from "./SiteSearchRoot";
import SiteSearchPopup from "./SiteSearchPopup";

// Helper imports
import { useSiteSearchStore } from "@/stores";

// Type imports
import { BaseDataWithRelease } from "@/types";

export interface SearchResult extends BaseDataWithRelease {
    displayName: string;
    category: string;
    rarity: number;
    url: string;
}

export default function SiteSearch() {
    const { addRecentSearch } = useSiteSearchStore();

    const [searchOpen, setSearchOpen] = useState(false);
    const handleSearchOpen = () => {
        setSearchOpen(true);
    };
    const handleSearchClose = () => setSearchOpen(false);

    const handleSelect = (item: SearchResult) => {
        setSearchOpen(false);
        addRecentSearch(item);
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
                handleSelect={handleSelect}
            />
        </>
    );
}
