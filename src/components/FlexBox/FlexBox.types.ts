import { BoxProps } from "@mui/material/Box";
import { SxProps, Theme } from "@mui/material/styles";

export interface FlexBoxProps extends BoxProps {
    children?: React.ReactNode;
    sx?: SxProps<Theme>;
    wrap?: boolean | "reverse";
    spacing?: FlexBoxSpacing | [FlexBoxSpacing, FlexBoxSpacing];
    // rowSpacing?: FlexBoxSpacing;
    // columnSpacing?: FlexBoxSpacing;
}

export type FlexBoxWrap = BoxProps["flexWrap"];
export type FlexBoxSpacing = BoxProps["gap"];
