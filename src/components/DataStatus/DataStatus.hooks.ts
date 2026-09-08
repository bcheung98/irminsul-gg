import { useRef } from "react";
import useSWR from "swr";
import { getAppDetails } from "@/api";

const DATA_DETAILS_URL = "https://api.irminsul.gg/v2/_app/manifest.json";
const REFRESH_INTERVAL = 60_000;

export interface DataDetails {
    revision: string;
    files: Record<string, string | null>;
}

export function useDataUpdateAvailable() {
    const initialUpdatedAt = useRef<string | null>(null);

    const { data, error, isValidating } = useSWR<DataDetails>(
        DATA_DETAILS_URL,
        getAppDetails,
        {
            refreshInterval: REFRESH_INTERVAL,
            revalidateOnFocus: true,
        },
    );

    if (data && initialUpdatedAt.current === null) {
        initialUpdatedAt.current = data.revision;
    }

    const updateAvailable =
        initialUpdatedAt.current !== null &&
        data?.revision !== initialUpdatedAt.current;

    return {
        data,
        error,
        isValidating,
        updateAvailable,
    };
}
