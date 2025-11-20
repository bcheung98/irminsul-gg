// Component imports
import MenuItem from "@/components/MenuItem";
import TextLabel from "@/components/TextLabel";
import Text from "@/components/Text";
import FlexBox from "@/components/FlexBox";
import Tooltip from "@/components/Tooltip";
import NavLink from "@/components/NavLink";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import IconButton from "@mui/material/IconButton";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import StarIcon from "@mui/icons-material/Star";
import DeleteIcon from "@mui/icons-material/Delete";

// Helper imports
import { categories, categoryImgURLs } from "@/data/categories";

// Type imports
import { SearchResult } from "./SiteSearch";

export default function SiteSearchResult({
    item,
    selected,
    buttons,
    handleSelect,
}: {
    item: SearchResult;
    selected: boolean;
    buttons?: { addPin?: boolean; removePin?: boolean; removeRecent?: boolean };
    handleSelect: (option: SearchResult, keyPress?: boolean) => void;
}) {
    const theme = useTheme();
    return (
        <MenuItem
            key={item.url}
            id={item.url}
            selected={selected}
            sx={{
                borderRadius: "4px",
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
                    <NavLink href={item.url || ""}>
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
                            titleProps={{ variant: "body1" }}
                            subtitle={
                                <Text variant="subtitle2" component="span">
                                    {categories[item.category]}
                                </Text>
                            }
                            spacing={2}
                            textSpacing={0.5}
                        />
                    </NavLink>
                </Box>
                <FlexBox spacing={{ xs: 0, sm: 1 }}>
                    {buttons?.addPin && (
                        <Tooltip title="Save this search" placement="top">
                            <Rating
                                max={1}
                                icon={<StarIcon fontSize="small" />}
                                emptyIcon={
                                    <StarOutlineIcon
                                        fontSize="small"
                                        sx={{
                                            color: theme.text.primary,
                                        }}
                                    />
                                }
                                sx={{
                                    "& .MuiRating-labelEmptyValueActive": {
                                        outline: `1px solid ${theme.border.color.primary}`,
                                        borderRadius: "4px",
                                    },
                                }}
                            />
                        </Tooltip>
                    )}
                    {buttons?.removePin && (
                        <Tooltip
                            title="Remove this search from favorites"
                            placement="top"
                        >
                            <IconButton
                                disableRipple
                                sx={{
                                    p: 0.5,
                                    "&:hover": {
                                        backgroundColor:
                                            theme.menu.backgroundColor.selected,
                                    },
                                }}
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    )}
                    {buttons?.removeRecent && (
                        <Tooltip
                            title="Remove this search from history"
                            placement="top"
                        >
                            <IconButton
                                disableRipple
                                sx={{
                                    p: 0.5,
                                    "&:hover": {
                                        backgroundColor:
                                            theme.menu.backgroundColor.selected,
                                    },
                                }}
                            >
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Tooltip>
                    )}
                </FlexBox>
            </FlexBox>
        </MenuItem>
    );
}
