import { useState } from "react";

// Component imports
import ContentDialog from "@/components/ContentDialog";
import Tooltip from "@/components/Tooltip";
import SkillPopup from "../SkillPopup";

// MUI imports
import { useTheme } from "@mui/material/styles";

// Helper imports
import { useUmaContext } from "@/context";
import { countText } from "@/utils";
import { statusEffects } from "@/data/uma/statusEffects";
import { getRaceName } from "@/helpers/uma/races";
import { raceSeries } from "@/data/uma/races";

// Type imports
import { EventRewards } from "@/types/uma/event";

const dialogStyle = {
    ".MuiDialog-paper": {
        maxWidth: "600px",
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
                color: color || theme.text.header,
                fontWeight: theme.font.weight.highlight,
            }}
        >
            {children}
        </span>
    );
}

export function SkillHint({
    event,
    isHint,
}: {
    event: EventRewards;
    isHint: boolean;
}) {
    const theme = useTheme();

    const { skills } = useUmaContext();

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const { value, data } = event;
    const skill = skills.find((skill) => skill.id === data);
    let hint = <></>;
    if (skill) {
        hint = (
            <>
                {!isHint && `Obtain `}
                <span
                    onClick={handleClickOpen}
                    style={{
                        color: theme.text.uma.value,
                        fontWeight: theme.font.weight.highlight,
                        textDecoration: "underline",
                        cursor: "pointer",
                    }}
                >
                    {skill.name.global || skill.name.jp}
                </span>
                {isHint && ` hint ${value}`}
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
    return hint;
}

export function SkillText({ event }: { event: EventRewards }) {
    const theme = useTheme();

    const { skills } = useUmaContext();

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const { value } = event;
    const skill = skills.find((skill) => skill.id === value);
    let res = <></>;
    if (skill) {
        res = (
            <>
                {`Obtain `}
                <span
                    onClick={handleClickOpen}
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
    return res;
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
        (effect) => effect.id === Number(effectID)
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
            <Tooltip title={description} placement="top">
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
    count = 1,
}: {
    races?: (string | number)[];
    text?: string;
    divider?: string;
    count?: number;
}) {
    const [s1, s2, s3] = text.split("<>");
    return (
        <>
            {s1 && `${s1} `}
            {races.map((race, index) => (
                <span key={index}>
                    <TextHighlight>
                        {getRaceName(race.toString())}
                    </TextHighlight>
                    {index < races.length - 1 && `${divider}`}
                    {s2 && ` ${s2}`}
                    {s3 && count > 1 && ` ${s3}`}
                </span>
            ))}
        </>
    );
}

export function RaceSeries({ tag }: { tag: string }) {
    const theme = useTheme();

    const r = raceSeries[tag];
    return (
        <>
            {`Win the ${r.name}`}
            <br />
            {r.races.map((race, index) => (
                <span
                    key={index}
                    style={{
                        color: theme.text.header,
                        fontWeight: theme.font.weight.highlight,
                    }}
                >
                    {`- ${getRaceName(race)}`}
                    <br />
                </span>
            ))}
        </>
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
