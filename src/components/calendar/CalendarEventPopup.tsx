// Component imports
import MainContentBox from "custom/MainContentBox";
import Image from "custom/Image";
import RouterLink from "components/nav/RouterLink";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, useMediaQuery, Box, IconButton, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// Type imports
import { WebsiteURLInfo } from "types/common";

export interface EventPopupInfo {
    tag: string;
    title: string;
    start?: string;
    end?: string;
    characters: string[];
    urls: WebsiteURLInfo;
    futureVersion?: boolean;
}

interface CalendarEventPopupProps {
    onClose: () => void;
    info: EventPopupInfo;
}

interface GetURLProps {
    tag: string;
    char: string;
}

function CalendarEventPopup({ onClose, info }: CalendarEventPopupProps) {
    const theme = useTheme();
    const matches_up_sm = useMediaQuery(theme.breakpoints.up("sm"));

    const { tag, title, characters, urls, start, end, futureVersion } = info;

    const imgSize = matches_up_sm ? "48px" : "40px";

    function getURL({ tag, char }: GetURLProps) {
        return `https://${tag.toLowerCase()}.irminsul.gg/${
            urls.characters.href
        }/${char.toLowerCase().split(" ").join("_")}`;
    }
    function getImgSrc({ tag, char }: GetURLProps) {
        return `https://assets.irminsul.gg/${tag.toLowerCase()}/${
            urls.characters.icon
        }/${char.split(" ").join("_")}.png`;
    }

    return (
        <Box sx={{ overflowY: "auto", scrollbarWidth: "thin" }}>
            <MainContentBox
                title={
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Image
                            src={`https://assets.irminsul.gg/main/game-icons/${tag}.png`}
                            alt={tag}
                            style={{
                                width: imgSize,
                                height: imgSize,
                                borderRadius: "4px",
                            }}
                        />
                        <TextStyled variant="h6-styled">{title}</TextStyled>
                    </Stack>
                }
                actions={
                    <IconButton
                        disableRipple
                        onClick={onClose}
                        sx={{ color: theme.appbar.color }}
                    >
                        <CloseIcon />
                    </IconButton>
                }
                headerProps={{ wrap: false }}
                contentProps={{ padding: "16px" }}
            >
                <TextStyled sx={{ mb: "16px" }}>
                    {`${start} - ${end}${futureVersion ? " (Tentative)" : ""}`}
                </TextStyled>
                {characters.length > 0 && (
                    <Stack spacing={2}>
                        {characters.map((char, index) => (
                            <Stack
                                key={index}
                                spacing={2}
                                direction="row"
                                alignItems="center"
                            >
                                <RouterLink
                                    to={getURL({ tag, char })}
                                    openInNewTab
                                >
                                    <Image
                                        src={getImgSrc({ tag, char })}
                                        alt={char}
                                        style={{
                                            width: imgSize,
                                            height: imgSize,
                                            backgroundColor: theme.background(
                                                2,
                                                "light"
                                            ),
                                            border: `2px solid ${theme.border.color.primary}`,
                                            borderRadius: "4px",
                                        }}
                                    />
                                </RouterLink>
                                <RouterLink
                                    to={getURL({ tag, char })}
                                    openInNewTab
                                >
                                    <TextStyled
                                        sx={{
                                            cursor: "pointer",
                                            "&:hover": {
                                                color: theme.text.selected,
                                                textDecoration: "underline",
                                            },
                                        }}
                                    >
                                        {char}
                                    </TextStyled>
                                </RouterLink>
                            </Stack>
                        ))}
                    </Stack>
                )}
            </MainContentBox>
        </Box>
    );
}

export default CalendarEventPopup;
