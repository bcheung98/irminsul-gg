import { useRef } from "react";
import useSWR from "swr";
import { getAppDetails } from "@/api";

const APP_DETAILS_URL = "https://api.irminsul.gg/v2/_app/app-details.json";
const DATA_DETAILS_URL = "https://api.irminsul.gg/v2/_app/manifest.json";
const REFRESH_INTERVAL = 60_000;

export interface AppDetails {
    env: string;
    jobId: string;
    commitId: string;
    branch: string;
    lastDeployTime: string;
}

export interface DataDetails {
    revision: string;
    files: Record<string, string | null>;
}

export function useAppUpdateAvailable() {
    const { data, error, isValidating } = useSWR<AppDetails>(
        APP_DETAILS_URL,
        getAppDetails,
        {
            refreshInterval: REFRESH_INTERVAL,
            revalidateOnFocus: true,
        },
    );

    const currentBuildId = process.env.NEXT_PUBLIC_BUILD_ID ?? "dev";
    const currentCommitId = process.env.NEXT_PUBLIC_COMMIT_ID ?? "dev";
    const updateAvailable =
        !!data &&
        currentCommitId !== "dev" &&
        data.commitId !== currentCommitId;

    return {
        data,
        error,
        isValidating,
        currentBuildId,
        currentCommitId,
        updateAvailable,
    };
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
