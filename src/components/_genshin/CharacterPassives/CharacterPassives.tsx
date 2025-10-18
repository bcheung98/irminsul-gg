// Component imports
import ContentBox from "../../ContentBox";
import SkillCard from "@/components/SkillCard";
import SkillIcon from "@/components/SkillIcon";
import TextLabel from "../../TextLabel";
import Text from "@/components/Text";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

// Helper imports
import { parseSkillDescription } from "@/helpers/parseSkillDescription";
import { skillKeys } from "@/data/skills";

// Type imports
import { GenshinCharacterPassive } from "@/types/genshin/character";
import { AttributeData } from "@/types/_common";

interface CharacterPassivesProps {
    passives: GenshinCharacterPassive[];
    attributes: AttributeData;
}

export default function CharacterPassives({
    passives,
    attributes,
}: CharacterPassivesProps) {
    const theme = useTheme();

    function getIconURL(key: string) {
        return `genshin/characters/talents/${attributes.name?.toLocaleLowerCase()}_${key}passive`;
    }

    return (
        <>
            <ContentBox header="Passive Talents">
                <Grid container spacing={3}>
                    {passives.map((passive, index) => (
                        <SkillCard key={index}>
                            <Stack spacing={1}>
                                <TextLabel
                                    icon={
                                        <SkillIcon
                                            icon={getIconURL(passive.type)}
                                            attributes={attributes}
                                        />
                                    }
                                    title={passive.name}
                                    titleProps={{ variant: "h6" }}
                                    subtitle={
                                        <i>{skillKeys.genshin[passive.type]}</i>
                                    }
                                    subtitleProps={{
                                        color: theme.text.primary,
                                        variant: "body1",
                                    }}
                                    spacing={2}
                                />
                                <Text
                                    component="span"
                                    sx={{ color: theme.text.description }}
                                >
                                    {parseSkillDescription({
                                        game: "genshin",
                                        description: passive.description,
                                    })}
                                </Text>
                            </Stack>
                        </SkillCard>
                    ))}
                </Grid>
            </ContentBox>
        </>
    );
}
