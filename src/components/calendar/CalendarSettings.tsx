import "./Calendar.css";
import { BaseSyntheticEvent, useState } from "react";

// Component imports
import Image from "custom/Image";
import ToggleButtons, { CustomToggleButtonProps } from "custom/ToggleButtons";
import { FlexBox } from "styled/StyledBox";
import { TextStyled } from "styled/StyledTypography";
import { StyledSwitch } from "styled/StyledSwitch";

// MUI imports
import {
    useTheme,
    useMediaQuery,
    Toolbar,
    IconButton,
    Stack,
    Collapse,
    AppBar,
    Container,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Helper imports
import { useAppDispatch, useAppSelector } from "helpers/hooks";

// Type imports
import { Website, WebsiteColorInfo } from "types/common";
import {
    selectDisplay,
    selectFilters,
    setDisplay,
    setFilters,
} from "reducers/calendar";

function CalendarSettings({ websites }: { websites: Website[] }) {
    const theme = useTheme();
    const matches_up_sm = useMediaQuery(theme.breakpoints.up("sm"));
    const matches_up_md = useMediaQuery(theme.breakpoints.up("md"));

    const dispatch = useAppDispatch();

    const filters = useAppSelector(selectFilters);
    const displayFull = useAppSelector(selectDisplay);

    const buttons = [] as CustomToggleButtonProps[];
    const colors: WebsiteColorInfo = {};
    websites.forEach((website) => {
        colors[website.tag] = website.color;
        if (website.enabled && !["Endfield"].includes(website.tag)) {
            buttons.push({
                value: website.tag.toLowerCase(),
                icon: (
                    <Image
                        src={`game-icons/${website.tag}`}
                        alt={website.tag}
                        style={{
                            width: matches_up_md ? "36px" : "32px",
                            borderRadius: "4px",
                        }}
                        tooltip={website.title}
                        tooltipArrow="bottom"
                    />
                ),
            });
        }
    });

    const storedDropdownOpen =
        localStorage.getItem("calendar/dropdown") || "null";
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(
        storedDropdownOpen !== "null" ? JSON.parse(storedDropdownOpen) : true
    );
    const toggleDropdownOpen = () => {
        const newState = !dropdownOpen;
        const jsonDropdownOpen = JSON.stringify(newState);
        if (jsonDropdownOpen !== storedDropdownOpen) {
            localStorage.setItem("calendar/dropdown", jsonDropdownOpen);
        }
        setDropdownOpen(newState);
    };

    const handleSelect = () => {
        dispatch(setDisplay());
    };

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
                        onClick={toggleDropdownOpen}
                        disableRipple
                        disableTouchRipple
                        sx={{ p: 0 }}
                    >
                        <ExpandMoreIcon
                            sx={{
                                width: "32px",
                                height: "32px",
                                p: "4px",
                                transform: dropdownOpen
                                    ? "rotateX(180deg)"
                                    : "rotateX(0deg)",
                                transition: "transform 0.25s",
                            }}
                        />
                    </IconButton>
                </Toolbar>
                <Collapse in={dropdownOpen} timeout="auto">
                    <FlexBox
                        sx={{
                            alignItems: "center",
                            flexWrap: "wrap",
                            justifyContent: "space-between",
                            gap: "8px",
                            pb: 1,
                        }}
                    >
                        <Stack>
                            <TextStyled
                                variant="body2-styled"
                                gutterBottom
                                sx={{ px: 0.5 }}
                            >
                                Filter games
                            </TextStyled>
                            <ToggleButtons
                                color="primary"
                                buttons={buttons}
                                value={filters}
                                onChange={(
                                    _: BaseSyntheticEvent,
                                    newValues: string[]
                                ) => dispatch(setFilters(newValues))}
                                padding={0}
                                spacing={4}
                            />
                        </Stack>
                        <FlexBox>
                            <StyledSwitch
                                checked={displayFull}
                                onChange={handleSelect}
                                switchColor={theme.palette.info.main}
                                size={matches_up_sm ? "medium" : "small"}
                                sx={{ mt: "3px" }}
                            />
                            <TextStyled
                                variant="body2-styled"
                                sx={{ color: theme.appbar.color }}
                            >
                                Show full duration
                            </TextStyled>
                        </FlexBox>
                    </FlexBox>
                </Collapse>
            </Container>
        </AppBar>
    );
}

export default CalendarSettings;
