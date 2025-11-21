// Component imports
import ContentDialog, { ContentDialogProps } from "@/components/ContentDialog";
import SearchBar from "@/components/SearchBar";
import Tooltip from "@/components/Tooltip";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

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
                        <Tooltip title="Close" arrow placement="top">
                            <IconButton
                                onClick={() => setOpen(false)}
                                sx={{
                                    color: theme.contentBox.color.header,
                                    p: 0.5,
                                    "&:hover": {
                                        backgroundColor:
                                            theme.drawer.backgroundColor.hover,
                                    },
                                }}
                            >
                                <CloseIcon />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            }
            actions={<></>}
            sx={{
                backdropFilter: "blur(4px)",
                ".MuiDialog-paper": {
                    maxWidth: "600px",
                    minHeight: { xs: "90vh", sm: "640px" },
                    outline: `1px solid ${theme.border.color.secondary}`,
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
