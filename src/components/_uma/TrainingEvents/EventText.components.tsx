import { useState, Fragment } from "react";
import parse from "html-react-parser";

// Component imports
import ContentDialog from "@/components/ContentDialog";
import Tooltip from "@/components/Tooltip";
import SkillPopup from "@/components/_uma/SkillPopup";
import EventRewardsComponent from "./EventRewards";

// MUI imports
import { useTheme } from "@mui/material/styles";

// Helper imports
import { useUmaContext } from "@/context";
import { countText, getOrdinal } from "@/utils";
import { statusEffects } from "@/data/uma/statusEffects";
import { getRaceName } from "@/helpers/uma/races";
import { raceSeries } from "@/data/uma/races";
import { getRaceRewards } from "@/helpers/uma/getRaceRewards";
import { useEventInteraction } from "./EventInteractions";
import { optionalRacePlacements } from "@/data/uma/raceRewards";

// Type imports
import type { EventRewards, EventSubHint } from "@/types/uma/event";
import type { UmaSkill } from "@/types/uma/skill";

const dialogStyle = {
    ".MuiDialog-paper": {
        maxWidth: "900px",
        maxHeight: { md: "600px" },
    },
};

export function TextHighlight({
    children,
    color,
}: {
    children: React.ReactNode;
    color?: string;
}) {
    const theme = useTheme();
    return (
        <span
            style={{
                color: color ?? theme.text.header,
                fontWeight: theme.font.weight.highlight,
            }}
        >
            {children}
        </span>
    );
}

function SkillLink({ skill }: { skill: UmaSkill }) {
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    return (
        <>
            <span
                onClick={() => setOpen(true)}
                style={{
                    color: theme.text.uma.value,
                    fontWeight: theme.font.weight.highlight,
                    textDecoration: "underline",
                    cursor: "pointer",
                }}
            >
                {skill.name.global || skill.name.jp}
            </span>
            <ContentDialog
                open={open}
                setOpen={setOpen}
                header="Skill Details"
                sx={dialogStyle}
            >
                <SkillPopup skill={skill} />
            </ContentDialog>
        </>
    );
}

export function SkillHint({
    event,
    isHint,
    heal,
    lose,
}: {
    event: EventRewards;
    isHint: boolean;
    heal?: boolean;
    lose?: boolean;
}) {
    const { skills } = useUmaContext();

    const { value, data } = event;
    const skill = skills.find((skill) => skill.id === data);

    if (!skill) return null;

    let text = "";
    if (heal) text = "Heal ";
    else if (!isHint) text = lose ? "Lose " : "Obtain ";

    return (
        <>
            {text}
            <SkillLink skill={skill} />
            {isHint && ` hint ${value}`}
        </>
    );
}

export function SkillText({
    event,
    text = "Obtain",
}: {
    event: EventRewards;
    text?: string;
}) {
    const { skills } = useUmaContext();

    const { value, data } = event;
    const skill = skills.find(
        (skill) => skill.id === value || skill.id === data,
    );

    if (!skill) return null;

    const [s1, s2] = text.split("<>");

    return (
        <>
            {s1 || "Obtain "}
            <SkillLink skill={skill} />
            {s2 && ` ${s2}`}
        </>
    );
}

export function SkillTextRandom({ eventHints }: { eventHints?: EventSubHint }) {
    if (!eventHints) return null;

    return (
        <>
            {eventHints.map((hint, index) => (
                <Fragment key={index}>
                    <SkillHint event={hint} isHint />
                    {index < eventHints.length - 1 && (
                        <TextHighlight> or </TextHighlight>
                    )}
                </Fragment>
            ))}
        </>
    );
}

export function StatusEffect({
    effectID,
    text = "",
    count = 1,
}: {
    effectID?: number | string;
    text?: string;
    count?: number | number[];
}) {
    const theme = useTheme();

    const effect = statusEffects.find(
        (effect) => effect.id === Number(effectID),
    );
    let name = "?";
    let description = "";
    if (effect) {
        name = effect.name || effect.nameJP;
        description = effect.description || effect.descriptionJP;
    }
    const [s1, s2] = text.split("<>");
    return (
        <>
            {s1 && `${s1} `}
            <Tooltip title={parse(description)} placement="top" width="300px">
                <span
                    style={{
                        color: theme.text.uma.value,
                        fontWeight: theme.font.weight.highlight,
                        textDecoration: "underline dotted",
                        cursor: "help",
                    }}
                >
                    {name}
                </span>
            </Tooltip>
            {s2 && ` ${s2}`}
            {countText({
                count,
                single: "",
                multi: `${count} times`,
            })}
        </>
    );
}

export function Race({
    race = 0,
    text = "Win the",
    count = 1,
}: {
    race?: number | string;
    text?: string;
    count?: number;
}) {
    const [s1, s2, s3] = text.split("<>");
    return (
        <>
            {s1 && `${s1} `}
            <TextHighlight>{getRaceName(race.toString())}</TextHighlight>
            {s2 && ` ${s2}`}
            {s3 && count > 1 && ` ${s3}`}
        </>
    );
}

export function RaceMulti({
    races = [],
    text = "Win the following races:",
    divider = ", ",
}: {
    races?: (string | number)[];
    text?: string;
    divider?: string;
}) {
    return (
        <>
            {text && `${text} `}
            {races.map((race, index) => (
                <Fragment key={index}>
                    <TextHighlight>
                        {getRaceName(race.toString())}
                    </TextHighlight>
                    {index < races.length - 1 && divider}
                </Fragment>
            ))}
        </>
    );
}

export function RaceSeries({
    tag,
    text = "Win",
}: {
    tag: string;
    text?: string;
}) {
    const theme = useTheme();

    const r = raceSeries[tag];

    if (!r) return null;

    return (
        <>
            {`${text} the ${r.name} (`}
            {r.races.map((race, index) => (
                <span
                    key={index}
                    style={{
                        color: theme.text.header,
                        fontWeight: theme.font.weight.highlight,
                    }}
                >
                    {`${getRaceName(race)}${index < r.races.length - 1 ? ", " : ""}`}
                </span>
            ))}
            {`)`}
        </>
    );
}

export function RaceRewards({
    placement = [1, 0],
    raceType = "",
}: {
    placement?: number[];
    raceType?: string;
}) {
    const context = useEventInteraction();

    const isOptional = raceType.startsWith("optional_");

    const selectedRaceType =
        isOptional && context?.interaction?.type === "raceType"
            ? String(context.value)
            : raceType;

    const hasPlacementSelection =
        placement.length > 1 && raceType !== "goal_non_race";

    const selectedPlacement =
        hasPlacementSelection && context?.interaction?.type === "placement"
            ? Number(context.value)
            : placement[0];

    const place =
        isOptional && context?.interaction?.type === "raceType"
            ? optionalRacePlacements[
                  raceType as keyof typeof optionalRacePlacements
              ]
            : selectedPlacement;

    const rewards = getRaceRewards(selectedRaceType, place);

    return (
        <EventRewardsComponent
            rewards={
                isOptional && context?.interaction?.type === "raceType"
                    ? rewards.filter((reward) => reward.tag !== "en")
                    : rewards
            }
        />
    );
}

// export function EventName({
//     eventName,
//     text = "",
// }: {
//     eventName: string;
//     text?: string;
// }) {
//     const [s1, s2] = text.split("<>");
//     return (
//         <>
//             {`${s1} `}
//             <TextHighlight>{eventName}</TextHighlight>
//             {s2 && ` ${s2}`}
//         </>
//     );
// }
