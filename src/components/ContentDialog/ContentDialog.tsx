import { SetStateAction, useState } from "react";

// Component imports
import ContentBox from "../ContentBox";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { ContentBoxProps } from "../ContentBox/ContentBox.types";

export interface ContentDialogProps extends DialogProps, ContentBoxProps {
    setOpen: (value: SetStateAction<boolean>) => void;
}

export default function ContentDialog({
    children,
    open,
    setOpen,
    maxWidth = "xl",
    header = "",
    headerProps,
    contentProps,
    ...other
}: ContentDialogProps) {
    const theme = useTheme();

    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            maxWidth={maxWidth}
            fullWidth
            keepMounted
            scroll="body"
            {...other}
        >
            <Box sx={{ overflowY: "auto" }}>
                {open && (
                    <ContentBox
                        header={header}
                        actions={
                            <IconButton
                                onClick={() => setOpen(false)}
                                sx={{ color: theme.contentBox.color.header }}
                            >
                                <CloseIcon />
                            </IconButton>
                        }
                        headerProps={headerProps}
                        contentProps={contentProps}
                    >
                        {children}
                    </ContentBox>
                )}
            </Box>
        </Dialog>
    );
}
