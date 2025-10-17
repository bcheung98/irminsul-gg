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
import { useMaterials } from "@/utils/useMaterials";

export interface MaterialCardProps {
    id?: number;
    game: string;
    name: string;
    cost: number;
    size?: number;
    labelColor?: string;
}

export default function MaterialCard({
    game,
    name,
    cost,
    size = 64,
}: MaterialCardProps) {
    const theme = useTheme();

    const materials = useMaterials()[game];
    const material = materials({ string: name })[0];

    const rarity = material?.rarity || 1;
    const category = material?.category;

    const styles = materialCardStyles({ rarity, size });

    const costLength = cost.toLocaleString().length;
    const fontSize = costLength < 8 ? size / 4 - 4 : size / 4 - costLength - 4;

    return (
        <Card sx={styles.root()}>
            <Image
                src={`${game}/materials/${category}/${splitJoin(name)}`}
                size={size}
                style={styles.image(theme)}
                tooltip={name}
            />
            <Box sx={styles.label()}>
                <Text
                    variant="body3"
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
