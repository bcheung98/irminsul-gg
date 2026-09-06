import useSWR from "swr";

// Component imports
import ContentBox from "@/components/ContentBox";
import PopularPagesList from "./PopularPagesList";

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
        <ContentBox header="Popular Pages">
            <PopularPagesList
                pages={pages}
                error={error}
                isLoading={isLoading}
            />
        </ContentBox>
    );
}
