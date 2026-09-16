// Component imports
import ContentBox from "@/components/ContentBox";
import StatsDisplay from "@/components/StatsDisplay";
import GearAttributes from "../GearAttributes";
import GearSet from "../GearSet";

// MUI imports
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

// Helper imports
import { gearSets } from "@/data/endfield/gearSets";

// Type imports
import { EndfieldGear } from "@/types/endfield";
import { EndfieldGearStats } from "@/types/endfield/gear";

export interface GearInfoProps {
    image: React.ReactNode;
    gear: EndfieldGear;
}

export default function GearInfo(props: GearInfoProps) {
    const matches = useMediaQuery((theme) => theme.breakpoints.up("md"));

    const gearSet = gearSets.find((set) => set.id === props.gear.set);
    const gearStats: EndfieldGearStats = Object.fromEntries(
        props.gear.stats.map((attr) => Object.values(attr)),
    );

    return (
        <ContentBox
            header={<GearAttributes {...props} />}
            headerProps={{ padding: matches ? "16px 24px" : "16px" }}
            contentProps={{ padding: "16px 24px" }}
        >
            <Stack spacing={2} divider={<Divider />}>
                <Box sx={{ width: { xs: "100%", md: "75%" } }}>
                    <StatsDisplay
                        stats={gearStats}
                        attributes={{ ...props.gear }}
                        title="Attributes"
                        initialValue={1}
                    />
                </Box>
                {gearSet && <GearSet gear={props.gear} />}
            </Stack>
        </ContentBox>
    );
}
