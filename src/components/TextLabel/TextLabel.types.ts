import { TypographyVariant } from "@mui/material/styles";
import { ImageSize } from "../Image/Image.types";

export interface IconProps {
    size?: ImageSize;
    borderRadius?: string;
    padding?: string | number;
    tooltip?: string;
}

export interface TitleProps {
    variant?: TypographyVariant;
    color?: string;
    defaultCursor?: string;
}

export interface TextLabelProps {
    icon?: string | React.ReactNode;
    iconProps?: IconProps;
    title: React.ReactNode;
    titleProps?: TitleProps;
    subtitle?: React.ReactNode;
    subtitleProps?: TitleProps;
    spacing?: number;
    textSpacing?: number;
    isLink?: boolean;
}
