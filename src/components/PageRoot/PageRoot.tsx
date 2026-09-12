"use client";

// Component imports
import Text from "@/components/Text";
import TextLabel from "@/components/TextLabel";

// MUI imports
import { rgbToHex, useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Grid, { GridProps } from "@mui/material/Grid";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";

// Helper imports
import { useGame } from "@/context";
import { navItems } from "@/data/navItems";
import { getContrastText } from "@/utils/getContrastText";
import { adjustColor } from "@/utils/colors";

type PageNode = React.ReactNode | React.ReactNode[] | undefined;
type PageColumnSize = GridProps["size"];

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
    const game = useGame();

    const [sizeLeft, sizeRight] = columnSizes;

    const [, item1, item2] = navItems[game.tag];

    return (
        <Stack spacing={3} sx={{ pt: 2 }}>
            <Stack spacing={2} sx={{ px: { xs: 1, lg: 0 } }}>
                <Stack spacing={0.5}>
                    <Text variant="h6" weight="highlight" component="h1">
                        {`Welcome to the ${game.name} branch of Irminsul.GG!`}
                    </Text>
                    <Text variant="subtitle1">
                        {`Explore information about ${item1.title}, ${item2.title}, banners, and more, along with useful tools for planning and keeping track of what matters to you.`}
                    </Text>
                </Stack>
                <NavButtons />
            </Stack>
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

function NavButtons() {
    const theme = useTheme();

    const game = useGame();

    return (
        <Stack spacing={1}>
            <Text variant="subtitle1" weight="highlight">
                Quick Links:
            </Text>
            <Grid
                container
                spacing={{ xs: 2, lg: 3 }}
                sx={{ alignItems: "center" }}
            >
                {navItems[game.tag].slice(1).map((item) => (
                    <Grid key={item.href} size="auto">
                        <ButtonBase
                            href={`${game.tag}/${item.href}`}
                            sx={{
                                width: "max-content",
                                height: "28px",
                                px: 2,
                                borderRadius: "4px",
                                backgroundColor: game.color,
                                "&:hover": {
                                    backgroundColor: adjustColor(
                                        rgbToHex(game.color),
                                        -0.1,
                                    ),
                                },
                                transition: "background-color 0.15s",
                            }}
                        >
                            <TextLabel
                                title={item.title}
                                titleProps={{
                                    variant: "subtitle2",
                                    color: getContrastText(
                                        theme.text.primary,
                                        game.color,
                                    ),
                                }}
                                spacing={1}
                            />
                        </ButtonBase>
                    </Grid>
                ))}
            </Grid>
        </Stack>
    );
}
