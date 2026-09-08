// Component imports
import StatusIndicator from "@/components/StatusIndicator";

// Helper imports
import { useAppUpdateAvailable } from "./AppStatus.hooks";

export default function AppStatus() {
    const { data, error, currentBuildId, updateAvailable } =
        useAppUpdateAvailable();

    return (
        <StatusIndicator
            data={data}
            error={error}
            currentBuildId={currentBuildId}
            updateAvailable={updateAvailable}
        />
    );
}
