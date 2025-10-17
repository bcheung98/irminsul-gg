import { BaseSyntheticEvent, useState } from "react";
import { usePathname } from "next/navigation";

// Component imports
import Text from "../Text";
import SkillIcon from "../SkillIcon";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

// Helper imports
import { skillKeys, skillIconURLs } from "@/data/skills";
import { useTextColor } from "@/helpers/useTextColor";
import { parseSkillDescription } from "@/helpers/parseSkillDescription";

// Type imports
import { CharacterSkillProps } from "./CharacterSkills.types";
import TextLabel from "../TextLabel";
import { AttributeData } from "@/types/_common";
import CharacterSkillScaling from "./CharacterSkillScaling";

export default function CharacterSkillTab({
    skill,
    skillKey,
    materials,
    attributes,
}: CharacterSkillProps) {
    const theme = useTheme();

    const game = usePathname().split("/")[1];

    const textColor = useTextColor(theme.text);

    if (skill && !Array.isArray(skill)) {
        skill = [skill];
    }

    const skillIconURL = formatSkillIconURL(
        skillIconURLs[game as keyof typeof skillIconURLs][skillKey],
        attributes
    );

    return (
        <>
            <Stack spacing={3}>
                <Box>
                    <Text sx={{ mb: "8px", fontStyle: "italic" }}>
                        {skillKeys[game as keyof typeof skillKeys][skillKey]}
                    </Text>
                    <Stack spacing={2}>
                        {skill?.map((skl, index) => (
                            <Stack key={`${skillKey}-${index}`} spacing={3}>
                                <Stack spacing={1}>
                                    <TextLabel
                                        icon={
                                            game === "hsr" && (
                                                <SkillIcon
                                                    icon={
                                                        skl.icon || skillIconURL
                                                    }
                                                    attributes={attributes}
                                                />
                                            )
                                        }
                                        title={skl.name}
                                        titleProps={{ variant: "h6" }}
                                        subtitle={skl.tag && `[${skl.tag}]`}
                                        subtitleProps={{
                                            color: textColor(game, "header"),
                                            variant: "body1",
                                        }}
                                        spacing={2}
                                    />
                                    <Text
                                        component="span"
                                        sx={{ color: theme.text.description }}
                                    >
                                        {parseSkillDescription({
                                            game: game,
                                            description: skl.description,
                                        })}
                                    </Text>
                                </Stack>
                                {skl.splash && (
                                    <Text
                                        variant="subtitle1"
                                        sx={{ fontStyle: "italic" }}
                                    >
                                        {parseSkillDescription({
                                            game: game,
                                            description: skl.splash,
                                        })}
                                    </Text>
                                )}
                            </Stack>
                        ))}
                    </Stack>
                </Box>
                <Stack>
                    <CharacterSkillScaling
                        skill={skill}
                        color={textColor(game, attributes?.element)}
                    />
                </Stack>
            </Stack>
        </>
    );
}

function formatSkillIconURL(url: string, attributes: AttributeData, index = 0) {
    if (attributes.name) {
        url = url.replace("{name}", attributes.name.toLocaleLowerCase());
    }
    if (attributes.weaponType) {
        url = url.replace("{weaponType}", attributes.weaponType);
    }
    if (index > 0) {
        url += `${index}`;
    }
    return url;
}
