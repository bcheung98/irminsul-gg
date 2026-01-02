// Component imports
import NavLink from "@/components/NavLink";
import Text from "@/components/Text";
import TCGCardImage from "../TCGCardImage";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Card from "@mui/material/Card";

import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";

// Helper imports
import { infoCardStyles } from "@/components/InfoCard/InfoCard.styles";
import { formatHref, zoomImageOnHover } from "@/utils";

interface TCGCardProps {
    id: number;
    name?: string;
    hp?: number;
    cost?: string | number;
    size?: number;
    disableZoomOnHover?: boolean;
    componentID?: string;
    href?: string;
}

export default function TCGCard({
    id,
    name,
    hp,
    cost,
    size = 128,
    disableZoomOnHover,
    componentID,
    href,
}: TCGCardProps) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));

    componentID = `${componentID || formatHref(href)}-tcgCard`;

    let imgSize = size;
    if (matches) {
        imgSize = imgSize - imgSize * 0.25;
    }

    const styles = infoCardStyles({
        game: "genshin",
        type: "card",
        border: theme.infoCard.border,
        backgroundColor: theme.background(1),
        rarity: 3,
        imgSize: `${imgSize}px`,
    });

    const handleHover = (direction: "enter" | "leave") => {
        !disableZoomOnHover &&
            zoomImageOnHover({
                direction,
                id: componentID,
                baseScale: 1,
                zoom: 1,
            });
    };

    return (
        <Card
            elevation={2}
            sx={styles.root()}
            onMouseEnter={() => handleHover("enter")}
            onMouseLeave={() => handleHover("leave")}
        >
            <ButtonBase
                href={`/genshin/tcg/${formatHref(href)}`}
                LinkComponent={NavLink}
            >
                <TCGCardImage
                    id={id}
                    hp={hp}
                    cost={cost}
                    style={{
                        width: imgSize,
                        height: "auto",
                        aspectRatio: 420 / 720,
                    }}
                    componentID={componentID}
                />
                <Box sx={{ p: 1 }}>
                    {name && (
                        <Text
                            variant={name.length > 13 ? "body3" : "body2"}
                            sx={styles.text()}
                        >
                            {name}
                        </Text>
                    )}
                </Box>
            </ButtonBase>
        </Card>
    );
}
