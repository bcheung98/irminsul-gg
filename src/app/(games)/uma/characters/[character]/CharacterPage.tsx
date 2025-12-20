"use client";

import useSWR from "swr";

// Component imports
import InfoPageRoot from "@/components/InfoPageRoot";
import CharacterInfo from "@/components/_uma/CharacterInfo";
import CharacterSkills from "@/components/_uma/CharacterSkills";
import CharacterEvents from "@/components/_uma/CharacterEvents";
import Image from "@/components/Image";
import Loader from "@/components/Loader";
import UmaBetaTag from "@/components/_uma/UmaBetaTag";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Grid from "@mui/material/Grid";

// Helper imports
import { UmaContext } from "@/context";
import { useStore, useServerStore } from "@/stores";
import { urls } from "@/lib/fetchData";

// Type imports
import { AttributeData } from "@/types";
import {
    UmaCharacter,
    UmaCharacterProfile,
    UmaCharacterSkills,
} from "@/types/uma/character";
import { EventList } from "@/types/uma/event";
import { UmaSkill } from "@/types/uma/skill";

export default function CharacterPage({
    character,
    profile,
    skills,
    events,
}: {
    character: UmaCharacter;
    profile: UmaCharacterProfile;
    skills: UmaSkill[];
    events: Partial<EventList>;
}) {
    const profiles: UmaCharacterProfile[] = useSWR(
        urls["uma/character-profiles"],
        (url: string) => fetch(url).then((r) => r.json())
    ).data;

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));

    const server = useStore(useServerStore, (state) => state.uma);

    const attributes: AttributeData = {
        ...character,
        displayName: character.name,
        title: `[${character.title}]`,
        colors: {
            primary: profile.colors[0],
            secondary: profile.colors[1],
            accent: theme.text.selected,
        },
    };

    let eventSkills = character.skills.event;
    if (server === "Asia" && character.skills.eventJP)
        eventSkills = character.skills.eventJP;
    const charSkills: UmaCharacterSkills = {
        ...character.skills,
        event: eventSkills,
    };
    delete charSkills.eventJP;

    const Splash = (
        <Image
            src={`uma/characters/${character.id}`}
            style={{
                width: matches ? "100%" : "128px",
                maxWidth: "512px",
                height: matches ? "100%" : "128px",
                backgroundColor: theme.background(2),
                borderRadius: theme.contentBox.border.radius * 4,
            }}
        />
    );

    const InfoMain = (
        <CharacterInfo
            attributes={attributes}
            stats={character.stats}
            aptitude={character.aptitude}
            image={Splash}
        />
    );

    const Skills = <CharacterSkills skills={charSkills} />;

    const Events = <CharacterEvents character={character} />;

    const leftColumn = [];
    if (matches) leftColumn.push(Splash);

    const rightColumn = [];
    rightColumn.push(InfoMain);

    const header = <UmaBetaTag release={character.release} />;

    if (!profiles) return <Loader />;

    return (
        <UmaContext value={{ skills, events, profiles }}>
            <InfoPageRoot
                header={header}
                leftColumn={leftColumn.length > 0 && leftColumn}
                rightColumn={rightColumn.length > 0 && rightColumn}
                columnSizes={[{ xs: 4, xl: "auto" }, "grow"]}
            >
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, lg: 6 }}>{Skills}</Grid>
                    <Grid size={{ xs: 12, lg: 6 }}>{Events}</Grid>
                </Grid>
            </InfoPageRoot>
        </UmaContext>
    );
}
