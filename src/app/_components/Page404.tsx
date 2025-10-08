"use client";

import { useContext, useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Component imports
import Image from "@/components/Image";
import Text from "@/components/Text";

// MUI imports
import { useTheme, getContrastRatio } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

// Helper imports
import { WebsiteContext } from "@/app/context";

export default function Page404() {
    const theme = useTheme();

    const [n, setRandomNumber] = useState(1);

    useEffect(() => {
        setRandomNumber(getRandomInt(1, 5));
    }, []);

    const websites = useContext(WebsiteContext);
    const pathname = usePathname().split("/").slice(1)[0];
    const tags: string[] = [];
    websites.forEach(
        (website) =>
            website.enabled && tags.push(website.tag.toLocaleLowerCase())
    );

    const game = tags.includes(pathname)
        ? pathname
        : tags[getRandomInt(0, tags.length - 1)];

    const href = tags.includes(pathname) ? `/${pathname}` : "/";

    const imgURL = `${game}/emotes/error${n}`;

    return (
        <Stack
            alignItems="center"
            spacing={2}
            sx={{ mt: "96px", textAlign: "center" }}
        >
            {game && <Image src={imgURL} alt="404" size={256} />}
            <Text variant="h4">404</Text>
            <Text variant="h6">
                The page you were looking for was not recorded in Irminsul.
            </Text>
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
