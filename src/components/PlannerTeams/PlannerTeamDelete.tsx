import { useState } from "react";

// Component imports
import ContentDialog from "@/components/ContentDialog";
import FlexBox from "@/components/FlexBox";
import Tooltip from "@/components/Tooltip";
import Text from "@/components/Text";
import InfoButton from "@/components/InfoButton";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

// Helper imports
import { useGameTag } from "@/context";
import { usePlannerStore } from "@/stores";
import { buttonStyles } from "@/components/PlannerCardRoot/PlannerCardRoot.styles";

// Type imports
import type { GameNoUma } from "@/types";
import type { PlannerTeam } from "@/types/planner";

export default function PlannerTeamDelete({ team }: { team: PlannerTeam }) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("sm"));

    const game = useGameTag() as GameNoUma;

    const deleteTeam = usePlannerStore((state) => state[`${game}/deleteTeam`]);

    const handleDelete = () => {
        setAlertOpen(false);
        deleteTeam(team.id);
    };

    const [alertOpen, setAlertOpen] = useState(false);
    const handleAlertOpen = () => {
        setAlertOpen(true);
    };
    const handleAlertClose = () => {
        setAlertOpen(false);
    };

    return (
        <>
            <Tooltip title="Delete Team" placement="top">
                <IconButton onClick={handleAlertOpen} sx={buttonStyles.root}>
                    <DeleteIcon sx={buttonStyles.icon} />
                </IconButton>
            </Tooltip>
            <ContentDialog
                open={alertOpen}
                setOpen={setAlertOpen}
                onClose={undefined}
                header="Confirm Delete"
                actions={<></>}
                maxWidth={false}
                fullWidth={!matches}
                sx={{
                    ".MuiDialog-paper": {
                        minWidth: { sm: theme.breakpoints.values.sm },
                    },
                }}
            >
                <Stack spacing={2}>
                    <Stack spacing={0.5}>
                        <Text>
                            {`Are you sure you want to delete `}
                            <span
                                style={{
                                    color: theme.text.selected,
                                    fontWeight: theme.font.weight.highlight,
                                }}
                            >
                                {team.name}
                            </span>
                            {"?"}
                        </Text>
                        <Text variant="subtitle1">
                            Deleting this team will not delete its items. They
                            will remain in All Items and any other teams they
                            belong to.
                        </Text>
                    </Stack>
                    <FlexBox spacing={2} sx={{ justifyContent: "right" }}>
                        <InfoButton
                            title="Cancel"
                            color={theme.background(0, "light")}
                            icons={false}
                            onClick={handleAlertClose}
                        />
                        <InfoButton
                            title="Delete"
                            color={theme.palette.error.main}
                            icons={false}
                            onClick={handleDelete}
                        />
                    </FlexBox>
                </Stack>
            </ContentDialog>
        </>
    );
}
