// Component imports
import Text from "@/components/Text";
import TextLabel from "@/components/TextLabel";
import Tooltip from "@/components/Tooltip";
import StatusAlert from "./StatusAlert";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";

// Helper imports
import DateObject from "@/helpers/dates";

// Type imports
import { AppDetails } from "@/components/AppStatus/AppStatus.hooks";
import { DataDetails } from "@/components/DataStatus/DataStatus.hooks";

export default function StatusIndicator({
    data,
    error,
    currentBuildId,
    updateAvailable,
}: {
    data?: AppDetails | DataDetails;
    error?: any;
    currentBuildId?: string;
    updateAvailable?: boolean;
}) {
    const theme = useTheme();

    let type: "app" | "data";

    if (!data || error) {
        return (
            <Card
                sx={{
                    px: 2,
                    py: 0.5,
                    outline: `1px solid ${theme.palette.error.main}`,
                    userSelect: "none",
                }}
            >
                <TextLabel
                    title={
                        error?.message || `Could not get latest build details`
                    }
                    titleProps={{ variant: "subtitle2" }}
                    icon={
                        <Box
                            sx={{
                                backgroundColor: theme.palette.error.main,
                                width: "8px",
                                height: "8px",
                                borderRadius: "64px",
                            }}
                        />
                    }
                    alignItems="baseline"
                    spacing={1}
                />
            </Card>
        );
    }

    const formatDate = (date: string) =>
        new DateObject(date.split(".")[0].split("T").join(" ") + " UTC+0")
            .timeString;

    let lastUpdateTime = "";
    let tooltip = <></>;
    if ("jobId" in data) {
        type = "app";
        lastUpdateTime = formatDate(data.lastDeployTime);
        const build =
            process.env.NEXT_PUBLIC_BUILD_ID ||
            process.env.NODE_ENV === "production"
                ? "Prod"
                : "Dev";
        tooltip = (
            <Text variant="subtitle2" weight="highlight">
                {`Last build update: ${lastUpdateTime}`}
                <br />
                {`${build} Build #${currentBuildId}`}
            </Text>
        );
    } else {
        type = "data";
        lastUpdateTime = formatDate(data.revision);
        tooltip = (
            <Text variant="subtitle2" weight="highlight">
                {`Last data update: ${lastUpdateTime}`}
            </Text>
        );
    }

    const typeString = type === "app" ? "Build" : "Data";

    return (
        <>
            <Tooltip title={tooltip} arrow placement="top">
                <Card
                    sx={{
                        px: 2,
                        py: 0.5,
                        outline: `1px solid ${
                            updateAvailable
                                ? theme.palette.warning.light
                                : theme.palette.success.dark
                        }`,
                        userSelect: "none",
                    }}
                >
                    <TextLabel
                        title={`${typeString}: ${updateAvailable ? "Update available" : "Up to date"}`}
                        titleProps={{ variant: "subtitle2" }}
                        icon={
                            <Box
                                sx={{
                                    backgroundColor: updateAvailable
                                        ? theme.palette.warning.light
                                        : theme.palette.success.light,
                                    width: "8px",
                                    height: "8px",
                                    borderRadius: "64px",
                                }}
                            />
                        }
                        alignItems="baseline"
                        spacing={1}
                    />
                </Card>
            </Tooltip>
            <StatusAlert open={updateAvailable} />
        </>
    );
}
