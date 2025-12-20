// MUI imports
import Stack from "@mui/material/Stack";
import Grid, { GridProps } from "@mui/material/Grid";
import Box from "@mui/material/Box";

type Node = React.ReactNode | React.ReactNode[] | undefined;
type Size = GridProps["size"];

export interface InfoPageRootProps {
    header?: Node;
    leftColumn?: Node;
    rightColumn?: Node;
    children?: Node;
    columnSizes?: [Size, Size];
}

export default function InfoPageRoot({
    header,
    leftColumn,
    rightColumn,
    children,
    columnSizes = [4, "grow"],
}: InfoPageRootProps) {
    const [sizeLeft, sizeRight] = columnSizes;

    const renderElements = (elements: Node) => {
        return Array.isArray(elements)
            ? elements.map((element, index) => <Box key={index}>{element}</Box>)
            : elements;
    };

    return (
        <Stack spacing={2} sx={{ pt: 2 }}>
            {renderElements(header)}
            {(leftColumn || rightColumn) && (
                <Grid container spacing={2}>
                    {leftColumn && (
                        <Grid size={sizeLeft}>
                            <Stack spacing={2}>
                                {renderElements(leftColumn)}
                            </Stack>
                        </Grid>
                    )}
                    {rightColumn && (
                        <Grid size={sizeRight}>
                            <Stack spacing={2}>
                                {renderElements(rightColumn)}
                            </Stack>
                        </Grid>
                    )}
                </Grid>
            )}
            {renderElements(children)}
        </Stack>
    );
}
