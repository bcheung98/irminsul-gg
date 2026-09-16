import { useState } from "react";

// Component imports
import Text from "@/components/Text";
import ContentDialog from "@/components/ContentDialog";
import KeywordPopup from "@/components/KeywordPopup";
import SkillDescription from "@/components/SkillDescription";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";

// Helper imports
import { useGameTag } from "@/context";
import { countText } from "@/utils";
import { skillKeywords } from "@/data/endfield/skillKeywords";
import getSkillKeyword from "@/helpers/endfield/getSkillKeyword";

// Type imports
import { Equipment } from "@/types/equipment";
import { TypographyProps } from "@mui/material/Typography";
import { SkillKeyword } from "@/types/skill";

export default function EquipmentSetEffect({
    equipment,
    textVariant = "body2",
}: {
    equipment: Equipment;
    textVariant?: TypographyProps["variant"];
}) {
    const theme = useTheme();

    const game = useGameTag();

    const [currentKeyword, setCurrentKeyword] = useState<SkillKeyword | null>(
        null,
    );
    const [dialogOpen, setDialogOpen] = useState(false);
    const handleDialogOpen = (event: React.BaseSyntheticEvent) => {
        // Only Endfield has keywords in set effects
        const keyword = getSkillKeyword({
            tag: event.target.dataset.tag,
            keywords: skillKeywords,
            attributes: {},
        });
        if (keyword) {
            setCurrentKeyword(keyword);
            setDialogOpen(true);
        }
    };
    const handleDialogClose = () => {
        setDialogOpen(false);
        setCurrentKeyword(null);
    };

    return (
        <>
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
                        <SkillDescription
                            game={game}
                            description={effect}
                            onClick={handleDialogOpen}
                        />
                    </Text>
                ))}
            </Stack>
            <ContentDialog
                open={dialogOpen}
                setOpen={setDialogOpen}
                onClose={handleDialogClose}
                header="Glossary"
                maxWidth="md"
            >
                <KeywordPopup keyword={currentKeyword} attributes={{}} />
            </ContentDialog>
        </>
    );
}
