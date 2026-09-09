// Component imports
import ContentBox from "@/components/ContentBox";
import PopularPagesList from "./PopularPagesList";

// Helper imports
import { usePopularPages } from "./PopularPages.hooks";

export default function PopularPages() {
    const { pages, error, isLoading } = usePopularPages();

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
