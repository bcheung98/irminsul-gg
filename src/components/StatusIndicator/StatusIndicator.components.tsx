import { useEffect } from "react";

// Component imports
import Text from "@/components/Text";
import FlexBox from "@/components/FlexBox";
import StatusIndicator from "./StatusIndicator";

// MUI imports
import { useTheme, keyframes } from "@mui/material/styles";
import Snackbar from "@mui/material/Snackbar";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

// Helper imports
import {
    useAppUpdateAvailable,
    useDataUpdateAvailable,
} from "./StatusIndicator.hooks";

export function AppStatus() {
    const { data, error, updateAvailable } = useAppUpdateAvailable();

    return (
        <StatusIndicator
            data={data}
            error={error}
            updateAvailable={updateAvailable}
        />
    );
}

export function DataStatus() {
    const { data, error, updateAvailable } = useDataUpdateAvailable();

    return (
        <StatusIndicator
            data={data}
            error={error}
            updateAvailable={updateAvailable}
        />
    );
}

export function StatusAlert({ open }: { open?: boolean }) {
    const theme = useTheme();

    const handleRefresh = () => {
        const channel = new BroadcastChannel("irminsul-update");
        channel.postMessage("reload");
        channel.close();
        window.location.reload();
    };

    useEffect(() => {
        const channel = new BroadcastChannel("irminsul-update");
        channel.addEventListener("message", (event) => {
            if (event.data === "reload") {
                window.location.reload();
            }
        });
        return () => channel.close();
    }, []);

    return (
        <Snackbar
            open={open}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
            }}
            sx={{
                animation: `${keyframes`
                    0% { padding-bottom: 16px; }
                    5% { padding-bottom: 24px; }
                    10% { padding-bottom: 16px; }
                    11%, 100% { padding-bottom: 16px; }
                `} 5s cubic-bezier(.07, 2.67, .67, 1.67) infinite`,
            }}
        >
            <Card
                sx={{
                    px: 4,
                    py: 2,
                    outline: `1px solid ${theme.palette.warning.light}`,
                    borderRadius: theme.contentBox.border.radius,
                    animation: `${keyframes`
                        0%, 100% {
                            outline-color: ${theme.palette.warning.light};
                        }
                        50% {
                            outline-color: ${theme.palette.warning.main};
                        }
                    `} 1s cubic-bezier(0, 0, 0.2, 1) infinite`,
                }}
            >
                <FlexBox spacing={4}>
                    <FlexBox spacing={2}>
                        <InfoOutlinedIcon sx={{ color: theme.text.primary }} />
                        <Stack>
                            <Text variant="subtitle1" weight="highlight">
                                Updates are available
                            </Text>
                            <Text
                                variant="body2"
                                weight="highlight"
                                sx={{ color: theme.text.description }}
                            >
                                Refresh to get the latest content
                            </Text>
                        </Stack>
                    </FlexBox>
                    <Button
                        size="small"
                        variant="contained"
                        color="info"
                        onClick={handleRefresh}
                    >
                        <Text
                            component="span"
                            variant="subtitle2"
                            weight="highlight"
                        >
                            Refresh
                        </Text>
                    </Button>
                </FlexBox>
            </Card>
        </Snackbar>
    );
}
