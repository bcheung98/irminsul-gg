// Component imports
import Text from "@/components/Text";
import TextLabel from "@/components/TextLabel";

// MUI imports
import { useTheme } from "@mui/material/styles";
import ButtonBase from "@mui/material/ButtonBase";
import Box from "@mui/material/Box";

// Helper imports
import { useRandomPageShortcut } from "./RandomButton.hooks";

export default function RandomButton() {
    const theme = useTheme();

    useRandomPageShortcut();

    const href = "/random";

    return (
        <>
            <ButtonBase
                href={href}
                sx={{
                    display: { xs: "none", md: "flex" },
                    px: 1,
                    py: 0.5,
                    transition: "color 0.25s",
                    color: theme.text.primary,
                    "&:hover": {
                        color: theme.text.selected,
                        textShadow: `${theme.text.selected} 1px 1px 8px`,
                    },
                }}
            >
                <Text
                    variant="body2"
                    weight="highlight"
                    sx={{
                        color: "inherit",
                        display: { xs: "none", md: "block" },
                    }}
                >
                    Random
                </Text>
            </ButtonBase>
            <Box
                sx={{
                    display: { xs: "block", md: "none" },
                    p: "4px 16px",
                }}
            >
                <TextLabel
                    title="Random Page"
                    titleProps={{
                        variant: "subtitle1",
                        weight: "highlight",
                    }}
                    icon="_common/images/Unknown"
                    iconProps={{ size: 32 }}
                    spacing={2}
                    href={href}
                />
            </Box>
        </>
    );
}
