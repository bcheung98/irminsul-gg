// Component imports
import Text from "@/components/Text";
import PopularPagesLabel from "./PopularPagesLabel";

// MUI imports
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";

// Helper imports
import { range } from "@/utils";

// Type imports
import { PopularPageData } from "@/types";

const MAX_PAGE_LIMIT = 10;

export default function PopularPagesList({
    pages,
    error,
    isLoading,
}: {
    pages?: PopularPageData[];
    error: any;
    isLoading: boolean;
}) {
    if (error || !pages)
        return (
            <Text variant="h6" weight="highlight">
                Error fetching popular pages
            </Text>
        );

    if (isLoading) {
        return (
            <Stack spacing={2}>
                {range(MAX_PAGE_LIMIT).map((i) => (
                    <Skeleton
                        key={i}
                        variant="rounded"
                        height={32}
                        sx={(theme) => ({
                            backgroundColor: theme.background(0),
                        })}
                    />
                ))}
            </Stack>
        );
    }

    return (
        <Stack spacing={2}>
            {pages.slice(0, MAX_PAGE_LIMIT).map((page) => (
                <PopularPagesLabel key={page.path} page={page} />
            ))}
        </Stack>
    );
}
