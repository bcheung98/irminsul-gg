// Component imports
import Text from "@/components/Text";
import NavButton from "@/components/NavButton";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import SearchIcon from "@mui/icons-material/Search";

export default function SiteSearchRoot({
    handleSearchOpen,
}: {
    handleSearchOpen: () => void;
}) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));

    return (
        <>
            {matches ? (
                <Button
                    onClick={handleSearchOpen}
                    variant="contained"
                    disableRipple
                    startIcon={
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <SearchIcon
                                sx={{
                                    color: theme.text.primary,
                                    width: "18px",
                                    height: "18px",
                                }}
                            />
                            <Text variant="body2">Search...</Text>
                        </Stack>
                    }
                    endIcon={
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Text
                                variant="subtitle2"
                                sx={{
                                    fontSize: `${theme.typography.pxToRem(
                                        10.5
                                    )} !important`,
                                    backgroundColor:
                                        theme.drawer.backgroundColor.main,
                                    outline: `1px solid ${theme.border.color.primary}`,
                                    borderRadius: "4px",
                                    px: "8px",
                                }}
                            >
                                <code>Ctrl+K</code>
                            </Text>
                        </Stack>
                    }
                    sx={{
                        justifyContent: "space-between",
                        height: "28px",
                        width: { xs: "200px", lg: "240px" },
                        outline: `1px solid ${theme.border.color.primary}`,
                        backgroundColor: theme.drawer.backgroundColor.main,
                        "&:hover": {
                            backgroundColor: theme.drawer.backgroundColor.hover,
                        },
                        display: { xs: "none", md: "flex" },
                    }}
                />
            ) : (
                <NavButton
                    onClick={handleSearchOpen}
                    sx={{ display: { md: "none" } }}
                >
                    <SearchIcon />
                </NavButton>
            )}
        </>
    );
}
