import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
    specialty?: string;
    outfit?: string;
    url: string;
}

export default function SiteSearch() {
    const router = useRouter();

    const { addRecentSearch } = useSiteSearchStore();

    const [searchOpen, setSearchOpen] = useState(false);
    const handleSearchOpen = () => {
        setSearchOpen(true);
    };
    const handleSearchClose = () => setSearchOpen(false);

    const handleSelect = (item: SearchResult, keypress?: boolean) => {
        setSearchOpen(false);
        addRecentSearch(item);
        if (keypress) router.push(item.url);
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
