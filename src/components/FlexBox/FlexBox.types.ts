import { BoxProps } from "@mui/material/Box";

export interface FlexBoxProps extends BoxProps {
    wrap?: boolean | "reverse";
    spacing?: FlexBoxSpacing | [FlexBoxSpacing, FlexBoxSpacing];
    // rowSpacing?: FlexBoxSpacing;
    // columnSpacing?: FlexBoxSpacing;
}

export type FlexBoxWrap = BoxProps["flexWrap"];
export type FlexBoxSpacing = BoxProps["gap"];
