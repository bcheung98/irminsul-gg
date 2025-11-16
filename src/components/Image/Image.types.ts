import { CSSProperties } from "react";
import { TooltipProps } from "@mui/material";

export type ImageSize = number | [number, number];

export interface ImageProps {
    src: string;
    fallbackSrc?: string;
    size?: ImageSize;
    alt?: string;
    id?: string;
    loading?: "lazy" | "eager";
    style?: CSSProperties;
    tooltip?: React.ReactNode;
    tooltipArrow?: TooltipProps["placement"];
    zoomOnHover?: boolean;
    responsive?: boolean;
    responsiveSize?: number;
    onClick?: () => void;
    useNext?: boolean;
    supressLoadImageWarning?: boolean;
}
