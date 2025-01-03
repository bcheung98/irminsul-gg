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

    const { title, tag, enabled, gameVersion, imgTransform } = site;
    const scale = imgTransform?.scale || 1;
    const translate = imgTransform?.translate || [0, 0];

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
                zoom: 1.075,
                translate: `translate(${translate[0]}px, ${translate[1]}px`,
            });
    };

    const rootStyle: SxProps = {
        position: "relative",
        overflow: "visible",
        width: "100%",
        height: "auto",
        borderRadius: borderRadius,
        background: theme.appbar.backgroundColor,
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
                                    fallbackSrc={`https://assets.irminsul.gg/main/wallpapers/${tagLower}/${tag}.png`}
                                    alt={tag}
                                    id={`${id}-img`}
                                    style={imageStyle}
                                />
                            </ButtonBase>
                        </Box>
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
                                    <br />
                                    {!enabled && "(Coming soon!)"}
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
