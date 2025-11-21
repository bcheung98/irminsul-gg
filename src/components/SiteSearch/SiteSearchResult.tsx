// Component imports
import MenuItem from "@/components/MenuItem";
import TextLabel from "@/components/TextLabel";
import Text from "@/components/Text";
import FlexBox from "@/components/FlexBox";
import Tooltip from "@/components/Tooltip";
import NavLink from "@/components/NavLink";
import Image from "@/components/Image";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import IconButton from "@mui/material/IconButton";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarIcon from "@mui/icons-material/Star";
import CloseIcon from "@mui/icons-material/Close";
import PushPinIcon from "@mui/icons-material/PushPin";

// Helper imports
import { categories, categoryImgURLs } from "@/data/categories";
import { games } from "@/data/games";
import { useSiteSearchStore } from "@/stores/useSiteSearchStore";

// Type imports
import { SearchResult } from "./SiteSearch";
import { Game } from "@/types";

export default function SiteSearchResult({
    item,
    buttons,
    handleSelect,
}: {
    item: SearchResult;
    buttons?: { addPin?: boolean; removePin?: boolean; removeRecent?: boolean };
    handleSelect: (option: SearchResult, keyPress?: boolean) => void;
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
                    sx={{ flex: "1 0 auto" }}
                    onClick={() => handleSelect(item)}
                >
                    <NavLink href={item.url}>
                        <TextLabel
                            icon={categoryImgURLs[item.category](item.name)}
                            iconProps={{
                                size: 48,
                                styles: {
                                    border: `2px solid ${theme.border.color.primary}`,
                                    backgroundColor: theme.background(2),
                                },
                            }}
                            title={item.displayName}
                            titleProps={{
                                variant: matches ? "body1" : "body2",
                            }}
                            subtitle={
                                <Text
                                    variant={matches ? "subtitle2" : "body3"}
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
                        <Tooltip title="Unpin this search" placement="top">
                            <IconButton
                                onClick={() => removePinnedSearch(item)}
                                sx={{
                                    p: 0.25,
                                    borderRadius: "4px",
                                    "&:hover": {
                                        backgroundColor:
                                            theme.palette.error.main,
                                    },
                                }}
                            >
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    )}
                    {buttons?.removeRecent && (
                        <Tooltip
                            title="Remove this search from history"
                            placement="top"
                        >
                            <IconButton
                                onClick={() => removeRecentSearch(item)}
                                sx={{
                                    p: 0.25,
                                    borderRadius: "4px",
                                    "&:hover": {
                                        backgroundColor:
                                            theme.palette.error.main,
                                    },
                                }}
                            >
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    )}
                    <Image
                        src={`main/game-icons/${game.shortName}`}
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
