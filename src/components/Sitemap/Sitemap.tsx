"use client";

import { useMemo } from "react";

// Component imports
import Text from "@/components/Text";
import SitemapRouteList from "./SitemapRouteList";

// MUI imports
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

// Helper imports
import { buildRouteTree } from "./Sitemap.utils";

export default function Sitemap({ data }: { data: string }) {
    const items = useMemo(() => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, "text/xml");
        return Array.from(doc.documentElement.children).map(
            (item) =>
                `/${item.textContent!.trim().split("/").slice(3).join("/")}`,
        );
    }, [data]);

    const tree = useMemo(() => buildRouteTree(items), [items]);

    /**
     * The sitemap page itself is not included in the sitemap.xml,
     * so we need to add 1 to the total page count.
     */
    const pageCount = items.length + 1;

    return (
        <Container
            sx={{
                mt: { xs: 0, md: 12 },
                p: 2,
                backdropFilter: "blur(4px)",
                userSelect: "none",
            }}
        >
            <Stack spacing={3} sx={{ px: 4 }}>
                <Stack spacing={1}>
                    <Text variant="h4" weight="highlight">
                        Sitemap
                    </Text>
                    <Text variant="subtitle1">
                        A complete directory of every page on Irminsul.GG,
                        organized by category.
                        <br />
                        <br />
                        {`Current indexed page count: `}
                        <Text
                            component="span"
                            variant="subtitle1"
                            weight="highlight"
                        >
                            {`${pageCount.toLocaleString("en-us")}`}
                        </Text>
                        {` pages.`}
                        <br />
                        <Text
                            component="span"
                            variant="body2"
                            sx={{ fontStyle: "italic" }}
                        >
                            NOTE: it may take some time for newly added pages to
                            be listed here.
                        </Text>
                    </Text>
                </Stack>
                {items.length > 0 && (
                    <Stack spacing={2}>
                        <SitemapRouteList nodes={tree} />
                    </Stack>
                )}
            </Stack>
        </Container>
    );
}
