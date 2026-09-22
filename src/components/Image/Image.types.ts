import type { TooltipProps } from "@mui/material/Tooltip";

export type ImageSize = number | [number, number];
export type ImageLoadStatus = "loading" | "loaded" | "failed";

export interface ImageProps {
    src: string;
    fallbackSrc?: string | string[];
    size?: ImageSize;
    alt?: string;
    id?: string;
    loading?: "lazy" | "eager";
    fadeOnLoad?: boolean;
    style?: React.CSSProperties;
    tooltip?: React.ReactNode;
    tooltipArrow?: TooltipProps["placement"];
    zoomOnHover?: boolean;
    responsive?: boolean;
    responsiveSize?: number;
    onClick?: () => void;
    supressLoadImageWarning?: boolean;
    format?: "png" | "gif" | "webp";
}
