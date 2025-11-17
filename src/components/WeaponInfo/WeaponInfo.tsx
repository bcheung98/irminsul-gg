// Component imports
import ContentBox from "@/components/ContentBox";
import StatsDisplay from "@/components/StatsDisplay";
import LevelUpCosts from "@/components/LevelUpCosts";
import WeaponAttributes from "@/components/WeaponAttributes";
import WeaponPassive from "@/components/WeaponPassive";

// MUI imports
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

// Helper imports
import { useGameTag } from "@/context";

// Type imports
import { AttributeData } from "@/types";
import { Materials } from "@/types/materials";
import { TWeaponStats } from "@/components/StatsDisplay/StatsDisplay.types";

interface WeaponInfoProps {
    stats: TWeaponStats;
    materials: Materials;
    attributes: AttributeData;
    image: React.ReactNode;
}

export default function WeaponInfo(props: WeaponInfoProps) {
    const matches = useMediaQuery((theme) => theme.breakpoints.up("md"));

    const game = useGameTag();
    return (
        <ContentBox
            header={
                <WeaponAttributes
                    attributes={props.attributes}
                    image={props.image}
                />
            }
            headerProps={{ padding: matches ? "16px 24px" : "16px" }}
            contentProps={{ padding: "16px 24px" }}
        >
            <Stack spacing={2} divider={<Divider />}>
                <Stack spacing={2}>
                    <Box sx={{ width: { xs: "100%", md: "75%" } }}>
                        <StatsDisplay
                            game={game}
                            stats={props.stats}
                            attributes={props.attributes}
                            title=""
                        />
                    </Box>
                    {props.stats.passive && (
                        <WeaponPassive stats={props.stats} />
                    )}
                </Stack>
                <LevelUpCosts
                    title="Ascension"
                    levelKey="level"
                    costKey="weaponLevel"
                    materials={props.materials}
                    rarity={props.attributes.rarity}
                />
            </Stack>
        </ContentBox>
    );
}
