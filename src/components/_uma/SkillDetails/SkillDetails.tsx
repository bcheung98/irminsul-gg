import { useState } from "react";
import useSWR from "swr";
import parse from "html-react-parser";

// Component imports
import SkillScaling from "./SkillScaling";
import Text from "@/components/Text";
import FlexBox from "@/components/FlexBox";
import Switch from "@/components/Switch";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Popover from "@mui/material/Popover";

// Helper imports
import { urls } from "@/api";
import { skillEffects, skillTargets } from "@/data/uma/skills";

// Type imports
import { UmaCharacterProfile } from "@/types/uma/character";
import {
    UmaSkill,
    UmaSkillEffects,
    UmaSkillInherited,
} from "@/types/uma/skill";

export default function SkillDetails({
    skill,
}: {
    skill: UmaSkill | UmaSkillInherited;
}) {
    const profiles: UmaCharacterProfile[] = useSWR(
        urls["uma/character-profiles"],
        (url: string) => fetch(url).then((r) => r.json()),
    ).data;

    const theme = useTheme();

    const [showInherited, setShowInherited] = useState(false);
    const handleSwitchChange = () => {
        setShowInherited(!showInherited);
    };

    const currentSkill =
        "geneVersion" in skill && showInherited ? skill.geneVersion : skill;

    const [effectIndex, setEffectIndex] = useState<number | null>(null);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const handleClickOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setEffectIndex(Number(event.currentTarget.id));
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);

    function formatEffect(effect: UmaSkillEffects) {
        let type = skillEffects[effect.type];
        let value = `${effect.value}`;
        if (effect.type === "change_strategy") {
            value = "Runaway";
        }
        if (effect.type.includes("kakari_time")) {
            value += "s";
        }
        if (effect.type.includes("kakari_chance")) {
            value += "%";
        }
        let res = type;
        if (!effect.valueScaling) {
            res += ` (${value})`;
        }
        if (effect.target) {
            let target = "";
            if (effect.target.startsWith("char")) {
                target =
                    profiles.find(
                        (char) =>
                            char.id === Number(effect.target?.split("_")[1]),
                    )?.name || "Unknown";
            } else {
                target = skillTargets[effect.target];
            }
            res += ` of ${target}`;
        }
        return res;
    }

    function formatDuration(n: number) {
        if (n > 0) return `${n}s`;
        else if (n === 0) return "Instant effect";
        else return "Infinite";
    }

    function formatCondition(text: string) {
        return parse(
            text.replaceAll("&", "<br />&").replaceAll("@", "<br />@<br />"),
        );
    }

    return (
        <>
            <Card sx={{ backgroundColor: theme.background(0), p: 1 }}>
                <Stack spacing={2}>
                    {"geneVersion" in skill && (
                        <FlexBox spacing={2}>
                            <Switch
                                checked={showInherited}
                                onChange={handleSwitchChange}
                                size="small"
                            />
                            <Text variant="body2" weight="highlight">
                                Show Inherited Version
                            </Text>
                        </FlexBox>
                    )}
                    <Stack spacing={1} divider={<Divider />}>
                        <Stack spacing={1}>
                            <FlexBox spacing={0.5}>
                                <Text variant="body2" weight="highlight">
                                    Activation:
                                </Text>
                                <Text variant="body2">
                                    {currentSkill.activation
                                        ? "Wit check"
                                        : "Guaranteed"}
                                </Text>
                            </FlexBox>
                        </Stack>
                        {currentSkill.conditions.map((condition, index) => (
                            <Stack key={index} spacing={2}>
                                {condition.precondition && (
                                    <Stack>
                                        <Text
                                            variant="body2"
                                            weight="highlight"
                                        >
                                            Preconditions:
                                        </Text>
                                        <Text key={index} variant="body2">
                                            {formatCondition(
                                                condition.precondition,
                                            )}
                                        </Text>
                                    </Stack>
                                )}
                                <Stack>
                                    <Text variant="body2" weight="highlight">
                                        Conditions:
                                    </Text>
                                    <Text key={index} variant="body2">
                                        {formatCondition(condition.condition)}
                                    </Text>
                                </Stack>
                                <Stack>
                                    <Text variant="body2" weight="highlight">
                                        Effects:
                                    </Text>
                                    {condition.effects.map((effect, index) => (
                                        <FlexBox key={index} spacing={0.5}>
                                            <Text variant="body2">
                                                {formatEffect(effect)}
                                            </Text>
                                            {effect.valueScaling && (
                                                <Text variant="body2">
                                                    (
                                                    <span
                                                        id={`${index}`}
                                                        style={{
                                                            color: theme.text
                                                                .selected,
                                                            fontWeight:
                                                                theme.font
                                                                    .weight
                                                                    .highlight,
                                                            cursor: "pointer",
                                                        }}
                                                        onClick={
                                                            handleClickOpen
                                                        }
                                                    >
                                                        <u>Special scaling</u>
                                                    </span>
                                                    )
                                                </Text>
                                            )}
                                        </FlexBox>
                                    ))}
                                </Stack>
                                <FlexBox spacing={0.5}>
                                    <Text variant="body2" weight="highlight">
                                        Base Duration:
                                    </Text>
                                    <Text variant="body2">
                                        {formatDuration(condition.duration)}
                                    </Text>
                                </FlexBox>
                            </Stack>
                        ))}
                    </Stack>
                </Stack>
            </Card>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                disableScrollLock
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
            >
                <Box
                    sx={{
                        p: 1,
                        minWidth: "150px",
                        maxWidth: "400px",
                        backgroundColor: theme.background(1, "light"),
                    }}
                >
                    {effectIndex !== null &&
                        currentSkill.conditions.map((condition, c) => (
                            <SkillScaling
                                key={c}
                                effect={condition.effects[effectIndex]}
                            />
                        ))}
                </Box>
            </Popover>
        </>
    );
}
