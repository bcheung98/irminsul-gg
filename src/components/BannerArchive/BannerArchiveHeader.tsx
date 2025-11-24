// Component imports
import FlexBox from "@/components/FlexBox";
import ToggleButtons from "@/components/ToggleButtons";

// MUI imports
import IconButton from "@mui/material/IconButton";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";

// Helper imports
import { useGameTag } from "@/context";
import { banners } from "@/data/banners";

// Type imports
import { BannerArchiveHeaderProps } from "./BannerArchive.types";

export default function BannerArchiveHeader({
    bannerType,
    sortDirection,
    handleViewChange,
    handleDirectionChange,
}: BannerArchiveHeaderProps) {
    const game = useGameTag();

    return (
        <FlexBox spacing={[1, 2]} wrap>
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
                exclusive
                buttons={banners[game]}
                value={bannerType}
                padding="6px 16px"
                onChange={handleViewChange}
                highlightOnHover={false}
            />
        </FlexBox>
    );
}
