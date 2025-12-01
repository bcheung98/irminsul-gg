"use client";

import { BaseSyntheticEvent, useState, useEffect, useTransition } from "react";
import { useShallow } from "zustand/react/shallow";

// Component imports
import InfoGallery from "@/components/InfoGallery";
import { HSRWeaponInfoCard } from "@/components/InfoCard";
import WeaponList from "./WeaponList";

// MUI imports
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";

// Helper imports
import { useView } from "@/hooks";
import {
    useStore,
    useGalleryStore,
    useSettingsStore,
    useFilterStore,
} from "@/stores";
import { filterUnreleasedContent } from "@/helpers/isUnreleasedContent";
import { filterItems } from "@/helpers/filterItems";

// Type imports
import { HSRWeapon } from "@/types/hsr/weapon";

export default function WeaponGallery(props: { weapons: HSRWeapon[] }) {
    const game = "hsr";
    const tag = "hsr/weapons";

    const filters = useFilterStore(useShallow((state) => state[tag]));
    const sortParams = useGalleryStore(
        useShallow((state) => state["hsr/lightcones"])
    );

    const hideUnreleasedContent = useStore(
        useSettingsStore,
        (state) => state.hideUnreleasedContent
    );

    const weapons = filterUnreleasedContent(
        hideUnreleasedContent,
        props.weapons,
        game
    );

    const [loading, startTransition] = useTransition();
    const [searchValue, setSearchValue] = useState("");
    const [currentWeapons, setCurrentWeapons] = useState<HSRWeapon[]>([]);

    useEffect(() => {
        startTransition(() => {
            setCurrentWeapons(
                filterItems(game, weapons, filters, searchValue, sortParams)
            );
        });
    }, [filters, searchValue, hideUnreleasedContent, sortParams]);

    function renderGallery() {
        switch (sortParams.view) {
            case "icon":
            default:
                if (loading) return <LinearProgress />;
                return (
                    <Grid container spacing={3}>
                        {currentWeapons.map((weapon) => (
                            <HSRWeaponInfoCard
                                key={weapon.id}
                                weapon={weapon}
                            />
                        ))}
                    </Grid>
                );
            case "list":
                return (
                    <WeaponList weapons={currentWeapons} loading={loading} />
                );
        }
    }

    const params = {
        view: sortParams.view,
        handleView: useView("hsr/lightcones"),
        searchValue,
        handleInputChange: (event: BaseSyntheticEvent) => {
            setSearchValue(event.target.value);
        },
    };

    return (
        <InfoGallery title="Weapons" buttonKeys={["icon", "list"]} {...params}>
            {renderGallery()}
        </InfoGallery>
    );
}
