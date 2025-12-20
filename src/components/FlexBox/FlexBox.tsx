import Box from "@mui/material/Box";
import { FlexBoxProps, FlexBoxSpacing, FlexBoxWrap } from "./FlexBox.types";

export default function FlexBox({ children, sx, spacing, wrap }: FlexBoxProps) {
    let flexWrap: FlexBoxWrap;
    if (!wrap) flexWrap = "nowrap";
    else if (wrap) flexWrap = "wrap";
    else if (wrap === "reverse") flexWrap = "wrap-reverse";
    else flexWrap = wrap;

    let rowSpacing: FlexBoxSpacing;
    let columnSpacing: FlexBoxSpacing;
    if (spacing) {
        if (Array.isArray(spacing)) {
            [rowSpacing, columnSpacing] = spacing;
        } else {
            rowSpacing = spacing;
            columnSpacing = spacing;
        }
    }
    // else {
    //     rowSpacing = rowSpacing;
    //     columnSpacing = columnSpacing;
    // }

    return (
        <Box
            display="flex"
            alignItems="center"
            flexWrap={flexWrap}
            rowGap={rowSpacing}
            columnGap={columnSpacing}
            sx={sx}
        >
            {children}
        </Box>
    );
}
