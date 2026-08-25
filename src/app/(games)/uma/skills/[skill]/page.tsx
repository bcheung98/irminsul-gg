import { Suspense } from "react";

// Component imports
import SkillPage from "./SkillPage";
import Loader from "@/components/Loader";
import Page404 from "@/components/Page404";

// Helper imports
import { getData, getDataSet } from "@/api";
import { getMetadata } from "@/helpers/metadata";

// Type imports
import type { Metadata } from "next";
import { UmaSkill } from "@/types/uma/skill";

interface Props {
    params: Promise<{ skill: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { skill } = await params;
    const skillData = await getData<UmaSkill>(
        "uma/skills",
        (s) => s.id.toString() === skill,
    );

    return skillData
        ? getMetadata({
              game: "uma",
              tag: "skills",
              attributes: {
                  id: skillData.icon,
                  name:
                      skillData.name.global ||
                      skillData.name.jp ||
                      skillData.name.jpNative,
              },
              overrides: {
                  description:
                      skillData.description.global || skillData.description.jp,
              },
          })
        : {};
}

export default async function Page({ params }: Props) {
    const { skill } = await params;
    const skillList = await getDataSet<UmaSkill>("uma/skills");
    const skillData = await getData<UmaSkill>(
        "uma/skills",
        (s) => s.id.toString() === skill,
    );

    if (!skillData || !skillList) {
        return <Page404 />;
    }

    return (
        <Suspense fallback={<Loader />}>
            <SkillPage skills={skillList} skill={skillData} />
        </Suspense>
    );
}
