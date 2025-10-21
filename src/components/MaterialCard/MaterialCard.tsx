// Component imports
import Image from "../Image";
import Text from "../Text";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";

// Helper imports
import { splitJoin } from "@/utils";
import { materialCardStyles } from "./MaterialCard.styles";
import { useMaterials } from "@/helpers/useMaterials";

export interface MaterialCardProps {
    id?: number;
    game: string;
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

    const materials = useMaterials()[game];

    const {
        name,
        tag,
        category,
        rarity: rarity = 3,
        source,
        imgURL,
    } = materials(material);

    const styles = materialCardStyles({ rarity, size });

    const costLength = cost.toLocaleString().length;
    const fontSize =
        costLength < 8 ? size / 4 - 4 : size / 4 - (costLength - 4);

    let tooltip = name;
    if (source) tooltip += ` (${source})`;

    return (
        <Card sx={styles.root()}>
            <Image
                src={
                    imgURL || `${game}/materials/${category}/${splitJoin(tag)}`
                }
                size={size}
                style={styles.image(theme)}
                tooltip={tooltip}
            />
            <Box sx={styles.label()}>
                <Text
                    variant="body2"
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
