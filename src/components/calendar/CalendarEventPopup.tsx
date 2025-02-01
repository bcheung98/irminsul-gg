// Component imports
import MainContentBox from "custom/MainContentBox";
import Image from "custom/Image";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, useMediaQuery, Box, IconButton, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export interface EventPopupInfo {
    tag: string;
    title: string;
    characters: string[];
}

interface CalendarEventPopupProps {
    onClose: () => void;
    info: EventPopupInfo;
}

function CalendarEventPopup({ onClose, info }: CalendarEventPopupProps) {
    const theme = useTheme();
    const matches_up_sm = useMediaQuery(theme.breakpoints.up("sm"));

    const { tag, title, characters } = info;

    return (
        <Box sx={{ overflowY: "auto", scrollbarWidth: "thin" }}>
            <MainContentBox
                title={title}
                actions={
                    <IconButton
                        disableRipple
                        onClick={onClose}
                        sx={{ color: theme.appbar.color }}
                    >
                        <CloseIcon />
                    </IconButton>
                }
                contentProps={{ padding: "16px" }}
            >
                {characters.length > 0 && (
                    <>
                        <TextStyled sx={{ mb: "16px" }}>
                            Featured Characters
                        </TextStyled>
                        <Stack spacing={2}>
                            {characters.map((char, index) => (
                                <Stack
                                    key={index}
                                    spacing={2}
                                    direction="row"
                                    alignItems="center"
                                >
                                    <Image
                                        src={`https://assets.irminsul.gg/${tag.toLowerCase()}/characters/icons/${char
                                            .split(" ")
                                            .join("_")}.png`}
                                        alt={char}
                                        style={{
                                            width: "auto",
                                            height: matches_up_sm
                                                ? "48px"
                                                : "40px",
                                            backgroundColor: theme.background(
                                                2,
                                                "light"
                                            ),
                                            border: `2px solid ${theme.border.color.primary}`,
                                            borderRadius: "4px",
                                        }}
                                    />
                                    <TextStyled>{char}</TextStyled>
                                </Stack>
                            ))}
                        </Stack>
                    </>
                )}
            </MainContentBox>
        </Box>
    );
}

export default CalendarEventPopup;
