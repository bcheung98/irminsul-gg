import { useRef, useState } from "react";

// Component imports
import Text from "@/components/Text";
import TextLabel from "@/components/TextLabel";
import FlexBox from "@/components/FlexBox";
import {
    StatusAlert,
    AppDetails,
    DataDetails,
} from "@/components/StatusIndicator";

// MUI imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Popover from "@mui/material/Popover";

// Helper imports
import DateObject from "@/helpers/dates";
import { statusIndicatorStyles } from "./StatusIndicator.styles";

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
    const initialUpdateTime = useRef<string | null>(null);

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const handleClickOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);

    let type: "app" | "data";

    const styles = statusIndicatorStyles(
        !data || error ? "error" : updateAvailable ? "warning" : "success",
    );

    const StatusDot = (
        <FlexBox sx={styles.dotRoot()}>
            <Box sx={styles.dotInner()} />
            <Box sx={styles.dotOuter()} />
        </FlexBox>
    );

    if (!data || error) {
        return (
            <Card sx={styles.indicatorRoot()}>
                <TextLabel
                    title={
                        error?.message || `Could not get latest data details`
                    }
                    titleProps={{ variant: "subtitle2" }}
                    icon={StatusDot}
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
    if ("jobId" in data) {
        type = "app";
        lastUpdateTime = formatDate(data.lastDeployTime);
    } else {
        type = "data";
        lastUpdateTime = formatDate(data.revision);
    }
    if (initialUpdateTime.current === null) {
        initialUpdateTime.current = lastUpdateTime;
    }

    return (
        <>
            <Box onClick={handleClickOpen}>
                <Card sx={styles.indicatorRoot()}>
                    <TextLabel
                        title={`${type === "app" ? "Build" : "Data"}: ${updateAvailable ? "Update available" : "Up to date"}`}
                        titleProps={{ variant: "subtitle2" }}
                        icon={StatusDot}
                        alignItems="baseline"
                        spacing={1}
                    />
                </Card>
            </Box>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
            >
                <Card sx={{ p: 2 }}>
                    {type === "app" && (
                        <Text variant="subtitle2" weight="highlight">
                            {`${
                                process.env.NEXT_PUBLIC_BUILD_ID ||
                                process.env.NODE_ENV === "production"
                                    ? "Prod"
                                    : "Dev"
                            } Build #${process.env.NEXT_PUBLIC_BUILD_ID || "dev"}`}
                        </Text>
                    )}
                    <Text variant="subtitle2" weight="highlight">
                        {`Last updated: ${initialUpdateTime.current}`}
                    </Text>
                </Card>
            </Popover>
            <StatusAlert open={updateAvailable} />
        </>
    );
}
