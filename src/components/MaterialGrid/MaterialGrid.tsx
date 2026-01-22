import { usePathname } from "next/navigation";

// Component imports
import MaterialCard from "@/components/MaterialCard";

// MUI imports
import Grid, { GridProps } from "@mui/material/Grid";

// Helper imports
import { useGameTag } from "@/context";

// Type imports
import { CostValue } from "@/types/costs";

interface MaterialGridProps {
    costs: Record<string | number, CostValue>;
    size?: number;
    spacing?: GridProps["spacing"];
}

export default function MaterialGrid({
    costs,
    size = 56,
    spacing = 2,
}: MaterialGridProps) {
    const game = useGameTag();

    const pathname = usePathname();

    const materialArray: React.ReactNode[] = [];
    sortItems(Object.keys(costs), pathname).forEach((key) =>
        Object.entries(costs[key]).forEach(
            ([material, cost]: [string | number, number]) =>
                cost &&
                materialArray.push(
                    <Grid key={material}>
                        <MaterialCard
                            game={game}
                            material={material}
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

function sortItems(items: string[], pathname: string) {
    const sortIndex: Record<string, number> = {};
    const sortOrder = pathname.endsWith("planner")
        ? [
              "credits",
              "characterXP",
              "weaponXP",
              "boss",
              "weekly",
              "crown",
              "gemstone",
              "local",
              "talent",
              "calyx",
              "forgery",
              "weapon",
              "elite",
              "common",
              "characterLevel",
              "characterSkill",
              "weaponLevel",
          ]
        : [
              "credits",
              "characterXP",
              "weaponXP",
              "boss",
              "local",
              "gemstone",
              "talent",
              "calyx",
              "forgery",
              "weapon",
              "elite",
              "common",
              "characterLevel",
              "characterSkill",
              "weaponLevel",
              "weekly",
              "disk",
              "fungi",
              "level",
              "prism",
              "plant",
              "mineral",
              "rare",
              "skill",
              "crown",
          ];
    sortOrder.forEach((item, index) => {
        sortIndex[item] = index;
    });
    return items.sort((a, b) => sortIndex[a] - sortIndex[b]);
}
