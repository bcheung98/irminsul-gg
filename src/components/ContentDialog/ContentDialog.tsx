import { SetStateAction } from "react";

// Component imports
import ContentBox from "@/components/ContentBox";
import CloseButton from "@/components/CloseButton";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Dialog, { DialogProps } from "@mui/material/Dialog";

// Type imports
import { ContentBoxProps } from "@/components/ContentBox/ContentBox.types";

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
                                <CloseButton
                                    onClick={() => setOpen(false)}
                                    textColor={theme.contentBox.color.header}
                                    hoverColor={
                                        theme.contentBox.backgroundColor
                                            .headerHover
                                    }
                                />
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
