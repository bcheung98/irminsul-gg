import { useState } from "react";

// Component imports
import ContentDialog from "@/components/ContentDialog";
import FlexBox from "@/components/FlexBox";
import Tooltip from "@/components/Tooltip";
import Text from "@/components/Text";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Stack from "@mui/material/Stack";
import Button, { ButtonProps } from "@mui/material/Button";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import DeleteIcon from "@mui/icons-material/Delete";
import { SvgIconProps } from "@mui/material/SvgIcon";

// Helper imports
import { usePlannerStore } from "@/stores";
import { useGameTag } from "@/context";

// Type imports
import { GameNoUma } from "@/types";
import { PlannerCardActionProps } from "./PlannerCardRoot.types";

export default function PlannerCardActions({
    item,
    mode,
    handleModeChange,
}: PlannerCardActionProps) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("sm"));

    const game = useGameTag() as GameNoUma;

    const store = usePlannerStore();
    const hiddenItems = store[`${game}/hidden`];

    const toggleHidden = store[`${game}/toggleHidden`];

    const [hidden, setHidden] = useState(hiddenItems.includes(item.id));
    const handleHiddenChange = () => {
        setHidden(!hidden);
        toggleHidden(item.id);
    };

    const handleDelete = () => {
        if (hidden) toggleHidden(item.id);
        const newValues = store[`${game}/items`].filter(
            (i) => i.id !== item.id
        );
        usePlannerStore.setState(() => ({
            [`${game}/items`]: newValues,
        }));
    };

    const [alertOpen, setAlertOpen] = useState(false);
    const handleAlertOpen = () => {
        setAlertOpen(true);
    };
    const handleAlertClose = () => {
        setAlertOpen(false);
    };

    const iconButtonProps: IconButtonProps = {
        sx: {
            p: 0.5,
            color: theme.contentBox.color.header,
            borderRadius: "4px",
            border: `1px solid ${theme.border.color.primary}`,
            backgroundColor: theme.contentBox.backgroundColor.headerHover,
            "&:hover": {
                backgroundColor:
                    theme.contentBox.backgroundColor.headerSelectedHover,
            },
        },
    };

    const iconProps: SvgIconProps = {
        fontSize: "small",
    };

    const buttonProps: ButtonProps = {
        variant: "contained",
        size: "small",
    };

    return (
        <>
            <FlexBox spacing={1}>
                <Tooltip
                    title={mode !== "edit" ? "Edit" : "Done"}
                    arrow
                    placement="top"
                >
                    <IconButton onClick={handleModeChange} {...iconButtonProps}>
                        {mode !== "edit" ? (
                            <EditIcon {...iconProps} />
                        ) : (
                            <DoneIcon {...iconProps} />
                        )}
                    </IconButton>
                </Tooltip>
                <Tooltip title="Toggle" placement="top">
                    <IconButton
                        onClick={handleHiddenChange}
                        {...iconButtonProps}
                    >
                        {hidden ? (
                            <VisibilityIcon {...iconProps} />
                        ) : (
                            <VisibilityOffIcon {...iconProps} />
                        )}
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete" placement="top">
                    <IconButton onClick={handleAlertOpen} {...iconButtonProps}>
                        <DeleteIcon {...iconProps} />
                    </IconButton>
                </Tooltip>
            </FlexBox>
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
                            {`Are you sure you want to remove `}
                            <span
                                style={{
                                    color: theme.text.selected,
                                    fontWeight: theme.font.weight.highlight,
                                }}
                            >
                                {item.displayName}
                            </span>
                            {`?`}
                        </Text>
                        <Text
                            weight="highlight"
                            sx={{ color: theme.text.header }}
                        >{`This action cannot be undone.`}</Text>
                    </Stack>
                    <FlexBox spacing={2} sx={{ justifyContent: "right" }}>
                        <Button
                            {...buttonProps}
                            color="info"
                            onClick={handleAlertClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            {...buttonProps}
                            color="error"
                            onClick={handleDelete}
                        >
                            Delete
                        </Button>
                    </FlexBox>
                </Stack>
            </ContentDialog>
        </>
    );
}
