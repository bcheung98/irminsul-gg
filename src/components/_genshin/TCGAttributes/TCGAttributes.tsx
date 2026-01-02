import parse from "html-react-parser";

// Component imports
import FlexBox from "@/components/FlexBox";
import InfoChip from "@/components/InfoChip";
import TextLabel from "@/components/TextLabel";
import Text from "@/components/Text";

// MUI imports
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

// Helper imports
import { arkhe, elements } from "@/data/genshin/common";
import {
    tcgActionCardSubTypes,
    tcgActionCardTypes,
    tcgFactions,
    tcgWeaponTypes,
} from "@/data/genshin/tcg";

export default function TCGAttributes({
    name,
    description,
    tags,
    image,
}: {
    name: string;
    description?: string;
    tags: string[];
    image: React.ReactNode;
}) {
    const matches = useMediaQuery((theme) => theme.breakpoints.up("md"));

    return (
        <Stack spacing={2} divider={<Divider />} sx={{ width: "100%" }}>
            <FlexBox spacing={2} sx={{ alignItems: "flex-start" }}>
                <Box
                    sx={{
                        display: { xs: "block", md: "none" },
                        pl: { xs: 1, md: 0 },
                    }}
                >
                    {image}
                </Box>
                <Stack spacing={1}>
                    <TextLabel
                        title={name}
                        titleProps={{ variant: matches ? "h4" : "h6" }}
                        textSpacing={0.5}
                    />
                    <FlexBox spacing={1} wrap>
                        {tags.map(
                            (tag, index) =>
                                tag !== "Other" && (
                                    <InfoChip
                                        key={index}
                                        icon={getChipIcon(tag)}
                                        title={getChipTitle(tag)}
                                    />
                                )
                        )}
                    </FlexBox>
                </Stack>
            </FlexBox>
            {description && (
                <Box
                    sx={{
                        maxHeight: "128px",
                        overflowY: "auto",
                        scrollbarWidth: "thin",
                    }}
                >
                    <Text variant="body2">{parse(description)}</Text>
                </Box>
            )}
        </Stack>
    );
}

function getChipIcon(tag: any) {
    let url = "";
    if (elements.includes(tag)) {
        url = "elements";
    }
    if (tcgWeaponTypes.includes(tag)) {
        url = "weapons";
    }
    if (tcgFactions.includes(tag)) {
        url = "factions";
    }
    if (arkhe.includes(tag)) {
        url = "factions";
    }
    if (tcgActionCardSubTypes.includes(tag) || tag === "Combat Action") {
        url = "subtypes";
    }
    return url ? `genshin/tcg/icons/${url}/${tag}` : "";
}

function getChipTitle(tag: any) {
    if (tcgActionCardTypes.includes(tag)) {
        return `${tag} Card`;
    } else {
        return tag;
    }
}
