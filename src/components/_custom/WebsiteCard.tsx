import { CSSProperties } from "react";

// Component imports
import Image from "./Image";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import {
    useTheme,
    SxProps,
    Box,
    Card,
    Skeleton,
    ButtonBase,
} from "@mui/material";

// Helper imports
import { zoomImageOnHover } from "helpers/utils";

// Type imports
import { Website } from "types/common";

interface WebsiteCardProps {
    site: Website;
    loading?: boolean;
}

function WebsiteCard({ site, loading = false }: WebsiteCardProps) {
    const theme = useTheme();

    const borderRadius = "16px";

    const { title, tag, enabled, gameVersion } = site;
    const scale = 1;
    const translate = [0, 0];

    const tagLower = tag.toLowerCase();

    const id = `${tag.split(" ").join("")}-websiteCard`;

    const href = enabled ? `https://${tagLower}.irminsul.gg/` : "";
    const imgSrc = `wallpapers/${tagLower}/${tag}_${gameVersion}`;

    const handleHover = (direction: "enter" | "leave") => {
        enabled &&
            zoomImageOnHover({
                direction,
                id: `${id}-img`,
                baseScale: scale,
                zoom: 1.0325,
                translate: `translate(${translate[0]}px, ${translate[1]}px`,
            });
    };

    const rootStyle: SxProps = {
        position: "relative",
        overflow: "visible",
        width: "100%",
        height: "auto",
        borderRadius: borderRadius,
        background: `linear-gradient(to bottom, transparent, ${theme.appbar.backgroundColor} 50%)`,
    };

    const cardStyle: SxProps = {
        borderRadius: borderRadius,
        backgroundColor: "transparent",
    };

    const imageContainerStyle: SxProps = {
        display: "flex",
        overflow: "clip",
        width: "auto",
    };

    const imageStyle: CSSProperties = {
        width: "100%",
        height: "100%",
        transform: `scale(${scale}) translate(${translate[0]}px, ${translate[1]}px)`,
        aspectRatio: 16 / 9,
        cursor: enabled ? "pointer" : "auto",
        opacity: enabled ? 1 : 0.5,
    };

    return (
        <Card sx={rootStyle} elevation={2}>
            {!loading ? (
                <>
                    <Card elevation={0} sx={cardStyle}>
                        <Box
                            onMouseEnter={() => handleHover("enter")}
                            onMouseLeave={() => handleHover("leave")}
                            sx={imageContainerStyle}
                        >
                            <ButtonBase
                                disableRipple
                                disableTouchRipple
                                href={href}
                            >
                                <Image
                                    src={imgSrc}
                                    fallbackSrc={`wallpapers/${tagLower}/${tag}`}
                                    alt={tag}
                                    id={`${id}-img`}
                                    style={imageStyle}
                                />
                            </ButtonBase>
                        </Box>
                        {!enabled && (
                            <Box
                                sx={{
                                    position: "absolute",
                                    zIndex: 5,
                                    top: "-4%",
                                    right: "-8px",
                                    backgroundColor: `rgb(192, 120, 0)`,
                                    borderRadius: "8px",
                                    border: `2px solid rgb(230, 184, 44)`,
                                    px: 1,
                                    boxShadow: `inset 0 0 8px rgb(230, 184, 44)`,
                                }}
                            >
                                <TextStyled
                                    sx={{
                                        userSelect: "none",
                                        color: `rgb(255, 255, 130)`,
                                    }}
                                >
                                    Coming soon!
                                </TextStyled>
                            </Box>
                        )}
                        <Box
                            sx={{
                                display: "flex",
                                p: "8px",
                                borderTop: `4px solid ${theme.border.color.primary}`,
                            }}
                        >
                            <ButtonBase
                                disableRipple
                                disableTouchRipple
                                href={href}
                                sx={{ mx: "auto" }}
                            >
                                <TextStyled
                                    onMouseEnter={() => handleHover("enter")}
                                    onMouseLeave={() => handleHover("leave")}
                                    sx={{
                                        color: theme.appbar.color,
                                        textAlign: "center",
                                        cursor: enabled ? "pointer" : "auto",
                                    }}
                                >
                                    {title}
                                </TextStyled>
                            </ButtonBase>
                        </Box>
                    </Card>
                </>
            ) : (
                <Skeleton variant="rounded" sx={rootStyle} />
            )}
        </Card>
    );
}

export default WebsiteCard;
