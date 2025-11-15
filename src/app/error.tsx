"use client";

import { useEffect } from "react";

// Component imports
import Image from "@/components/Image";
import Text from "@/components/Text";

// MUI imports
import { alpha, useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
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
        <Stack alignItems="center" spacing={6} sx={{ mt: "96px" }}>
            <Card
                sx={{
                    p: 3,
                    backgroundColor: alpha(theme.background(1), 0.75),
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
                                Hard reload the page to refresh the browser's
                                cache.
                            </li>
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
                            </li>
                            <li>
                                Clear your local storage (this will reset your
                                settings).
                            </li>
                        </ul>
                    </Text>
                    <Text>
                        If all else fails, please let me know on Discord!
                    </Text>
                    <Dropdown title="View error" contentPadding="16px">
                        <Card sx={{ px: 2 }}>
                            <Text variant="subtitle1" component="span">
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
            <Image src={`genshin/emotes/error1`} size={256} />
        </Stack>
    );
}
