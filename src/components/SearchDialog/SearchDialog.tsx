// Component imports
import ContentDialog, { ContentDialogProps } from "@/components/ContentDialog";
import SearchBar from "@/components/SearchBar";
import CloseButton from "@/components/CloseButton";

// MUI imports
import { alpha, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Text from "../Text";

export interface SearchDialogProps extends ContentDialogProps {
    children?: React.ReactNode;
    value: string;
    handleInputChange: (event: React.BaseSyntheticEvent) => void;
    placeholder?: string;
}

export default function SearchDialog({
    open,
    setOpen,
    value,
    children,
    handleInputChange,
    placeholder,
    ...other
}: SearchDialogProps) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("sm"));

    return (
        <ContentDialog
            {...other}
            open={open}
            setOpen={setOpen}
            fullWidth
            fullScreen={!matches}
            header={
                <Grid
                    container
                    spacing={1}
                    sx={{ alignItems: "center", width: "100%" }}
                >
                    <Grid size="grow">
                        <SearchBar
                            autoFocus
                            placeholder={placeholder}
                            value={value}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid size="auto">
                        {matches ? (
                            <Text
                                variant="subtitle2"
                                sx={{
                                    backgroundColor:
                                        theme.contentBox.backgroundColor.header,
                                    outline: `1px solid ${theme.border.color.primary}`,
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                    px: 0.75,
                                    py: 0.25,
                                    "&:hover": {
                                        backgroundColor:
                                            theme.contentBox.backgroundColor
                                                .headerHover,
                                    },
                                }}
                                onClick={() => setOpen(false)}
                            >
                                <code>esc</code>
                            </Text>
                        ) : (
                            <CloseButton
                                onClick={() => setOpen(false)}
                                textColor={theme.contentBox.color.header}
                                hoverColor={
                                    theme.contentBox.backgroundColor.headerHover
                                }
                            />
                        )}
                    </Grid>
                </Grid>
            }
            actions={<></>}
            sx={{
                backdropFilter: "blur(4px)",
                ".MuiDialog-paper": {
                    maxWidth: "600px",
                    minHeight: { xs: "90vh", sm: "640px" },
                },
            }}
            headerProps={{ padding: "0 16px 0 0" }}
            contentProps={{ padding: 0 }}
        >
            <Box
                sx={{
                    p: { xs: "8px", sm: "16px 24px 24px" },
                    height: { xs: "90vh", sm: "640px" },
                    overflowY: "auto",
                    scrollbarWidth: "thin",
                }}
            >
                {children}
            </Box>
        </ContentDialog>
    );
}
