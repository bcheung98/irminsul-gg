// Component imports
import FlexBox from "@/components/FlexBox";
import Image from "@/components/Image";
import Text from "@/components/Text";
import Checkbox from "@/components/Checkbox";

// MUI imports
import { useTheme } from "@mui/material/styles";

// Helper imports
import { getMaterialResolvers } from "@/helpers/materials";
import { usePlannerStore } from "@/stores";
import { getCompletedMaterialKey } from "@/stores/usePlannerStore";

// Type imports
import type { MaterialCardProps } from "@/components/MaterialCard";

export default function MaterialLabel({
    game,
    materialKey,
    material,
    customMaterial,
    cost,
    interactive = false,
}: MaterialCardProps) {
    const theme = useTheme();

    const key = getCompletedMaterialKey(materialKey, `${material}`);

    const selected = usePlannerStore((state) =>
        state[`${game}/completed`].includes(key),
    );

    const toggleCompleted = usePlannerStore(
        (state) => state[`${game}/toggleCompleted`],
    );

    const handleClick = () => {
        toggleCompleted(key);
    };

    const { getMaterial } = getMaterialResolvers(game);
    const materialData = getMaterial(material);

    const { id, name, displayName, rarity = 3, imgURL } = materialData;

    const materialRarity = customMaterial?.rarity ?? rarity;

    const materialName = customMaterial?.name ?? displayName ?? name;

    const isSelected = interactive && selected;

    return (
        <FlexBox spacing={1.5}>
            {interactive && (
                <Checkbox checked={selected} onChange={handleClick} />
            )}
            <Image
                src={imgURL || `${game}/materials/${id}`}
                size={28}
                responsive
                responsiveSize={0.25}
                style={{
                    opacity: isSelected ? 0.35 : 1,
                    padding: ["hsr", "wuwa", "zzz"].includes(game) ? "4px" : 0,
                    border: `1px solid ${theme.border.color.primary}`,
                    borderRadius: "4px",
                    backgroundImage:
                        theme.materialCard.backgroundImage(materialRarity),
                    backgroundSize: "contain",
                }}
                format={
                    game === "zzz" && ["boss", "weekly"].includes(materialKey)
                        ? "gif"
                        : "png"
                }
                supressLoadImageWarning={Boolean(customMaterial)}
            />
            <Text
                variant="subtitle2"
                sx={{
                    textDecoration: isSelected ? "line-through" : "none",
                    textDecorationColor: "red",
                    textDecorationThickness: "2px",
                }}
            >
                {`${materialName} × ${cost.toLocaleString()}`}
            </Text>
        </FlexBox>
    );
}
