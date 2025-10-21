import { BaseSyntheticEvent, useState } from "react";
import { usePathname } from "next/navigation";

// Component imports
import Text from "../Text";
import TextLabel from "../TextLabel";
import SkillIcon from "../SkillIcon";
import SkillDescription from "../SkillDescription";
import CharacterSkillScaling from "./CharacterSkillScaling";
import CharacterSkillLevelUp from "./CharacterSkillLevelUp";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

// Helper imports
import { splitJoin } from "@/utils";
import { skillKeys, skillIconURLs } from "@/data/skills";
import { useTextColor } from "@/helpers/useTextColor";

// Type imports
import { CharacterSkillProps } from "./CharacterSkills.types";
import { AttributeData } from "@/types";

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
                    <Text sx={{ mb: "8px", color: theme.text.header }}>
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
                                        variant="subtitle1"
                                        sx={{ color: theme.text.description }}
                                    >
                                        <SkillDescription
                                            game={game}
                                            description={skl.description}
                                        />
                                    </Text>
                                </Stack>
                                {skl.splash && (
                                    <Text
                                        variant="body2"
                                        sx={{ fontStyle: "italic" }}
                                    >
                                        <SkillDescription
                                            game={game}
                                            description={skl.splash}
                                        />
                                    </Text>
                                )}
                            </Stack>
                        ))}
                    </Stack>
                </Box>
                <Stack spacing={2}>
                    <CharacterSkillScaling
                        skill={skill}
                        color={textColor(game, attributes?.element)}
                    />
                    {!["altsprint"].includes(skillKey) && (
                        <CharacterSkillLevelUp
                            game={game}
                            materials={materials}
                            color={textColor(game, attributes.element)}
                        />
                    )}
                </Stack>
            </Stack>
        </>
    );
}

function formatSkillIconURL(url: string, attributes: AttributeData, index = 0) {
    if (attributes.name) {
        url = url.replace(
            "{name}",
            splitJoin(attributes.name, "-", "_").toLocaleLowerCase()
        );
    }
    if (attributes.weaponType) {
        url = url.replace("{weaponType}", attributes.weaponType);
    }
    if (index > 0) {
        url += `${index}`;
    }
    return url;
}
