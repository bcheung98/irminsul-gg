import { usePathname } from "next/navigation";

// Component imports
import MaterialCard from "@/components/MaterialCard";
import Text from "@/components/Text";

// MUI imports
import Grid, { type GridProps } from "@mui/material/Grid";

// Helper imports
import { useGameTag } from "@/context";
import { getCustomMaterial } from "@/helpers/materials";

// Type imports
import type { CostValue } from "@/types/costs";
import type { CustomMaterials } from "@/types/materials";
import type { GameNoUma } from "@/types";

interface MaterialGridProps {
    costs: Record<string | number, CostValue>;
    customMaterials?: CustomMaterials;
    size?: number;
    spacing?: GridProps["spacing"];
    interactive?: boolean;
}

export default function MaterialGrid({
    costs,
    customMaterials,
    size = 56,
    spacing = 2,
    interactive = false,
}: MaterialGridProps) {
    const pathname = usePathname();

    const game = useGameTag() as GameNoUma;

    const sortedMaterials = sortMaterialByKey(Object.keys(costs), pathname);

    const materialArray: React.ReactNode[] = [];

    sortedMaterials.forEach((key) =>
        Object.entries(costs[key]).forEach(
            ([material, cost]: [string | number, number]) =>
                cost &&
                materialArray.push(
                    <Grid key={material}>
                        <MaterialCard
                            game={game}
                            materialKey={key}
                            material={material}
                            customMaterial={getCustomMaterial(
                                material,
                                customMaterials,
                            )}
                            cost={cost}
                            size={size}
                            interactive={interactive}
                        />
                    </Grid>,
                ),
        ),
    );

    return materialArray.length > 0 ? (
        <Grid container spacing={spacing}>
            {materialArray.map((card) => card)}
        </Grid>
    ) : (
        <Text variant="subtitle1" sx={{ fontStyle: "italic", px: 2 }}>
            No materials required for ascension
        </Text>
    );
}

function sortMaterialByKey(items: string[], pathname: string) {
    const sortIndex: Record<string, number> = {};
    const sortOrder = pathname.endsWith("planner")
        ? [
              "credits",
              "city",
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
              "disk",
              "fungi",
              "level",
              "prism",
              "dice",
              "plant",
              "skill",
              "mineral",
              "rare",
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
              "dice",
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
