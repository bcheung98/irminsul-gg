import { useContext } from "react";

// Component imports
import TextLabel from "@/components/TextLabel";
import NavLink from "@/components/NavLink";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import ButtonBase from "@mui/material/ButtonBase";
import Box from "@mui/material/Box";

// Helper imports
import { WebsiteContext } from "@/app/context";

export default function GamesMenuList() {
    const theme = useTheme();

    const websites = useContext(WebsiteContext);

    return (
        <Stack spacing={0.5}>
            {websites
                .sort((a, b) => a.title.localeCompare(b.title))
                .map((website, index) => (
                    <ButtonBase
                        key={index}
                        href={`/${website.tag.toLocaleLowerCase()}`}
                        sx={{ display: "flex" }}
                        LinkComponent={NavLink}
                    >
                        <Box
                            sx={{
                                p: "4px 16px",
                                "&:hover": {
                                    backgroundColor:
                                        theme.drawer.backgroundColor.hover,
                                },
                            }}
                        >
                            <TextLabel
                                icon={`main/game-icons/${website.tag}`}
                                iconProps={{ size: 32 }}
                                title={website.title}
                                titleProps={{
                                    variant: "subtitle1",
                                    defaultCursor: "pointer",
                                }}
                                spacing={2}
                            />
                        </Box>
                    </ButtonBase>
                ))}
        </Stack>
    );
}
