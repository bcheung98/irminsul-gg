"use client";

import { BaseSyntheticEvent, useState, useEffect, useTransition } from "react";
import { useShallow } from "zustand/react/shallow";

// Component imports
import InfoGallery from "@/components/InfoGallery";
import SkillList from "@/components/_uma/SkillList";

// Helper imports
import { useView } from "@/hooks";
import {
    useStore,
    useGalleryStore,
    useFilterStore,
    useServerStore,
} from "@/stores";
import { filterItems } from "@/helpers/filterItems";

// Type imports
import { UmaSkill } from "@/types/uma/skill";

export default function SkillsGallery(props: { skills: UmaSkill[] }) {
    const game = "uma";
    const tag = "uma/skills";

    const filters = useFilterStore(useShallow((state) => state[tag]));
    const sortParams = useGalleryStore(useShallow((state) => state[tag]));

    const server = useStore(useServerStore, (state) => state.uma);
    const hideUnreleasedContent = server === "NA";

    let skills = props.skills;
    if (hideUnreleasedContent) {
        skills = skills.filter((skill) => skill.name.global !== undefined);
    }

    const [loading, startTransition] = useTransition();
    const [searchValue, setSearchValue] = useState("");
    const [currentSkills, setCurrentSkills] = useState<UmaSkill[]>([]);

    useEffect(() => {
        startTransition(() => {
            setCurrentSkills(
                filterItems(game, skills, filters, searchValue, sortParams)
            );
        });
    }, [filters, searchValue, hideUnreleasedContent, sortParams]);

    const params = {
        view: sortParams.view,
        handleView: useView(tag),
        searchValue,
        handleInputChange: (event: BaseSyntheticEvent) => {
            setSearchValue(event.target.value);
        },
    };

    return (
        <InfoGallery title="Skills" buttonKeys={[]} {...params}>
            <SkillList skills={currentSkills} loading={loading} />
        </InfoGallery>
    );
}
