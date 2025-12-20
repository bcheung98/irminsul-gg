import { useState } from "react";

// Component imports
import TextLabel from "@/components/TextLabel";
import Text from "@/components/Text";
import ContentDialog from "@/components/ContentDialog";
import SkillPopup from "../SkillPopup";

// MUI imports
import Grid from "@mui/material/Grid";

// Type imports
import { UmaSkill } from "@/types/uma/skill";

export default function SkillListRow({
    skill,
    index,
}: {
    skill: UmaSkill;
    index: number;
}) {
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    return (
        <>
            <Grid
                container
                spacing={{ xs: 1, md: 2 }}
                sx={(theme) => ({
                    p: "8px 16px",
                    flexWrap: "wrap",
                    alignItems: "center",
                    backgroundColor:
                        index % 2 === 0
                            ? theme.background(1)
                            : theme.background(0, "dark"),
                    cursor: "pointer",
                    "&:hover": {
                        outline: `2px solid ${theme.text.primary}`,
                        outlineOffset: "-2px",
                    },
                })}
                onClick={handleClickOpen}
            >
                <Grid size={{ xs: 12, md: 4 }}>
                    <TextLabel
                        icon={`uma/skills/${skill.icon}`}
                        iconProps={{ size: 32 }}
                        title={skill.name.global || skill.name.jp}
                        titleProps={{ variant: "body2" }}
                        spacing={{ xs: 1, md: 2 }}
                    />
                </Grid>
                <Grid size="grow">
                    <Text variant="body2">
                        {skill.description.global || skill.description.jp}
                    </Text>
                </Grid>
            </Grid>
            <ContentDialog
                open={open}
                setOpen={setOpen}
                header="Skill Details"
                sx={{
                    ".MuiDialog-paper": {
                        maxWidth: "600px",
                    },
                }}
            >
                <SkillPopup skill={skill} showSources />
            </ContentDialog>
        </>
    );
}
