import { CSSProperties, SyntheticEvent } from "react";
import { default as NextImage } from "next/image";

// Component imports
import Tooltip from "@/components/Tooltip";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// Helper imports
import { combineStyles, zoomImageOnHover } from "@/utils";

// Type imports
import { ImageProps } from "./Image.types";

export default function Image({
    src,
    fallbackSrc = "main/images/Unknown",
    size,
    alt = "",
    id = src,
    loading = "lazy",
    style,
    tooltip = "",
    tooltipArrow = "top",
    zoomOnHover = false,
    responsive = false,
    responsiveSize = 0.125,
    onClick,
    useNext = false,
}: ImageProps) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));

    let fill = false;
    let [width, height]: (number | undefined)[] = [undefined, undefined];
    if (size) {
        if (Array.isArray(size)) [width, height] = size;
        else width = height = size;
        if (matches && responsive) {
            width = width - width * responsiveSize;
            height = height - height * responsiveSize;
        }
    } else {
        fill = true;
    }

    const defaultImageStyle: CSSProperties = {
        width: width || "auto",
        height: height || "auto",
    };

    if (!src.startsWith("https")) {
        src = `https://assets.irminsul.gg/${src.split(" ").join("_")}.png`;
    }

    const imgStyle = combineStyles(defaultImageStyle, style);

    const handleHover = (direction: "enter" | "leave") => {
        zoomOnHover && zoomImageOnHover({ direction, id, zoom: 1.05 });
    };

    function onError(event: SyntheticEvent<HTMLImageElement, Event>) {
        console.warn(`Failed to load image ${src}`);
        event.currentTarget.src = `https://assets.irminsul.gg/${fallbackSrc}.png`;
        onerror = null;
    }

    return (
        <Tooltip title={tooltip} arrow placement={tooltipArrow}>
            {useNext ? (
                <NextImage
                    src={src}
                    alt={alt}
                    id={id}
                    width={width}
                    height={height}
                    fill={fill}
                    style={style}
                    onError={onError}
                    onClick={onClick}
                    onMouseEnter={() => handleHover("enter")}
                    onMouseLeave={() => handleHover("leave")}
                    loading={loading}
                />
            ) : (
                <img
                    src={src}
                    alt={alt}
                    id={id}
                    style={imgStyle}
                    onError={onError}
                    onClick={onClick}
                    onMouseEnter={() => handleHover("enter")}
                    onMouseLeave={() => handleHover("leave")}
                    loading={loading}
                />
            )}
        </Tooltip>
    );
}
