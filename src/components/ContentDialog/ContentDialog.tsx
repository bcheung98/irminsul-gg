import { SetStateAction } from "react";

// Component imports
import ContentBox from "@/components/ContentBox";
import Tooltip from "@/components/Tooltip";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

// Type imports
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
    actions,
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
                            actions || (
                                <Tooltip title="Close" arrow placement="top">
                                    <IconButton
                                        onClick={() => setOpen(false)}
                                        sx={{
                                            color: theme.contentBox.color
                                                .header,
                                            p: 0.5,
                                            "&:hover": {
                                                backgroundColor:
                                                    theme.drawer.backgroundColor
                                                        .hover,
                                            },
                                        }}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </Tooltip>
                            )
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
