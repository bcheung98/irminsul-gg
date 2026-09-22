import { useEffect, useRef, useState } from "react";

// Component imports
import Tooltip from "@/components/Tooltip";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// Helper imports
import { combineStyles, splitJoin, zoomImageOnHover } from "@/utils";

// Type imports
import type { ImageProps } from "./Image.types";

const TOOLTIP_TIMEOUT = 300;

export default function Image({
    src,
    fallbackSrc = "_common/images/Unknown",
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
    supressLoadImageWarning = false,
    format = "png",
}: ImageProps) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));

    let [width, height]: (number | undefined)[] = [undefined, undefined];
    if (size) {
        if (Array.isArray(size)) [width, height] = size;
        else width = height = size;
        if (matches && responsive) {
            width = width - width * responsiveSize;
            height = height - height * responsiveSize;
        }
    }

    const defaultImageStyle: React.CSSProperties = {
        width: width || "auto",
        height: height || "auto",
    };

    if (!src.startsWith("https")) {
        src = `https://assets.irminsul.gg/v2/${splitJoin(src)}.${format}`;
    }

    if (!fallbackSrc.startsWith("https")) {
        fallbackSrc = `https://assets.irminsul.gg/v2/${fallbackSrc}.png`;
    }

    const imgStyle = combineStyles(defaultImageStyle, style);

    const [showTooltip, setShowTooltip] = useState(false);
    const tooltipTimeout = useRef<ReturnType<typeof setTimeout>>(null);

    const handleHover = (direction: "enter" | "leave") => {
        zoomOnHover && zoomImageOnHover({ direction, id, zoom: 1.05 });

        // Only mount tooltip when hovering over the image.
        // This prevents expensive component teardowns when
        // there are 500+ tooltips on a page.
        if (tooltipTimeout.current) {
            clearTimeout(tooltipTimeout.current);
            tooltipTimeout.current = null;
        }
        if (direction === "enter") {
            setShowTooltip(true);
        } else {
            tooltipTimeout.current = setTimeout(() => {
                setShowTooltip(false);
            }, TOOLTIP_TIMEOUT);
        }
    };

    // Clear timeout when Image unmounts
    useEffect(() => {
        return () => {
            if (tooltipTimeout.current) {
                clearTimeout(tooltipTimeout.current);
            }
        };
    }, []);

    // Set fallback image
    function onError(event: React.SyntheticEvent<HTMLImageElement>) {
        if (event.currentTarget.src === fallbackSrc) return;

        if (!supressLoadImageWarning) {
            console.warn(`Failed to load image ${src}`);
        }

        event.currentTarget.src = fallbackSrc;
    }

    const image = (
        <img
            src={src}
            id={id}
            alt={alt}
            style={imgStyle}
            onError={onError}
            onClick={onClick}
            onMouseEnter={() => handleHover("enter")}
            onMouseLeave={() => handleHover("leave")}
            loading={loading}
        />
    );

    return tooltip && showTooltip ? (
        <Tooltip title={tooltip} arrow placement={tooltipArrow}>
            {image}
        </Tooltip>
    ) : (
        image
    );
}
