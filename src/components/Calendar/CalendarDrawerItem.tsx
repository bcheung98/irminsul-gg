import { memo, useState } from "react";

// Component imports
import SettingsItem from "@/components/Settings/SettingsItem";
import ToggleButtons from "@/components/ToggleButtons";
import TextLabel from "@/components/TextLabel";
import Switch from "@/components/Switch";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Stack from "@mui/material/Stack";
import ButtonBase from "@mui/material/ButtonBase";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Helper imports
import { useCalendarStore, useServerStore } from "@/stores";
import { serverButtons, serverButtonsUma } from "@/data/settings";

// Type imports
import { GameInfo, Server } from "@/types";

const CalendarDrawerItem = memo(function CalendarDrawerItem(props: GameInfo) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("sm"));

    const server = useServerStore();
    const settings = useCalendarStore();
    const { setCalendarSettings } = useCalendarStore();

    const [open, setOpen] = useState(false);
    const toggleDropdownState = () => {
        setOpen(() => !open);
    };

    return (
        <Stack spacing={1} sx={{ px: 2 }}>
            <ButtonBase
                disableRipple
                onClick={toggleDropdownState}
                sx={{ justifyContent: "space-between" }}
            >
                <TextLabel
                    icon={`main/game-icons/${props.shortName}`}
                    iconProps={{ size: 24 }}
                    title={props.name}
                    titleProps={{ variant: "subtitle1" }}
                />
                <ExpandMoreIcon
                    fontSize={matches ? "medium" : "small"}
                    sx={{
                        color: theme.border.color.primary,
                        transform: open ? `rotateZ(0deg)` : `rotateZ(-90deg)`,
                        transition: "transform 0.25s",
                    }}
                />
            </ButtonBase>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Stack spacing={1}>
                    <SettingsItem
                        label="Server"
                        alignItems="center"
                        textVariant="body2"
                        input={
                            <ToggleButtons
                                buttons={
                                    props.tag === "uma"
                                        ? serverButtonsUma
                                        : serverButtons
                                }
                                value={server[props.tag]}
                                exclusive
                                onChange={(
                                    _: React.BaseSyntheticEvent,
                                    newValue: Server
                                ) => {
                                    if (newValue !== null) {
                                        server.setServer(props.tag, newValue);
                                    }
                                }}
                                spacing={0}
                                padding="2px 8px"
                                highlightOnHover={false}
                            />
                        }
                    />
                    <SettingsItem
                        label="Show banners"
                        alignItems="center"
                        textVariant="body2"
                        input={
                            <Switch
                                checked={settings[props.tag].enabled}
                                size="small"
                                onChange={(event) =>
                                    setCalendarSettings(
                                        props.tag,
                                        "enabled",
                                        event.target.checked
                                    )
                                }
                            />
                        }
                    />
                    <SettingsItem
                        label="Show full duration"
                        alignItems="center"
                        textVariant="body2"
                        input={
                            <Switch
                                checked={settings[props.tag].fullDuration}
                                size="small"
                                onChange={(event) =>
                                    setCalendarSettings(
                                        props.tag,
                                        "fullDuration",
                                        event.target.checked
                                    )
                                }
                            />
                        }
                    />
                </Stack>
            </Collapse>
        </Stack>
    );
});

export default CalendarDrawerItem;
