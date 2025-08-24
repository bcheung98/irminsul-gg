// Component imports
import MainContentBox from "custom/MainContentBox";
import Image from "custom/Image";
import RouterLink from "components/nav/RouterLink";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, useMediaQuery, Box, IconButton, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// Helper imports
import { useAppSelector } from "helpers/hooks";
import { selectUmaCharacters, selectUmaSupports } from "reducers/uma";

// Type imports
import { URLInfo, WebsiteURLInfo } from "types/common";
import { UmaItemData } from "types/uma";

export interface EventPopupInfo {
    tag: string;
    type: string;
    title: string;
    start?: string;
    end?: string;
    rateUps: (string | number)[];
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

interface GetUmaURLProps {
    tag: string;
    char: number;
}

function CalendarEventPopup({ onClose, info }: CalendarEventPopupProps) {
    const theme = useTheme();
    const matches_up_sm = useMediaQuery(theme.breakpoints.up("sm"));

    const { tag, type, title, rateUps, urls, start, end, futureVersion } = info;

    const imgSize = matches_up_sm ? "48px" : "40px";

    const umaCharacters = useAppSelector(selectUmaCharacters);
    const umaSupports = useAppSelector(selectUmaSupports);

    function getURL({ tag, char }: GetURLProps) {
        return `https://${tag.toLowerCase()}.irminsul.gg/${
            urls[`${type}s` as keyof URLInfo].href
        }/${char.toLowerCase().split(" ").join("_")}`;
    }
    function getImgSrc({ tag, char }: GetURLProps) {
        return `https://assets.irminsul.gg/${tag.toLowerCase()}/${
            urls[`${type}s` as keyof URLInfo].icon
        }/${char.split(" ").join("_")}.png`;
    }

    function getUmaName(id: number) {
        let item: UmaItemData | undefined;
        if (type === "character") {
            item = umaCharacters.find((i) => id === i.id);
        } else {
            item = umaSupports.find((i) => id === i.id);
        }
        let name = "";
        let title = "";
        if (item) {
            name = item.name;
            title = item.title;
        }
        return [name, title];
    }

    function getUmaURL({ tag, char }: GetUmaURLProps) {
        const [name] = getUmaName(char);
        return `https://${tag.toLowerCase()}.irminsul.gg/${
            urls[`${type}s` as keyof URLInfo].href
        }/${name.toLowerCase().split(" ").join("-")}-${char}`;
    }
    function getUmaImgSrc({ tag, char }: GetUmaURLProps) {
        return `https://assets.irminsul.gg/${tag.toLowerCase()}/${
            urls[`${type}s` as keyof URLInfo].icon
        }/${char}.png`;
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
                {rateUps.length > 0 && (
                    <Stack spacing={2}>
                        {rateUps.map((char, index) => (
                            <Stack
                                key={index}
                                spacing={2}
                                direction="row"
                                alignItems="center"
                            >
                                <RouterLink
                                    to={
                                        tag === "Uma"
                                            ? typeof char === "number"
                                                ? getUmaURL({ tag, char })
                                                : ""
                                            : typeof char === "string"
                                            ? getURL({ tag, char })
                                            : ""
                                    }
                                    openInNewTab
                                >
                                    <Image
                                        src={
                                            tag === "Uma"
                                                ? typeof char === "number"
                                                    ? getUmaImgSrc({
                                                          tag,
                                                          char,
                                                      })
                                                    : ""
                                                : typeof char === "string"
                                                ? getImgSrc({ tag, char })
                                                : ""
                                        }
                                        alt={`${char}`}
                                        style={{
                                            width: imgSize,
                                            height: imgSize,
                                            backgroundColor:
                                                tag === "Uma"
                                                    ? "transparent"
                                                    : theme.background(
                                                          2,
                                                          "light"
                                                      ),
                                            border:
                                                tag === "Uma"
                                                    ? "none"
                                                    : `2px solid ${theme.border.color.primary}`,
                                            borderRadius: "4px",
                                        }}
                                    />
                                </RouterLink>
                                <RouterLink
                                    to={
                                        tag === "Uma"
                                            ? typeof char === "number"
                                                ? getUmaURL({ tag, char })
                                                : ""
                                            : typeof char === "string"
                                            ? getURL({ tag, char })
                                            : ""
                                    }
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
                                        {tag === "Uma"
                                            ? `${getUmaName(char as number)[0]}`
                                            : char}
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
