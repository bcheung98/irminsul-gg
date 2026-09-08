// Component imports
import StatusIndicator from "@/components/StatusIndicator";

// Helper imports
import { useDataUpdateAvailable } from "./DataStatus.hooks";

export default function DataStatus() {
    const { data, error, updateAvailable } = useDataUpdateAvailable();

    return (
        <StatusIndicator
            data={data}
            error={error}
            updateAvailable={updateAvailable}
        />
    );
}
