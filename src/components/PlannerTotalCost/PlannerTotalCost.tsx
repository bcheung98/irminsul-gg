// Component imports
import MaterialGrid from "@/components/MaterialGrid";
import Text from "@/components/Text";
import TextLabel from "@/components/TextLabel";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import InfoIcon from "@mui/icons-material/Info";

// Helper imports
import { useGameTag } from "@/context";
import { useTotalCosts } from "./PlannerTotalCost.hooks";

// Type imports
import type { GameNoUma } from "@/types";

export default function PlannerTotalCost() {
    const theme = useTheme();

    const game = useGameTag() as GameNoUma;

    const { materialCosts, customMaterials, count } = useTotalCosts(game);

    return count > 0 ? (
        <Stack spacing={2}>
            <MaterialGrid
                costs={materialCosts}
                customMaterials={customMaterials}
                interactive
            />
            <TextLabel
                icon={
                    <InfoIcon
                        fontSize="small"
                        sx={{ color: theme.text.primary }}
                    />
                }
                title="Click on a material to mark it as completed"
                titleProps={{ variant: "subtitle1" }}
            />
        </Stack>
    ) : (
        <Text weight="highlight" sx={{ px: 4 }}>
            Its empty here...
        </Text>
    );
}
