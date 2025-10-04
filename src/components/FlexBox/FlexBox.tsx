import Box from "@mui/material/Box";
import { FlexBoxProps, FlexBoxSpacing, FlexBoxWrap } from "./FlexBox.types";

export default function FlexBox(props: FlexBoxProps) {
    const { children, sx, ...rest } = props;

    let wrap: FlexBoxWrap;
    if (!props.wrap) wrap = "nowrap";
    else if (props.wrap) wrap = "wrap";
    else if (props.wrap === "reverse") wrap = "wrap-reverse";
    else wrap = props.wrap;

    let rowSpacing: FlexBoxSpacing;
    let columnSpacing: FlexBoxSpacing;
    if (props.spacing) {
        if (Array.isArray(props.spacing)) {
            [rowSpacing, columnSpacing] = props.spacing;
        } else {
            rowSpacing = props.spacing;
            columnSpacing = props.spacing;
        }
    }
    // else {
    //     rowSpacing = props.rowSpacing;
    //     columnSpacing = props.columnSpacing;
    // }

    return (
        <Box
            display="flex"
            alignItems="center"
            flexWrap={wrap}
            rowGap={rowSpacing}
            columnGap={columnSpacing}
            sx={sx}
            {...rest}
        >
            {children}
        </Box>
    );
}
