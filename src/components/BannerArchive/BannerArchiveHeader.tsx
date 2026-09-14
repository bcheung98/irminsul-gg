// Component imports
import FlexBox from "@/components/FlexBox";
import ToggleButtons from "@/components/ToggleButtons";
import Tooltip from "@/components/Tooltip";

// MUI imports
import IconButton from "@mui/material/IconButton";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Helper imports
import { useGameTag } from "@/context";
import { bannerLabels } from "@/data/banners";

// Type imports
import { BannerArchiveHeaderProps } from "./BannerArchive.types";

export default function BannerArchiveHeader({
    bannerType,
    sortDirection,
    handleViewChange,
    handleDirectionChange,
    dropdownOpen,
    toggleDropdown,
}: BannerArchiveHeaderProps) {
    const game = useGameTag();

    return (
        <FlexBox spacing={[1, 2]} wrap sx={{ position: "relative" }}>
            <IconButton
                onClick={handleDirectionChange}
                sx={(theme) => ({
                    backgroundColor: theme.background(2, "dark"),
                    border: `1px solid ${theme.border.color.primary}`,
                    borderRadius: "4px",
                    width: "32px",
                    height: "32px",
                    "&:hover": {
                        backgroundColor: theme.background(0),
                    },
                })}
            >
                <KeyboardDoubleArrowUpIcon
                    fontSize="small"
                    sx={{
                        transform:
                            sortDirection === "asc"
                                ? "rotateX(0deg)"
                                : "rotateX(180deg)",
                        transition: "transform 0.25s",
                    }}
                />
            </IconButton>
            <ToggleButtons
                buttons={bannerLabels[game]}
                value={bannerType}
                padding="6px 16px"
                onChange={handleViewChange}
                highlightOnHover={false}
            />
            <Tooltip
                title={`${dropdownOpen ? "Hide" : "Expand"} filters`}
                arrow
                placement="right"
            >
                <IconButton
                    onClick={toggleDropdown}
                    sx={{
                        position: "absolute",
                        top: -4,
                        right: 0,
                        transform: dropdownOpen
                            ? `rotateZ(-180deg)`
                            : `rotateZ(0deg)`,
                        transition: "transform 0.25s",
                    }}
                >
                    <ExpandMoreIcon />
                </IconButton>
            </Tooltip>
        </FlexBox>
    );
}
