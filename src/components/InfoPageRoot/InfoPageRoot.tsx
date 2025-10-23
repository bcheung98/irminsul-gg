// MUI imports
import Stack from "@mui/material/Stack";
import Grid, { GridProps } from "@mui/material/Grid";
import Box from "@mui/material/Box";

type Size = GridProps["size"];

export interface InfoPageRootProps {
    header?: React.ReactNode;
    leftColumn?: React.ReactNode[];
    rightColumn?: React.ReactNode[];
    children?: React.ReactNode;
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

    return (
        <Stack spacing={2}>
            {header}
            {(leftColumn || rightColumn) && (
                <Grid container spacing={2}>
                    {leftColumn && (
                        <Grid size={sizeLeft}>
                            <Stack spacing={2}>
                                {leftColumn.map((element, index) => (
                                    <Box key={index}>{element}</Box>
                                ))}
                            </Stack>
                        </Grid>
                    )}
                    {rightColumn && (
                        <Grid size={sizeRight}>
                            <Stack spacing={2}>
                                {rightColumn.map((element, index) => (
                                    <Box key={index}>{element}</Box>
                                ))}
                            </Stack>
                        </Grid>
                    )}
                </Grid>
            )}
            {children}
        </Stack>
    );
}
