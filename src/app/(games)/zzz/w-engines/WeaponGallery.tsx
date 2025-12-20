"use client";

import { BaseSyntheticEvent, useState, useEffect, useTransition } from "react";
import { useShallow } from "zustand/react/shallow";

// Component imports
import InfoGallery from "@/components/InfoGallery";
import { ZZZWeaponInfoCard } from "@/components/InfoCard";
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
import { ZZZWeapon } from "@/types/zzz/weapon";

export default function WeaponGallery(props: { weapons: ZZZWeapon[] }) {
    const game = "zzz";
    const tag = "zzz/weapons";

    const filters = useFilterStore(useShallow((state) => state[tag]));
    const sortParams = useGalleryStore(
        useShallow((state) => state["zzz/w-engines"])
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
    const [currentWeapons, setCurrentWeapons] = useState<ZZZWeapon[]>([]);

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
                            <ZZZWeaponInfoCard
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
        handleView: useView("zzz/w-engines"),
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
