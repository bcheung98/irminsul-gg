// Component imports
import MaterialCard from "@/components/MaterialCard";

// MUI imports
import Grid, { GridProps } from "@mui/material/Grid";

// Helper imports
import { objectKeys } from "@/utils";
import { useGameTag } from "@/context";

// Type imports
import { CostValue } from "@/types/costs";

interface MaterialGridProps {
    costs: Record<string, CostValue>;
    size?: number;
    spacing?: GridProps["spacing"];
}

export default function MaterialGrid({
    costs,
    size = 56,
    spacing = 2,
}: MaterialGridProps) {
    const game = useGameTag();

    const materialArray: React.ReactNode[] = [];
    objectKeys(costs).forEach((key) =>
        Object.entries(costs[key]).forEach(
            ([material, cost]) =>
                cost &&
                materialArray.push(
                    <Grid key={Number(material)}>
                        <MaterialCard
                            game={game}
                            material={Number(material)}
                            cost={cost}
                            size={size}
                        />
                    </Grid>
                )
        )
    );

    return (
        <Grid container spacing={spacing}>
            {materialArray.map((card) => card)}
        </Grid>
    );
}
