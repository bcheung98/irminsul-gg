import { TypographyVariant } from "@mui/material/styles";
import { ImageSize } from "../Image/Image.types";
import { StackProps } from "@mui/material/Stack";

export interface IconProps {
    size?: ImageSize;
    borderRadius?: string;
    padding?: string | number;
    tooltip?: string;
}

export interface TitleProps {
    component?: React.ElementType;
    variant?: TypographyVariant;
    color?: string;
    defaultCursor?: string;
}

export interface TextLabelProps {
    icon?: string | React.ReactNode;
    iconProps?: IconProps;
    title: string | number;
    titleProps?: TitleProps;
    subtitle?: string | number;
    subtitleProps?: TitleProps;
    spacing?: number;
    textSpacing?: number;
    isLink?: boolean;
    alignItems?: StackProps["alignItems"];
    justifyContent?: StackProps["justifyContent"];
}
