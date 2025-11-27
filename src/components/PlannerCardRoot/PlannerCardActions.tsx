import { useState } from "react";

// Component imports
import FlexBox from "@/components/FlexBox";
import Tooltip from "@/components/Tooltip";

// MUI imports
import { useTheme } from "@mui/material/styles";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import DeleteIcon from "@mui/icons-material/Delete";
import { SvgIconProps } from "@mui/material/SvgIcon";

// Helper imports
import { usePlannerStore } from "@/stores";
import { useGameTag } from "@/context";

// Type imports
import { Game } from "@/types";
import { PlannerCardProps } from "./PlannerCardRoot.types";

export default function PlannerCardActions({ item, type }: PlannerCardProps) {
    const theme = useTheme();

    const game = useGameTag() as Exclude<Game, "uma">;

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

    return (
        <>
            <FlexBox spacing={1}>
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
                    <IconButton onClick={handleDelete} {...iconButtonProps}>
                        <DeleteIcon {...iconProps} />
                    </IconButton>
                </Tooltip>
            </FlexBox>
        </>
    );
}
