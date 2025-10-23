"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// Component imports
import Image from "@/components/Image";
import Text from "@/components/Text";
import FlexBox from "@/components/FlexBox";

// MUI imports
import { useTheme, getContrastRatio } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";

// Helper imports
import { useGame, useGameList, useGameTag } from "@/app/context";

export default function Page404() {
    const theme = useTheme();

    const [imgURL, setImgURL] = useState("");

    const websites = useGameList();
    const game = useGame();
    const pathname = useGameTag();

    const href = game ? `/${pathname}` : "/";

    useEffect(() => {
        const a = getRandomInt(0, websites.length - 1);
        const b = getRandomInt(1, 5);
        const tag = game ? pathname : websites[a].tag;
        setImgURL(`${tag}/emotes/error${b}`);
    }, []);

    return (
        <Stack
            alignItems="center"
            spacing={6}
            sx={{ mt: "96px", textAlign: "center" }}
        >
            <Stack spacing={2}>
                <Text variant="h4">404</Text>
                <Text variant="h6">
                    The page you were looking for was not recorded in Irminsul.
                </Text>
            </Stack>
            {imgURL ? (
                <Image src={imgURL} alt="404" size={256} />
            ) : (
                <FlexBox sx={{ height: 256 }}>
                    <CircularProgress
                        size="64px"
                        sx={{ color: theme.text.primary }}
                    />
                </FlexBox>
            )}
            <Button LinkComponent={Link} href={href} variant="contained">
                <Text
                    variant="h6"
                    sx={{
                        color:
                            getContrastRatio(
                                theme.palette.primary.main,
                                theme.text.primary
                            ) > 4.5
                                ? theme.text.primary
                                : theme.text.contrast,
                    }}
                >
                    Back to Home
                </Text>
            </Button>
        </Stack>
    );
}

function getRandomInt(min: number, max: number) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}
