"use client";

import useSWR from "swr";

// Component imports
import InfoPageRoot from "@/components/InfoPageRoot";
import SupportSplash from "@/components/_uma/SupportSplash";
import SupportInfo from "@/components/_uma/SupportInfo";
import SupportEffects from "@/components/_uma/SupportEffects";
import SupportSkills from "@/components/_uma/SupportSkills";
import SupportEvents from "@/components/_uma/SupportEvents";
import Loader from "@/components/Loader";
import UmaBetaTag from "@/components/_uma/UmaBetaTag";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

// Helper imports
import { UmaContext } from "@/context";
import { useStore, useServerStore } from "@/stores";
import { urls } from "@/lib/fetchData";

// Type imports
import { AttributeData } from "@/types";
import { UmaCharacterProfile } from "@/types/uma/character";
import { EventList } from "@/types/uma/event";
import { UmaSkill } from "@/types/uma/skill";
import { UmaSupport } from "@/types/uma";
import { UmaSupportSkills } from "@/types/uma/support";

export default function SupportPage({
    support,
    profile,
    skills,
    events,
}: {
    support: UmaSupport;
    profile: UmaCharacterProfile;
    skills: UmaSkill[];
    events: Partial<EventList>;
}) {
    const profiles: UmaCharacterProfile[] = useSWR(
        urls["uma/character-profiles"],
        (url: string) => fetch(url).then((r) => r.json())
    ).data;

    const theme = useTheme();
    const matches_up_sm = useMediaQuery(theme.breakpoints.up("sm"));
    const matches_up_md = useMediaQuery(theme.breakpoints.up("md"));
    const matches_up_xl = useMediaQuery(theme.breakpoints.up("xl"));

    const server = useStore(useServerStore, (state) => state.uma);

    const attributes: AttributeData = {
        ...support,
        displayName: support.name,
        title: `[${support.title}]`,
        colors: {
            primary: profile.colors[0],
            secondary: profile.colors[1],
            accent: theme.text.selected,
        },
    };

    delete attributes["rarity"];

    let eventSkills = support.skillEvents;
    if (server === "Asia" && support.skillEventsJP)
        eventSkills = support.skillEventsJP;
    const supportSkills: UmaSupportSkills = {
        event: eventSkills,
        hint: support.hints.skills,
        stat: support.hints.stats,
    };

    const Splash = <SupportSplash support={support} />;

    const InfoMain = (
        <SupportInfo
            perks={support.perks}
            attributes={attributes}
            image={Splash}
        />
    );

    const Effects = <SupportEffects support={support} />;

    const Skills = <SupportSkills skills={supportSkills} />;

    const Events = <SupportEvents support={support} />;

    const Content = matches_up_xl ? (
        <Grid container spacing={2}>
            <Grid size={6}>
                <Stack spacing={2}>
                    {Effects}
                    {Events}
                </Stack>
            </Grid>
            <Grid size={6}>{Skills}</Grid>
        </Grid>
    ) : (
        <Stack spacing={2}>
            {Effects}
            {Skills}
            {Events}
        </Stack>
    );

    const leftColumn = [];
    if (matches_up_sm) leftColumn.push(Splash);

    const rightColumn = [];
    rightColumn.push(InfoMain);
    if (matches_up_md) rightColumn.push(Content);

    const header = <UmaBetaTag release={support.release} />;

    if (!profiles) return <Loader />;

    return (
        <UmaContext value={{ skills, events, profiles }}>
            <InfoPageRoot
                header={header}
                leftColumn={leftColumn.length > 0 && leftColumn}
                rightColumn={rightColumn.length > 0 && rightColumn}
                columnSizes={[{ xs: 5, sm: "auto" }, "grow"]}
            >
                {!matches_up_md && Content}
            </InfoPageRoot>
        </UmaContext>
    );
}
