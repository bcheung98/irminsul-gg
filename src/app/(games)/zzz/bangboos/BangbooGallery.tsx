"use client";

import { BaseSyntheticEvent, useState, useEffect, useTransition } from "react";

// Component imports
import InfoGallery from "@/components/InfoGallery";
import { ZZZBangbooInfoCard } from "@/components/InfoCard";

// MUI imports
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";

// Helper imports
import { useStore, useSettingsStore } from "@/stores";
import { filterUnreleasedContent } from "@/helpers/isUnreleasedContent";
import sortItems from "@/helpers/zzz/sortItems";

// Type imports
import { ZZZBangboo } from "@/types/zzz";
import { GalleryView } from "@/types";

export default function BangbooGallery(props: { bangboo: ZZZBangboo[] }) {
    const hideUnreleasedContent = useStore(
        useSettingsStore,
        (state) => state.hideUnreleasedContent
    );

    const bangboo = sortItems({
        items: filterUnreleasedContent(
            hideUnreleasedContent,
            props.bangboo,
            "zzz"
        ),
        value: "version",
        reverse: false,
    });

    const [loading, startTransition] = useTransition();
    const [searchValue, setSearchValue] = useState("");
    const [currentBangboo, setCurrentBangboo] = useState<ZZZBangboo[]>([]);

    useEffect(() => {
        startTransition(() => {
            setCurrentBangboo(filterBangboo(bangboo, searchValue));
        });
    }, [searchValue, hideUnreleasedContent]);

    function renderGallery() {
        if (loading) return <LinearProgress />;
        return (
            <Grid container spacing={3}>
                {currentBangboo.map((bangboo) => (
                    <ZZZBangbooInfoCard key={bangboo.id} bangboo={bangboo} />
                ))}
            </Grid>
        );
    }

    const params = {
        view: "icon" as GalleryView,
        handleView: () => {},
        searchValue,
        handleInputChange: (event: BaseSyntheticEvent) => {
            setSearchValue(event.target.value);
        },
    };

    return (
        <InfoGallery title="Bangboos" buttonKeys={[]} hideFilters {...params}>
            {renderGallery()}
        </InfoGallery>
    );
}

function filterBangboo(bangboo: ZZZBangboo[], searchValue: string) {
    let res = [...bangboo];
    if (searchValue !== "") {
        res = res.filter(
            (item) =>
                item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                item.displayName
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())
        );
    }
    return res;
}
