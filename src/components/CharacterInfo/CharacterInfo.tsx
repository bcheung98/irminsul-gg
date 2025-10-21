import { usePathname } from "next/navigation";

// Component imports
import ContentBox from "../ContentBox";
import StatsDisplay from "../StatsDisplay";
import LevelUpCosts from "../LevelUpCosts";
import CharacterAttributes from "../CharacterAttributes";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";

// Helper imports
import { useTextColor } from "@/helpers/useTextColor";

// Type imports
import { AttributeData } from "@/types";
import { Materials } from "@/types/materials";
import { TCharacterStats } from "../StatsDisplay/StatsDisplay.types";

interface CharacterInfoProps {
    stats: TCharacterStats;
    materials: Materials;
    attributes: AttributeData;
}

export default function CharacterInfo(props: CharacterInfoProps) {
    const theme = useTheme();

    const textColor = useTextColor(theme.text);

    const game = usePathname().split("/")[1];

    return (
        <ContentBox
            header={<CharacterAttributes {...props.attributes} />}
            headerProps={{ padding: "16px 24px" }}
            contentProps={{ padding: "16px 24px" }}
        >
            <Stack spacing={2}>
                <StatsDisplay
                    game={game}
                    stats={props.stats}
                    attributes={props.attributes}
                />
                <LevelUpCosts
                    text="Ascension"
                    tag={`${game}/level`}
                    type="characterLevel"
                    materials={props.materials}
                    color={textColor(game, props.attributes.element)}
                    element={props.attributes.element}
                />
            </Stack>
        </ContentBox>
    );
}
