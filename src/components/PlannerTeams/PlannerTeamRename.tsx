import { useState } from "react";

// Component imports
import ContentDialog from "@/components/ContentDialog";
import SearchBar from "@/components/SearchBar";
import FlexBox from "@/components/FlexBox";
import InfoButton from "@/components/InfoButton";
import Tooltip from "@/components/Tooltip";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

// Helper imports
import { useGameTag } from "@/context";
import { usePlannerStore } from "@/stores";
import { buttonStyles } from "@/components/PlannerCardRoot/PlannerCardRoot.styles";

// Type imports
import type { GameNoUma } from "@/types";
import type { PlannerTeam } from "@/types/planner";

export default function PlannerTeamRename({ team }: { team: PlannerTeam }) {
    const theme = useTheme();

    const game = useGameTag() as GameNoUma;

    const renameTeam = usePlannerStore((state) => state[`${game}/renameTeam`]);

    const [open, setOpen] = useState(false);
    const [teamName, setTeamName] = useState(team.name);

    const handleOpen = () => {
        setTeamName(team.name);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleRename = () => {
        const name = teamName.trim();

        if (!name || name === team.name) return;

        renameTeam(team.id, name);
        handleClose();
    };

    return (
        <>
            <Tooltip title="Rename Team" placement="top">
                <IconButton onClick={handleOpen} sx={buttonStyles.root}>
                    <EditIcon sx={buttonStyles.icon} />
                </IconButton>
            </Tooltip>
            <ContentDialog
                open={open}
                setOpen={setOpen}
                maxWidth="sm"
                header="Rename Team"
            >
                <Stack spacing={2}>
                    <SearchBar
                        autoFocus
                        placeholder="Team Name"
                        value={teamName}
                        onChange={(event) => setTeamName(event.target.value)}
                        inputIcon={<></>}
                        height="32px"
                    />
                    <FlexBox
                        spacing={[1, 2]}
                        wrap
                        sx={{ justifyContent: "right" }}
                    >
                        <InfoButton
                            title="Cancel"
                            onClick={handleClose}
                            color={theme.background(0, "light")}
                            icons={false}
                        />
                        <InfoButton
                            title="Rename"
                            onClick={handleRename}
                            disabled={
                                !teamName.trim() ||
                                teamName.trim() === team.name
                            }
                            icons={false}
                        />
                    </FlexBox>
                </Stack>
            </ContentDialog>
        </>
    );
}
