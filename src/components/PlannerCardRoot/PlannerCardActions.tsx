import { useState } from "react";

// Component imports
import ContentDialog from "@/components/ContentDialog";
import FlexBox from "@/components/FlexBox";
import Tooltip from "@/components/Tooltip";
import Text from "@/components/Text";
import InfoButton from "@/components/InfoButton";
import PlannerCardTeamMenu from "./PlannerCardTeamMenu";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import DeleteIcon from "@mui/icons-material/Delete";

// Helper imports
import { usePlannerStore } from "@/stores";
import { useGameTag } from "@/context";
import { buttonStyles } from "./PlannerCardRoot.styles";

// Type imports
import type { GameNoUma } from "@/types";
import type { PlannerCardActionProps } from "./PlannerCardRoot.types";

export default function PlannerCardActions({
    item,
    mode,
    handleModeChange,
}: PlannerCardActionProps) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("sm"));

    const game = useGameTag() as GameNoUma;

    const hidden = usePlannerStore((state) =>
        state[`${game}/hidden`].includes(item.id),
    );
    const setHiddenItems = usePlannerStore(
        (state) => state[`${game}/setHiddenItems`],
    );
    const handleHiddenChange = () => {
        setHiddenItems(item.id);
    };

    const deleteItem = usePlannerStore((state) => state[`${game}/deleteItem`]);

    const teams = usePlannerStore((state) => state[`${game}/teams`]);

    const activeTeamId = usePlannerStore(
        (state) => state[`${game}/activeTeamId`],
    );
    const activeTeam = teams.find((team) => team.id === activeTeamId);
    const isTeamView = activeTeamId !== null;

    const setTeamItem = usePlannerStore(
        (state) => state[`${game}/setTeamItem`],
    );

    const handleRemove = () => {
        setAlertOpen(false);

        if (activeTeamId !== null) {
            setTeamItem(item.id, activeTeamId, false);
        } else {
            deleteItem(item.id);
        }
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
            <FlexBox spacing={1}>
                <Tooltip
                    title={mode !== "edit" ? "Edit" : "Done"}
                    placement="top"
                >
                    <IconButton
                        onClick={handleModeChange}
                        sx={buttonStyles.root}
                    >
                        {mode !== "edit" ? (
                            <EditIcon sx={buttonStyles.icon} />
                        ) : (
                            <DoneIcon sx={buttonStyles.icon} />
                        )}
                    </IconButton>
                </Tooltip>
                <PlannerCardTeamMenu itemID={item.id} />
                {!isTeamView && (
                    <Tooltip
                        title={
                            hidden
                                ? "Show in Total Cost"
                                : "Hide from Total Cost"
                        }
                        placement="top"
                    >
                        <IconButton
                            onClick={handleHiddenChange}
                            sx={buttonStyles.root}
                        >
                            {hidden ? (
                                <VisibilityIcon sx={buttonStyles.icon} />
                            ) : (
                                <VisibilityOffIcon sx={buttonStyles.icon} />
                            )}
                        </IconButton>
                    </Tooltip>
                )}
                <Tooltip
                    title={isTeamView ? "Remove from Group" : "Delete"}
                    placement="top"
                >
                    <IconButton
                        onClick={handleAlertOpen}
                        sx={buttonStyles.root}
                    >
                        <DeleteIcon sx={buttonStyles.icon} />
                    </IconButton>
                </Tooltip>
            </FlexBox>
            <ContentDialog
                open={alertOpen}
                setOpen={setAlertOpen}
                onClose={undefined}
                header={isTeamView ? "Confirm Removal" : "Confirm Delete"}
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
                            {`Are you sure you want to ${
                                isTeamView ? "remove" : "delete"
                            } `}
                            <span
                                style={{
                                    color: theme.text.selected,
                                    fontWeight: theme.font.weight.highlight,
                                }}
                            >
                                {item.displayName}
                            </span>
                            {isTeamView ? ` from ${activeTeam?.name}?` : "?"}
                        </Text>
                        <Text variant="subtitle1">
                            {isTeamView
                                ? "This item will remain in All Items and any other groups."
                                : "This item will also be deleted from any other groups it is currently in."}
                        </Text>
                        <Text
                            variant="subtitle1"
                            weight="highlight"
                            sx={{
                                color: theme.text.header,
                            }}
                        >
                            This action cannot be undone.
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
                            title={isTeamView ? "Remove" : "Delete"}
                            color={theme.palette.error.main}
                            icons={false}
                            onClick={handleRemove}
                        />
                    </FlexBox>
                </Stack>
            </ContentDialog>
        </>
    );
}
