// Component imports
import Image from "@/components/Image";
import NavLink from "@/components/NavLink";
import Text from "@/components/Text";
import InfoBadge from "@/components/InfoBadge";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";

// Helper imports
import { infoCardStyles } from "./InfoCard.styles";
import { formatHref, zoomImageOnHover } from "@/utils";

// Type imports
import { InfoCardProps } from "./InfoCard.types";
import { Game } from "@/types";

export default function InfoCard({
    id,
    tag,
    name,
    rarity = 3,
    size = 128,
    background,
    disableZoomOnHover,
    url,
    componentID,
    badgeLeft,
    badgeRight,
    href,
}: InfoCardProps) {
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

    let imgURL = `${tag}/${id}`;
    if (url) {
        imgURL = `${tag}/${url}`;
    }

    return (
        <Card sx={styles.root()} elevation={2}>
            <Card
                elevation={0}
                sx={styles.card()}
                onMouseEnter={() => handleHover("enter")}
                onMouseLeave={() => handleHover("leave")}
            >
                <ButtonBase
                    href={`/${tag}/${formatHref(href)}`}
                    LinkComponent={NavLink}
                >
                    <Box sx={styles.imageContainer()}>
                        <Image
                            src={imgURL}
                            id={componentID}
                            size={[size, 0]}
                            responsive
                            responsiveSize={0.25}
                        />
                    </Box>
                    <Box sx={styles.textContainer()}>
                        <Text
                            variant={name.length > 13 ? "body3" : "body2"}
                            sx={styles.text()}
                        >
                            {name}
                        </Text>
                    </Box>
                </ButtonBase>
            </Card>
            {badgeLeft && (
                <InfoBadge
                    data={badgeLeft}
                    game={game}
                    styles={{
                        root: styles.badgeContainer("left"),
                        icon: styles.badgeIcon(!matches),
                    }}
                />
            )}
            {badgeRight && (
                <InfoBadge
                    data={badgeRight}
                    game={game}
                    styles={{
                        root: styles.badgeContainer("right"),
                        icon: styles.badgeIcon(!matches),
                    }}
                />
            )}
        </Card>
    );
}
