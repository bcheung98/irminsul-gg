import { useState, useTransition } from "react";

// Component imports
import SearchBar from "@/components/SearchBar";

export default function InfoGallerySearch({
    searchValue,
    setSearchValue,
}: {
    searchValue: string;
    setSearchValue: (value: string) => void;
}) {
    const [value, setValue] = useState(searchValue);
    const [, startTransition] = useTransition();

    const handleChange = (event: React.BaseSyntheticEvent) => {
        const value = event.target.value;

        setValue(value);

        startTransition(() => {
            setSearchValue(value);
        });
    };

    return (
        <SearchBar
            placeholder="Search"
            value={value}
            onChange={handleChange}
            sx={{ height: "32px" }}
        />
    );
}
