// Component imports
import Image from "@/components/Image";
import Text from "@/components/Text";
import MaterialCardButton from "./MaterialCardButton";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";

// Helper imports
import { materialCardStyles } from "./MaterialCard.styles";
import { getMaterialResolvers } from "@/helpers/materials";

// Type imports
import type { GameNoUma } from "@/types";
import type { ResolvedCustomMaterial } from "@/types/materials";

export interface MaterialCardProps {
    id?: number;
    game: GameNoUma;
    materialKey: string;
    material: string | number;
    customMaterial?: ResolvedCustomMaterial;
    cost: number;
    size?: number;
    labelColor?: string;
    interactive?: boolean;
}

export default function MaterialCard({
    game,
    materialKey,
    material,
    customMaterial,
    cost,
    size = 56,
    interactive = false,
}: MaterialCardProps) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));

    let imgSize = size;
    const responsiveSize = 1 / 15;
    if (matches) {
        imgSize = imgSize - imgSize * responsiveSize;
    }

    const { getMaterial } = getMaterialResolvers(game);
    const materialData = getMaterial(material);

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

    const costLength = cost.toLocaleString().length;
    const fontSize =
        costLength < 8 ? imgSize / 4 - 4 : imgSize / 4 - (costLength - 4);

    let tooltip = customMaterial?.name ?? displayName ?? name;
    if (source && !customMaterial) tooltip += ` (${source})`;

    const styles = materialCardStyles(materialRarity, imgSize);

    const root = (
        <Card sx={styles.root}>
            <Box sx={styles.imageContainer}>
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
                    supressLoadImageWarning={Boolean(customMaterial)}
                />
            </Box>
            <Box sx={styles.label}>
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

    return interactive ? (
        <MaterialCardButton
            game={game}
            category={materialKey}
            materialID={customMaterial?.id || material}
        >
            {root}
        </MaterialCardButton>
    ) : (
        root
    );
}
