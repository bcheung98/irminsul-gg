import { TypographyProps } from "@mui/material/Typography";
import { BoxProps } from "@mui/system/Box";
import { StackProps } from "@mui/system/Stack";

export interface HeaderProps {
    dense?: boolean;
    padding?: BoxProps["padding"];
    gap?: StackProps["spacing"];
    backgroundColor?: string;
    textVariant?: TypographyProps["variant"];
    justifyContent?: StackProps["justifyContent"];
}

export interface ContentProps {
    padding?: string | number;
    backgroundColor?: string;
    overflowX?: "visible" | "hidden" | "clip" | "scroll" | "auto";
}

export interface ContentBoxProps {
    component?: React.ElementType;
    children?: React.ReactNode;
    header?: string | React.ReactNode;
    actions?: React.ReactNode;
    headerProps?: HeaderProps;
    contentProps?: ContentProps;
    elevation?: number;
}
