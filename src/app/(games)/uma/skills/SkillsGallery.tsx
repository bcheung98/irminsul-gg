"use client";

// Component imports
import InfoGallery, { useInfoGallery } from "@/components/InfoGallery";
import SkillList from "@/components/_uma/SkillList";

// Helper imports
import { UmaContext } from "@/context";
import { categories } from "@/data/categories";
import { useStore, useServerStore } from "@/stores";

// Type imports
import { UmaSkill } from "@/types/uma/skill";

export default function SkillsGallery(props: { skills: UmaSkill[] }) {
    const { params, gallery } = useInfoGallery({
        game: "uma",
        galleryKey: "uma/skills", // Pathname
        filterKey: "uma/skills", // Data tag
        items: props.skills,
        views: {
            list: (skills, isPending) => (
                <SkillList skills={skills} loading={isPending} />
            ),
        },
        defaultView: "list",
        hideUnreleased: useStore(useServerStore, (state) => state.uma) === "NA",
        filterUnreleased: (skills, { hideUnreleased }) =>
            hideUnreleased ? skills.filter((skill) => skill.global) : skills,
    });

    return (
        <UmaContext value={{ skills: props.skills, events: {}, profiles: [] }}>
            <InfoGallery title={categories["uma/skills"]} {...params}>
                {gallery}
            </InfoGallery>
        </UmaContext>
    );
}
