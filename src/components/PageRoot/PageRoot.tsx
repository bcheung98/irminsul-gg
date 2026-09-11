// MUI imports
import Stack from "@mui/material/Stack";
import Grid, { GridProps } from "@mui/material/Grid";
import Box from "@mui/material/Box";

export type PageNode = React.ReactNode | React.ReactNode[] | undefined;
export type PageColumnSize = GridProps["size"];

export interface PageRootProps {
    header?: PageNode;
    leftColumn?: PageNode;
    rightColumn?: PageNode;
    children?: PageNode;
    columnSizes?: [PageColumnSize, PageColumnSize];
}

function PageComponents({ elements }: { elements: PageNode }) {
    return Array.isArray(elements)
        ? elements.map((element, index) => <Box key={index}>{element}</Box>)
        : elements;
}

export function GamePageRoot({
    header,
    leftColumn,
    rightColumn,
    children,
    columnSizes = [
        { xs: 12, lg: 6 },
        { xs: 12, lg: 6 },
    ],
}: PageRootProps) {
    const [sizeLeft, sizeRight] = columnSizes;

    return (
        <Stack spacing={3} sx={{ pt: 2 }}>
            <PageComponents elements={header} />
            {(leftColumn || rightColumn) && (
                <Grid container spacing={3}>
                    {leftColumn && (
                        <Grid size={sizeLeft}>
                            <Stack spacing={2}>
                                <PageComponents elements={leftColumn} />
                            </Stack>
                        </Grid>
                    )}
                    {rightColumn && (
                        <Grid size={sizeRight}>
                            <Stack spacing={2}>
                                <PageComponents elements={rightColumn} />
                            </Stack>
                        </Grid>
                    )}
                </Grid>
            )}
            {children && <PageComponents elements={children} />}
        </Stack>
    );
}

export function InfoPageRoot({
    header,
    leftColumn,
    rightColumn,
    children,
    columnSizes = [4, "grow"],
}: PageRootProps) {
    const [sizeLeft, sizeRight] = columnSizes;

    return (
        <Stack spacing={2} sx={{ pt: 2 }}>
            <PageComponents elements={header} />
            {(leftColumn || rightColumn) && (
                <Grid container spacing={2}>
                    {leftColumn && (
                        <Grid size={sizeLeft}>
                            <Stack spacing={2}>
                                <PageComponents elements={leftColumn} />
                            </Stack>
                        </Grid>
                    )}
                    {rightColumn && (
                        <Grid size={sizeRight}>
                            <Stack spacing={2}>
                                <PageComponents elements={rightColumn} />
                            </Stack>
                        </Grid>
                    )}
                </Grid>
            )}
            <PageComponents elements={children} />
        </Stack>
    );
}
