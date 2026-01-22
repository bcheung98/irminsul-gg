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
import { useMaterials } from "@/helpers/materials";

// Type imports
import { Game } from "@/types";

export interface MaterialCardProps {
    id?: number;
    game: Game;
    material: string | number;
    cost: number;
    size?: number;
    labelColor?: string;
}

export default function MaterialCard({
    game,
    material,
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

    const materials = useMaterials()[game];

    const {
        id,
        name,
        displayName,
        category,
        rarity: rarity = 3,
        source,
        imgURL,
    } = materials(Boolean(Number(material)) ? Number(material) : material);

    const styles = materialCardStyles({ rarity, size: imgSize });

    const costLength = cost.toLocaleString().length;
    const fontSize =
        costLength < 8 ? imgSize / 4 - 4 : imgSize / 4 - (costLength - 4);

    let tooltip = displayName || name;
    if (source) tooltip += ` (${source})`;

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
