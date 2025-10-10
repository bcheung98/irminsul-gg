import { TypographyVariant } from "@mui/material/styles";

export interface HeaderProps {
    dense?: boolean;
    padding?: string | number;
    backgroundColor?: string;
    textVariant?: TypographyVariant;
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
}
