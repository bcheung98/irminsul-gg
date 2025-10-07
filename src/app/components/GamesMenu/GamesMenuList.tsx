import { useContext } from "react";
import Image from "@/components/Image";
import Link from "next/link";

// Component imports
import { Text } from "@/components/Text";

// MUI imports
import MenuItem from "@mui/material/MenuItem";

// Helper imports
import { WebsiteContext } from "@/app/context";

export default function GamesMenuList() {
    const websites = useContext(WebsiteContext);

    return websites
        .sort((a, b) => a.title.localeCompare(b.title))
        .map((website, index) => (
            <MenuItem key={index} disableRipple sx={{ gap: "16px" }}>
                <Image
                    src={`https://assets.irminsul.gg/main/game-icons/${website.tag}.png`}
                    alt={website.title}
                    size={32}
                    style={{ borderRadius: "4px" }}
                />
                <Text variant="subtitle1">{website.title}</Text>
            </MenuItem>
        ));
}
