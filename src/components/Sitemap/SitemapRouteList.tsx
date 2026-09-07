import { useState, useCallback } from "react";

// Component imports
import FlexBox from "@/components/FlexBox";
import PopularPagesLabel from "@/components/PopularPages/PopularPagesLabel";
import { List, RowComponentProps } from "react-window";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import ButtonBase from "@mui/material/ButtonBase";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Helper imports
import { games } from "@/data/games";
import { isLeafList, RouteNode } from "./Sitemap.utils";

// Helper imports
import { Game } from "@/types";

const ROW_HEIGHT = 56;

export default function SitemapRouteList({ nodes }: { nodes: RouteNode[] }) {
    if (isLeafList(nodes)) {
        return <VirtualRouteList nodes={nodes} />;
    }

    return (
        <Stack spacing={2} divider={<Divider />}>
            {nodes.map((node) => (
                <RouteItem key={node.path} node={node} />
            ))}
        </Stack>
    );
}

function RouteItem({ node }: { node: RouteNode }) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("sm"));

    const { path, children } = node;

    const [open, setOpen] = useState(
        !path.includes("/blog") && path.split("/").length === 2,
        // false,
    );
    const toggleDropdownState = () => {
        setOpen(!open);
    };

    return (
        <Stack spacing={2}>
            <FlexBox
                sx={{
                    alignItems: "center",
                    justifyContent: "space-between",
                    px: { xs: 0, md: 1 },
                }}
            >
                <PopularPagesLabel page={{ path, views: children.length }} />
                {children.length > 0 && (
                    <ButtonBase disableRipple onClick={toggleDropdownState}>
                        <ExpandMoreIcon
                            fontSize={matches ? "medium" : "small"}
                            sx={{
                                color:
                                    games[path.split("/")[1] as Game]?.color ||
                                    theme.border.color.accent,
                                transform: open
                                    ? `rotateZ(0deg)`
                                    : `rotateZ(-90deg)`,
                                transition: "transform 0.25s",
                            }}
                        />
                    </ButtonBase>
                )}
            </FlexBox>
            {children.length > 0 && (
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <Stack sx={{ px: { xs: 1, md: 4 } }}>
                        <SitemapRouteList nodes={children} />
                    </Stack>
                </Collapse>
            )}
        </Stack>
    );
}

function VirtualRouteList({ nodes }: { nodes: RouteNode[] }) {
    const rowKey = useCallback((index: number) => nodes[index].path, [nodes]);

    return (
        <List
            rowCount={nodes.length}
            rowHeight={ROW_HEIGHT}
            rowComponent={VirtualRouteRow}
            rowProps={{ nodes }}
            rowKey={rowKey}
            style={{
                height: Math.min(nodes.length * ROW_HEIGHT, 600),
                width: "100%",
                scrollbarWidth: "thin",
                scrollbarGutter: "stable",
            }}
            overscanCount={10}
        />
    );
}

function VirtualRouteRow({
    index,
    style,
    nodes,
}: RowComponentProps<{ nodes: RouteNode[] }>) {
    const node = nodes[index];

    return (
        <div style={style}>
            <FlexBox
                sx={(theme) => ({
                    height: "100%",
                    alignItems: "center",
                    mx: 1,
                    borderBottom:
                        index < nodes.length - 1
                            ? `1px solid ${theme.border.color.primary}`
                            : 0,
                })}
            >
                <PopularPagesLabel page={{ path: node.path, views: 0 }} />
            </FlexBox>
        </div>
    );
}
