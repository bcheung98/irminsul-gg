import { useState } from "react";

// Component imports
import SkillDescription from "@/components/SkillDescription";
import LevelUpCosts from "@/components/LevelUpCosts";
import InfoChip from "@/components/InfoChip";
import Text from "@/components/Text";
import ContentDialog from "@/components/ContentDialog";
import KeywordPopup from "@/components/KeywordPopup";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

// Helper imports
import { useSkillContext, useSkillVersionContext } from "@/context";
import { getKeywordPopupTitle, useSkillKeyword } from "@/helpers/skills";

// Type imports
import { AttributeData } from "@/types";
import {
    HSRCharacterTraceNodeData,
    HSRCharacterUnlockKeys,
} from "@/types/hsr/character";
import { Materials } from "@/types/materials";
import { CharacterSkillsList, SkillKeyword } from "@/types/skill";

export default function CharacterTraceInfo({
    trace,
    keywords,
    attributes,
    materials,
}: {
    trace: HSRCharacterTraceNodeData | null;
    keywords?: SkillKeyword[];
    attributes: AttributeData;
    materials: Materials;
}) {
    if (!trace) return <></>;

    const theme = useTheme();

    const buffs = useSkillVersionContext();
    const getSkillKeyword = useSkillKeyword().hsr;

    const skillsContext = useSkillContext();
    let skills: CharacterSkillsList | undefined;
    if (skillsContext) {
        skills = skillsContext;
    }

    const [currentKeyword, setCurrentKeyword] = useState<SkillKeyword | null>(
        null
    );
    const [dialogOpen, setDialogOpen] = useState(false);
    const handleDialogOpen = (event: React.BaseSyntheticEvent) => {
        const keyword = getSkillKeyword({
            tag: event.target.className.split("-")[1],
            skills: skills,
            skillVersion: buffs.value,
            keywords: keywords,
            attributes: attributes,
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

    const { title, description = "", unlock } = trace;

    return (
        <>
            <Card
                sx={{
                    p: 2,
                    borderRadius: theme.contentBox.border.radius,
                    backgroundColor: theme.background(0, "dark"),
                }}
            >
                <Stack spacing={2} divider={<Divider />}>
                    <Stack spacing={1}>
                        <Text variant="h6" weight="highlight">
                            {title}
                        </Text>
                        <Text
                            component="span"
                            variant="subtitle1"
                            sx={{ color: theme.text.description }}
                        >
                            <SkillDescription
                                game="hsr"
                                description={description}
                                onClick={handleDialogOpen}
                            />
                        </Text>
                    </Stack>
                    <Stack spacing={1}>
                        <Text weight="highlight">Unlock Cost</Text>
                        <Stack spacing={2}>
                            <LevelUpCosts
                                levelKey={trace.unlock}
                                costKey={
                                    trace.stat === undefined
                                        ? "characterTraceMain"
                                        : "characterTraceSmall"
                                }
                                materials={materials}
                                {...attributes}
                            />
                            <InfoChip
                                chipProps={{
                                    background: theme.palette.info.main,
                                    height: "24px",
                                }}
                                title={`Requires Character ${formatUnlock(
                                    unlock
                                )}`}
                            />
                        </Stack>
                    </Stack>
                </Stack>
            </Card>
            <ContentDialog
                open={dialogOpen}
                setOpen={setDialogOpen}
                onClose={handleDialogClose}
                header={getKeywordPopupTitle("hsr", currentKeyword)}
                maxWidth="md"
            >
                <KeywordPopup
                    keyword={currentKeyword}
                    attributes={attributes}
                />
            </ContentDialog>
        </>
    );
}

function formatUnlock(unlock: HSRCharacterUnlockKeys) {
    if (unlock.startsWith("A")) {
        return `Ascension ${unlock.slice(-1)}`;
    } else {
        return unlock;
    }
}
