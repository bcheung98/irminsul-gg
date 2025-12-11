import { CSSProperties, SxProps } from "@mui/material/styles";
import { ImageSize } from "@/components/Image/Image.types";
import { StackProps } from "@mui/material/Stack";
import { TextWeight } from "../Text/Text";
import { TypographyProps } from "@mui/material/Typography";

export interface IconProps {
    size?: ImageSize;
    borderRadius?: string;
    padding?: string | number;
    tooltip?: string;
    styles?: CSSProperties;
    supressLoadImageWarning?: boolean;
    fallbackSrc?: string;
    format?: "png" | "gif" | "webp";
}

export interface TitleProps {
    component?: React.ElementType;
    variant?: TypographyProps["variant"];
    weight?: TextWeight;
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
