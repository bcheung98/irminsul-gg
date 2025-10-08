import { CSSProperties } from "react";

// Component imports
import Image from "@/components/Image";
import NavLink from "@/components/NavLink";
import Text from "@/components/Text";

// MUI imports
import { useTheme, SxProps } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import ButtonBase from "@mui/material/ButtonBase";

// Helper imports
import { zoomImageOnHover } from "@/helpers/utils";

// Type imports
import { Website } from "@/types/website";

export default function WebsiteCard({ website }: { website: Website }) {
    const theme = useTheme();

    const borderRadius = "16px";

    const { title, tag, enabled, gameVersion } = website;
    const scale = 1;
    const translate = [0, 0];

    const tagLower = tag.toLowerCase();

    const id = `${tag.split(" ").join("")}-websiteCard`;

    const href = enabled ? `/${tagLower}` : "";
    const imgSrc = `main/wallpapers/${tagLower}/${tag}_${gameVersion}`;

    const handleHover = (direction: "enter" | "leave") => {
        if (enabled) {
            zoomImageOnHover({
                direction,
                id: `${id}-img`,
                baseScale: scale,
                zoom: 1.0325,
                translate: `translate(${translate[0]}px, ${translate[1]}px`,
            });
        }
    };

    const rootStyle: SxProps = {
        position: "relative",
        overflow: "visible",
        width: "100%",
        height: "auto",
        borderRadius: borderRadius,
        background: `linear-gradient(to bottom, transparent, ${theme.infoCard.backgroundColor.main} 50%)`,
    };

    const cardStyle: SxProps = {
        borderRadius: borderRadius,
        backgroundColor: "transparent",
    };

    const imageContainerStyle: SxProps = {
        position: "relative",
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
            <ButtonBase href={href} LinkComponent={NavLink}>
                <Card
                    elevation={0}
                    sx={cardStyle}
                    onMouseEnter={() => handleHover("enter")}
                    onMouseLeave={() => handleHover("leave")}
                >
                    <Box sx={imageContainerStyle}>
                        <Image
                            src={imgSrc}
                            fallbackSrc={`main/wallpapers/${tagLower}/${tag}`}
                            alt={tag}
                            id={`${id}-img`}
                            style={imageStyle}
                        />
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            p: "8px",
                            borderTop: `4px solid ${theme.border.color.primary}`,
                        }}
                    >
                        <Box sx={{ mx: "auto" }}>
                            <Text
                                sx={{
                                    color: theme.infoCard.color.primary,
                                    textAlign: "center",
                                    cursor: enabled ? "pointer" : "auto",
                                }}
                            >
                                {title}
                            </Text>
                        </Box>
                    </Box>
                </Card>
            </ButtonBase>
        </Card>
    );
}
