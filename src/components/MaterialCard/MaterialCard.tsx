// Component imports
import Image from "@/components/Image";
import Text from "@/components/Text";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";

// Helper imports
import { materialCardStyles } from "./MaterialCard.styles";
import { getMaterialResolver } from "@/helpers/materials";

// Type imports
import type { Game } from "@/types";
import type { ResolvedCustomMaterial } from "@/components/PlannerMaterials/PlannerMaterials.utils";

export interface MaterialCardProps {
    id?: number;
    game: Game;
    material: string | number;
    customMaterial?: ResolvedCustomMaterial;
    cost: number;
    size?: number;
    labelColor?: string;
}

export default function MaterialCard({
    game,
    material,
    customMaterial,
    cost,
    size = 56,
}: MaterialCardProps) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));

    let imgSize = size;
    const responsiveSize = 1 / 15;
    if (matches) {
        imgSize = imgSize - imgSize * responsiveSize;
    }

    const materials = getMaterialResolver(game);

    const materialData = materials(
        Boolean(Number(material)) ? Number(material) : material,
    );

    const {
        id,
        name,
        displayName,
        category,
        rarity = 3,
        source,
        imgURL,
    } = materialData;

    const materialRarity = customMaterial?.rarity ?? rarity;

    const styles = materialCardStyles({
        rarity: materialRarity,
        size: imgSize,
    });

    const costLength = cost.toLocaleString().length;
    const fontSize =
        costLength < 8 ? imgSize / 4 - 4 : imgSize / 4 - (costLength - 4);

    let tooltip = customMaterial?.name ?? displayName ?? name;
    if (source && !customMaterial) tooltip += ` (${source})`;

    return (
        <Card sx={styles.root()}>
            <Box sx={styles.imageContainer(theme)}>
                <Image
                    src={imgURL || `${game}/materials/${id}`}
                    size={size}
                    tooltip={tooltip}
                    responsive
                    responsiveSize={responsiveSize}
                    style={{
                        padding: ["hsr", "wuwa", "zzz"].includes(game)
                            ? "4px"
                            : 0,
                    }}
                    format={
                        game === "zzz" && ["boss", "weekly"].includes(category)
                            ? "gif"
                            : "png"
                    }
                />
            </Box>
            <Box sx={styles.label()}>
                <Text
                    variant="body2"
                    weight="highlight"
                    sx={{
                        fontSize: `${fontSize}px !important`,
                        color: theme.materialCard.color.primary,
                    }}
                >
                    {cost.toLocaleString()}
                </Text>
            </Box>
        </Card>
    );
}
