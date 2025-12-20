import { Suspense } from "react";

// Component imports
import SkillsGallery from "./SkillsGallery";
import Loader from "@/components/Loader";

// Helper imports
import { getDataSet } from "@/lib/fetchData";

// Type imports
import type { Metadata } from "next";
import { UmaSkill } from "@/types/uma/skill";

export const metadata: Metadata = {
    title: "Skills",
    description: "A list of all Umamusume Skills",
};

export default async function Page() {
    const skills = await getDataSet<UmaSkill>("uma/skills");

    return (
        <Suspense fallback={<Loader />}>
            <SkillsGallery skills={skills} />
        </Suspense>
    );
}
