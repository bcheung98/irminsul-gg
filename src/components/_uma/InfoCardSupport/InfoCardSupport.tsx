// Component imports
import SupportImage from "../SupportCardImage";
import NavLink from "@/components/NavLink";
import Text from "@/components/Text";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";

// Helper imports
import { infoCardStyles } from "@/components/InfoCard/InfoCard.styles";
import { formatHref, zoomImageOnHover } from "@/utils";

// Type imports
import { InfoCardProps } from "@/components/InfoCard/InfoCard.types";
import { UmaSpecialty, UmaSupport } from "@/types/uma";
import { Game } from "@/types";

export interface InfoCardSupportProps extends InfoCardProps {
    specialty: UmaSpecialty;
}

export default function InfoCardSupport({
    id,
    tag,
    name,
    title,
    rarity = 3,
    specialty,
    size = 128,
    background,
    disableZoomOnHover,
    componentID,
    href,
}: InfoCardSupportProps) {
    const support = { id, rarity, specialty } as UmaSupport;

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));

    componentID = `${componentID || formatHref(href)}-infoCard`;

    const [game, type] = tag.split("/") as [Game, string];

    let imgSize = size;
    if (matches) {
        imgSize = imgSize - imgSize * 0.25;
    }

    const styles = infoCardStyles({
        game,
        type,
        border: theme.infoCard.border,
        backgroundColor: background || theme.background(1),
        rarity,
        imgSize: `${imgSize}px`,
    });

    const handleHover = (direction: "enter" | "leave") => {
        !disableZoomOnHover &&
            zoomImageOnHover({
                direction,
                id: componentID,
                baseScale: 1,
                zoom: 1.05,
            });
    };

    return (
        <Card
            sx={styles.root()}
            elevation={2}
            onMouseEnter={() => handleHover("enter")}
            onMouseLeave={() => handleHover("leave")}
        >
            <ButtonBase
                href={`/${tag}/${formatHref(href)}`}
                LinkComponent={NavLink}
            >
                <SupportImage
                    support={support}
                    style={{ width: imgSize }}
                    componentID={componentID}
                    tooltipArrow="top"
                />
                <Box sx={{ p: 1 }}>
                    {title && (
                        <Text variant="body3" sx={styles.text()}>
                            [{title || "???"}]
                        </Text>
                    )}
                    <Text
                        variant={name.length > 13 ? "body3" : "body2"}
                        sx={styles.text()}
                    >
                        {name}
                    </Text>
                </Box>
            </ButtonBase>
        </Card>
    );
}
