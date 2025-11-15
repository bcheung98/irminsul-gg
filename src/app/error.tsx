"use client";

import { useEffect } from "react";

// Component imports
import Text from "@/components/Text";
import DiscordButton from "@/components/DiscordButton";

// MUI imports
import { alpha, useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Dropdown from "@/components/Dropdown";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    const theme = useTheme();

    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <Stack alignItems="center" spacing={6} sx={{ mt: { xs: 2, md: 12 } }}>
            <Card
                sx={{
                    p: 2,
                    backgroundColor: alpha(theme.background(1), 0.75),
                    width: { xs: "90%", md: "50%" },
                }}
            >
                <Stack spacing={2}>
                    <Text variant="h4" sx={{ textAlign: "center" }}>
                        Something went wrong!
                    </Text>
                    <Text variant="h6">Here are some things you can try:</Text>
                    <Text component="span">
                        <ul>
                            <li>
                                Click{" "}
                                <span
                                    onClick={() => {
                                        console.clear();
                                        reset();
                                    }}
                                    style={{
                                        color: theme.text.selected,
                                        textDecoration: "underline",
                                        cursor: "pointer",
                                    }}
                                >
                                    here
                                </span>{" "}
                                to try and reload the segment.
                            </li>{" "}
                            <li>
                                Refresh the browser's cache by pressing{" "}
                                <u>Ctrl + F5</u> (Windows) or{" "}
                                <u>Cmd + Shift + R</u> (Mac).
                            </li>
                            <li>
                                Clear your local storage (this will reset your
                                settings and any data in planners).
                            </li>
                        </ul>
                    </Text>
                    <Text>
                        If all else fails, please let me know on Discord!
                    </Text>
                    <Box sx={{ width: "192px" }}>
                        <DiscordButton />
                    </Box>
                    <Dropdown title="View error details" contentPadding="16px">
                        <Card sx={{ px: 2, overflow: "auto" }}>
                            <Text variant="body2" component="span">
                                <pre>
                                    <code style={{ color: theme.text.primary }}>
                                        {error.stack || error.message}
                                    </code>
                                </pre>
                            </Text>
                        </Card>
                    </Dropdown>
                </Stack>
            </Card>
        </Stack>
    );
}
