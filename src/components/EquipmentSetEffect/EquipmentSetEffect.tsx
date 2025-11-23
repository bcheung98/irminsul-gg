// Component imports
import Text from "@/components/Text";
import SkillDescription from "@/components/SkillDescription";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";

// Helper imports
import { useGameTag } from "@/context";
import { countText } from "@/utils";

// Type imports
import { Equipment } from "@/types/equipment";
import { TypographyProps } from "@mui/material/Typography";

export default function EquipmentSetEffect({
    equipment,
    textVariant = "body2",
}: {
    equipment: Equipment;
    textVariant?: TypographyProps["variant"];
}) {
    const theme = useTheme();

    const game = useGameTag();

    return (
        <Stack spacing={0.5}>
            {Object.entries(equipment.setEffect).map(([key, effect]) => (
                <Text
                    key={key}
                    variant={textVariant}
                    sx={{
                        color: theme.text.description,
                    }}
                >
                    <span
                        style={{
                            color: theme.text.primary,
                            fontWeight: theme.font.weight.highlight,
                        }}
                    >
                        {`${key}-${countText({
                            count: Number(key),
                            single: "Piece",
                        })}: `}
                    </span>
                    <SkillDescription game={game} description={effect} />
                </Text>
            ))}
        </Stack>
    );
}
