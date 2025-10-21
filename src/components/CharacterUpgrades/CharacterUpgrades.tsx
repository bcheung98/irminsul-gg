import { usePathname } from "next/navigation";

// Component imports
import ContentBox from "../ContentBox";
import SkillCard from "../SkillCard";
import SkillIcon from "../SkillIcon";
import SkillDescription from "../SkillDescription";
import TextLabel from "../TextLabel";
import Text from "../Text";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

// Helper imports
import { objectKeys, splitJoin } from "@/utils";

// Type imports
import type { CharacterUpgrades } from "@/types/character";
import { AttributeData } from "@/types";

interface CharacterUpgradesProps {
    title?: string;
    actions?: React.ReactNode;
    upgrades: CharacterUpgrades;
    attributes: AttributeData;
}

export default function CharacterUpgrades({
    title,
    actions,
    upgrades,
    attributes,
}: CharacterUpgradesProps) {
    const theme = useTheme();

    const game = usePathname().split("/")[1];

    const upgradeNames: { [key: string]: string } = {
        genshin: "constellations",
        hsr: "eidolons",
        wuwa: "resonanceChains",
        zzz: "mindscapes",
    };

    function getIconURL(key: string | number) {
        return `${game}/characters/${upgradeNames[game]}/${splitJoin(
            attributes.name
        ).toLocaleLowerCase()}_${key}`;
    }

    return (
        <ContentBox header={title} actions={actions}>
            <Grid container spacing={3}>
                {objectKeys(upgrades).map(
                    (key, index) =>
                        key !== "name" && (
                            <SkillCard key={index}>
                                <Stack spacing={1}>
                                    <TextLabel
                                        icon={
                                            <SkillIcon
                                                icon={getIconURL(key)}
                                                attributes={attributes}
                                            />
                                        }
                                        title={upgrades[key].name}
                                        titleProps={{ variant: "h6" }}
                                        subtitle={
                                            <i>
                                                {key
                                                    .toLocaleString()
                                                    .toLocaleUpperCase()}
                                            </i>
                                        }
                                        subtitleProps={{
                                            color: theme.text.primary,
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
                                            game="genshin"
                                            description={
                                                upgrades[key].description
                                            }
                                        />
                                    </Text>
                                </Stack>
                            </SkillCard>
                        )
                )}
            </Grid>
        </ContentBox>
    );
}
