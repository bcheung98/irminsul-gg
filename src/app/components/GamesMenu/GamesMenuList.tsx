import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";

// Component imports
import { Text } from "@/components/Text";

// MUI imports
import MenuItem from "@mui/material/MenuItem";

// Type imports
import { Website } from "@/types/website";

const url = "https://api.irminsul.gg/main/websites.json";
const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function GamesMenuList() {
    const { data, error, isLoading } = useSWR(url, fetcher);

    if (isLoading) return <></>;
    if (error) return <>Error: {error.message}</>;

    const websites: Website[] = [];
    data.forEach((website: Website) => {
        website.enabled && websites.push(website);
    });

    return websites
        .sort((a, b) => a.title.localeCompare(b.title))
        .map((website, index) => (
            <MenuItem key={index} disableRipple sx={{ gap: "16px" }}>
                <Image
                    src={`https://assets.irminsul.gg/main/game-icons/${website.tag}.png`}
                    alt={website.title}
                    width={32}
                    height={32}
                    style={{ borderRadius: "4px" }}
                />
                <Text variant="subtitle1">{website.title}</Text>
            </MenuItem>
        ));
}
