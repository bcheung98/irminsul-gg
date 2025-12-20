import { usePathname } from "next/navigation";

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

    const pathname = usePathname();

    const materialArray: React.ReactNode[] = [];
    sortItems(objectKeys(costs), pathname).forEach((key) =>
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
              "crown",
          ];
    sortOrder.forEach((item, index) => {
        sortIndex[item] = index;
    });
    return items.sort((a, b) => sortIndex[a] - sortIndex[b]);
}
