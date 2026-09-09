import useSWR from "swr";
import { getPopularPages } from "@/api";
import { PopularPagesResponse } from "@/types";

const POPULAR_PAGES_URL = "https://api.irminsul.gg/v2/_app/popular-pages.json";
const REFRESH_INTERVAL = 120_000;

export function usePopularPages() {
    const { data, error, isLoading, isValidating } =
        useSWR<PopularPagesResponse>(POPULAR_PAGES_URL, getPopularPages, {
            refreshInterval: REFRESH_INTERVAL,
            revalidateOnFocus: true,
        });
    return { pages: data?.pages, error, isLoading, isValidating };
}
