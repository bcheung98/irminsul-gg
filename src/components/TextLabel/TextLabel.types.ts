import {
    CSSProperties,
    SxProps,
    TypographyVariant,
} from "@mui/material/styles";
import { ImageSize } from "../Image/Image.types";
import { StackProps } from "@mui/material/Stack";

export interface IconProps {
    size?: ImageSize;
    borderRadius?: string;
    padding?: string | number;
    tooltip?: string;
    styles?: CSSProperties;
    supressLoadImageWarning?: boolean;
    fallbackSrc?: string;
}

export interface TitleProps {
    component?: React.ElementType;
    variant?: TypographyVariant;
    color?: string;
    defaultCursor?: string;
    sx?: SxProps;
}

export interface TextLabelProps {
    icon?: string | React.ReactNode;
    iconProps?: IconProps;
    title?: string | number | React.ReactNode;
    titleProps?: TitleProps;
    subtitle?: string | number | React.ReactNode;
    subtitleProps?: TitleProps;
    spacing?: number;
    textSpacing?: number;
    href?: string;
    alignItems?: StackProps["alignItems"];
    justifyContent?: "left" | "center" | "right";
    reverse?: boolean;
}
