import "./Calendar.css";
import { useState } from "react";

// Component imports
import Image from "custom/Image";
import MainContentBox from "custom/MainContentBox";
import { TextStyled } from "styled/StyledTypography";
import { StyledSwitch } from "styled/StyledSwitch";

// MUI imports
import {
    useTheme,
    Toolbar,
    IconButton,
    Dialog,
    Stack,
    AppBar,
    Container,
    Box,
    Divider,
    Card,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import CloseIcon from "@mui/icons-material/Close";

// Helper imports
import { useAppDispatch, useAppSelector } from "helpers/hooks";

// Type imports
import { Website } from "types/common";
import {
    selectSettings,
    setFullDuration,
    setGameEnabled,
    setSettings,
} from "reducers/calendar";
import { objectKeys } from "helpers/utils";

function CalendarSettings({ websites }: { websites: Website[] }) {
    const theme = useTheme();

    const dispatch = useAppDispatch();

    const settings = useAppSelector(selectSettings);

    const [settingsOpen, setSettingsOpen] = useState(false);
    const handleSettingsOpen = () => {
        setSettingsOpen(true);
    };
    const handleSettingsClose = () => {
        dispatch(setSettings(settings));
        setSettingsOpen(false);
    };

    const games: { name: string; tag: string; icon: React.ReactNode }[] = [];
    websites.forEach((website) => {
        if (website.enabled && !["Endfield"].includes(website.tag)) {
            games.push({
                name: website.title,
                tag: website.tag,
                icon: (
                    <Image
                        src={`game-icons/${website.tag}`}
                        alt={website.tag}
                        style={{
                            width: "32px",
                            borderRadius: "4px",
                        }}
                    />
                ),
            });
        }
    });

    return (
        <AppBar
            position="relative"
            sx={{
                borderColor: theme.appbar.selectedHover,
                px: { xs: 1, sm: 2, md: 3 },
            }}
        >
            <Container maxWidth="xl" disableGutters>
                <Toolbar
                    variant="dense"
                    disableGutters
                    sx={{
                        justifyContent: "space-between",
                    }}
                >
                    <TextStyled variant="h6-styled">Gacha Calendar</TextStyled>
                    <IconButton
                        disableRipple
                        disableTouchRipple
                        onClick={handleSettingsOpen}
                        sx={{
                            borderRadius: "8px",
                            px: "2px",
                            width: "36px",
                            height: "36px",
                            color: theme.appbar.color,
                            "&:hover": {
                                backgroundColor: theme.appbar.hover,
                            },
                        }}
                    >
                        <SettingsIcon />
                    </IconButton>
                </Toolbar>
            </Container>
            <Dialog
                open={settingsOpen}
                onClose={handleSettingsClose}
                maxWidth="xs"
                fullWidth
                disableScrollLock
            >
                <Box sx={{ overflowY: "auto" }}>
                    {objectKeys(settings).length > 0 && (
                        <MainContentBox
                            title="Settings"
                            actions={
                                <IconButton
                                    disableRipple
                                    onClick={handleSettingsClose}
                                    sx={{ color: theme.appbar.color }}
                                >
                                    <CloseIcon />
                                </IconButton>
                            }
                            contentProps={{ padding: "16px" }}
                        >
                            <Stack spacing={2} divider={<Divider />}>
                                {games.map((game) => (
                                    <Stack key={game.tag} spacing={1}>
                                        <Stack
                                            spacing={1}
                                            direction="row"
                                            alignItems="center"
                                        >
                                            {game.icon}
                                            <TextStyled>{game.name}</TextStyled>
                                        </Stack>
                                        <Card>
                                            <Stack
                                                direction="row"
                                                alignItems="center"
                                                justifyContent="space-between"
                                                sx={{
                                                    px: 1,
                                                    backgroundColor:
                                                        theme.background(
                                                            0,
                                                            "light"
                                                        ),
                                                }}
                                            >
                                                <TextStyled variant="body2-styled">
                                                    Show banners
                                                </TextStyled>
                                                <StyledSwitch
                                                    checked={
                                                        settings[game.tag]
                                                            .enabled
                                                    }
                                                    onChange={() =>
                                                        dispatch(
                                                            setGameEnabled({
                                                                game: game.tag,
                                                            })
                                                        )
                                                    }
                                                    color="info"
                                                />
                                            </Stack>
                                            <Stack
                                                direction="row"
                                                alignItems="center"
                                                justifyContent="space-between"
                                                sx={{
                                                    px: 1,
                                                    backgroundColor:
                                                        theme.background(
                                                            0,
                                                            "dark"
                                                        ),
                                                }}
                                            >
                                                <TextStyled variant="body2-styled">
                                                    Show full duration
                                                </TextStyled>
                                                <StyledSwitch
                                                    checked={
                                                        settings[game.tag]
                                                            .fullDuration
                                                    }
                                                    onChange={() =>
                                                        dispatch(
                                                            setFullDuration({
                                                                game: game.tag,
                                                            })
                                                        )
                                                    }
                                                    color="info"
                                                />
                                            </Stack>
                                        </Card>
                                    </Stack>
                                ))}
                            </Stack>
                        </MainContentBox>
                    )}
                </Box>
            </Dialog>
        </AppBar>
    );
}

export default CalendarSettings;
