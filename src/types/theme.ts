export type Shade = "main" | "light" | "dark";

export type ColorVariants =
    | "primary"
    | "secondary"
    | "tertiary"
    | "error"
    | "warning"
    | "info"
    | "success";

export interface BreakpointValues {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
}
