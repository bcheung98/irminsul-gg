// Component imports
import ContentBox from "@/components/ContentBox";
import StatsDisplay from "@/components/StatsDisplay";
import LevelUpCosts from "@/components/LevelUpCosts";
import CharacterAttributes from "@/components/CharacterAttributes";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

// Helper imports
import { useTextColor } from "@/helpers/styles";
import { useGameTag } from "@/context";

// Type imports
import { AttributeData } from "@/types";
import { Materials } from "@/types/materials";
import { TCharacterStats } from "@/components/StatsDisplay/StatsDisplay.types";

interface CharacterInfoProps {
    stats: TCharacterStats;
    materials: Materials;
    attributes: AttributeData;
}

export default function CharacterInfo(props: CharacterInfoProps) {
    const theme = useTheme();

    const textColor = useTextColor(theme.text);

    const game = useGameTag();

    return (
        <ContentBox
            header={<CharacterAttributes {...props.attributes} />}
            headerProps={{ padding: "16px 24px" }}
            contentProps={{ padding: "16px 24px" }}
        >
            <Stack spacing={2} divider={<Divider />}>
                <StatsDisplay
                    game={game}
                    stats={props.stats}
                    attributes={props.attributes}
                />
                <LevelUpCosts
                    title="Ascension"
                    levelKey="level"
                    costKey="characterLevel"
                    materials={props.materials}
                    color={textColor(game, props.attributes.element)}
                    element={props.attributes.element}
                />
            </Stack>
        </ContentBox>
    );
}
