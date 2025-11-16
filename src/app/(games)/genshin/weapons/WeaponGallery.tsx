"use client";

import { BaseSyntheticEvent, useState, useEffect, useTransition } from "react";
import { useShallow } from "zustand/react/shallow";

// Component imports
import InfoGallery from "@/components/InfoGallery";
import InfoCard from "@/components/InfoCard";
import WeaponList from "./WeaponList";

// MUI imports
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";

// Helper imports
import { useStore, useView } from "@/hooks";
import { useGalleryStore } from "@/stores/useGalleryStore";
import { filterUnreleasedContent } from "@/helpers/isUnreleasedContent";
import { useSettingsStore } from "@/stores/useSettingsStore";
import { useFilterStore } from "@/stores/useFilterStore";
import { filterItems } from "@/helpers/filterItems";

// Type imports
import { GenshinWeapon } from "@/types/genshin/weapon";

export default function WeaponGallery(props: { weapons: GenshinWeapon[] }) {
    const game = "genshin";
    const tag = "genshin/weapons";

    const filters = useFilterStore(useShallow((state) => state[tag]));
    const sortParams = useGalleryStore(useShallow((state) => state[tag]));

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
    const [currentWeapons, setCurrentWeapons] = useState<GenshinWeapon[]>([]);

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
                            <InfoCard
                                tag={tag}
                                key={weapon.id}
                                name={weapon.name}
                                displayName={weapon.displayName}
                                rarity={weapon.rarity}
                                badgeLeft={{
                                    weaponType: weapon.weaponType,
                                    subStat: weapon.stats.subStat,
                                }}
                                url=""
                                href={weapon.url}
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
        handleView: useView(tag),
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
