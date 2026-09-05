import useSWR from "swr";

// Component imports
import ContentBox from "@/components/ContentBox";
import PopularPagesList from "./PopularPagesList";

// MUI imports
import Container from "@mui/material/Container";

// Helper imports
import { getPopularPages } from "@/api";

export default function PopularPages() {
    const { data, error, isLoading } = useSWR(
        "popular-pages",
        getPopularPages,
        {
            revalidateOnFocus: false,
            revalidateOnReconnect: false,
            dedupingInterval: 5 * 60 * 1000,
        },
    );

    const pages = data?.pages ?? [];

    return (
        <Container maxWidth="sm" disableGutters sx={{ px: 6 }}>
            <ContentBox header="Popular Pages">
                <PopularPagesList
                    pages={pages}
                    error={error}
                    isLoading={isLoading}
                />
            </ContentBox>
        </Container>
    );
}
