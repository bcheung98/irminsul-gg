// Component imports
import MenuItem from "@/components/MenuItem";
import TextLabel from "@/components/TextLabel";
import Text from "@/components/Text";
import FlexBox from "@/components/FlexBox";
import Tooltip from "@/components/Tooltip";
import NavLink from "@/components/NavLink";
import Image from "@/components/Image";
import CloseButton from "@/components/CloseButton";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import PushPinIcon from "@mui/icons-material/PushPin";

// Helper imports
import { categories, categoryImgURLs } from "@/data/categories";
import { games } from "@/data/games";
import { useSiteSearchStore } from "@/stores";
import { formatTitle } from "@/helpers/uma/formatTitle";

// Type imports
import { SearchResult } from "./SiteSearch";
import { Game } from "@/types";
import { UmaCharacter, UmaSupport } from "@/types/uma";

interface SearchResultButtons {
    addPin?: boolean;
    removePin?: boolean;
    removeRecent?: boolean;
}

export default function SiteSearchResult({
    item,
    index,
    focus,
    buttons,
    handleSelect,
    handleFocusChange,
}: {
    item: SearchResult;
    index: number;
    focus: number;
    buttons?: SearchResultButtons;
    handleSelect: (option: SearchResult, keyPress?: boolean) => void;
    handleFocusChange: (index: number) => void;
}) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("sm"));

    const { addPinnedSearch, removePinnedSearch, removeRecentSearch } =
        useSiteSearchStore();

    const game = games[item.category.split("/")[0] as Game];

    return (
        <MenuItem
            key={item.url}
            id={item.url}
            autoFocus={focus === index}
            onMouseMove={() => handleFocusChange(index)}
            sx={{
                borderRadius: "4px",
                px: { xs: 1, sm: 2 },
                "&.MuiMenuItem-root": {
                    "&:hover": {
                        backgroundColor: theme.menu.backgroundColor.hover,
                    },
                    "&.Mui-focusVisible, &.Mui-selected": {
                        backgroundColor: theme.menu.backgroundColor.hover,
                        "&:hover": {
                            backgroundColor: theme.menu.backgroundColor.hover,
                        },
                    },
                },
            }}
            disableRipple
            disableTouchRipple
        >
            <FlexBox
                wrap
                spacing={[1, 0]}
                sx={{
                    flexGrow: 1,
                    overflow: "hidden",
                }}
            >
                <Box
                    sx={{
                        flex: "1 0 auto",
                        "&.Mui-focusVisible, &.Mui-selected": {
                            outline: 0,
                        },
                    }}
                    onClick={() => handleSelect(item)}
                >
                    <NavLink href={item.url}>
                        <TextLabel
                            icon={categoryImgURLs[item.category](
                                item.id,
                                item.name
                            )}
                            iconProps={{
                                size: 48,
                                styles: {
                                    border: `2px solid ${theme.border.color.primary}`,
                                    backgroundColor: theme.background(2),
                                },
                            }}
                            title={
                                item.category.startsWith("uma")
                                    ? formatTitle(
                                          item as unknown as
                                              | UmaCharacter
                                              | UmaSupport
                                      )
                                    : item.displayName
                            }
                            titleProps={{
                                variant: matches ? "body1" : "body2",
                            }}
                            subtitle={
                                <Text
                                    variant={matches ? "subtitle2" : "body3"}
                                    weight="highlight"
                                    component="span"
                                >
                                    {`${categories[item.category]}`}
                                </Text>
                            }
                            spacing={matches ? 2 : 1}
                            textSpacing={0.5}
                        />
                    </NavLink>
                </Box>
                <FlexBox spacing={1}>
                    {buttons?.addPin && (
                        <Tooltip title="Pin this search" placement="top">
                            <IconButton
                                onClick={() => addPinnedSearch(item)}
                                sx={{
                                    pl: 0.125,
                                    pr: 0.35,
                                    pt: 0.35,
                                    pb: 0.125,
                                    borderRadius: "4px",
                                    "&:hover": {
                                        backgroundColor:
                                            theme.drawer.backgroundColor
                                                .selectedHover,
                                    },
                                }}
                            >
                                <PushPinIcon
                                    fontSize="small"
                                    sx={{ transform: "rotate(45deg)" }}
                                />
                            </IconButton>
                        </Tooltip>
                    )}
                    {buttons?.removePin && (
                        <CloseButton
                            onClick={() => removePinnedSearch(item)}
                            padding={0.25}
                            borderRadius="4px"
                            hoverColor={theme.palette.error.main}
                            tooltip="Unpin this search"
                        />
                    )}
                    {buttons?.removeRecent && (
                        <CloseButton
                            onClick={() => removeRecentSearch(item)}
                            padding={0.25}
                            borderRadius="4px"
                            hoverColor={theme.palette.error.main}
                            tooltip="Remove this search from history"
                        />
                    )}
                    <Image
                        src={`${game.tag}/_common/Icon`}
                        size={24}
                        style={{ borderRadius: "4px" }}
                        tooltip={game.name}
                        tooltipArrow="right"
                    />
                </FlexBox>
            </FlexBox>
        </MenuItem>
    );
}
