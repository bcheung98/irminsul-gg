import useSWR from "swr";
import { getAppDetails } from "@/api";

const APP_DETAILS_URL = "https://api.irminsul.gg/v2/_app/app-details.json";
const REFRESH_INTERVAL = 60_000;

export interface AppDetails {
    env: string;
    jobId: string;
    commitId: string;
    branch: string;
    lastDeployTime: string;
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
