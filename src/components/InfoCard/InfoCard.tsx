// Component imports
import Image from "../Image";
import NavLink from "../NavLink";
import Text from "../Text";
import InfoBadge from "../InfoBadge/";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";

// Helper imports
import { infoCardStyles } from "./InfoCard.styles";
import { convertNametoURL, zoomImageOnHover } from "@/utils";

// Type imports
import { InfoCardProps } from "./InfoCard.types";

export default function InfoCard({
    tag,
    name,
    displayName = name,
    rarity = 3,
    size = 128,
    background,
    disableZoomOnHover,
    url = "avatars",
    componentID,
    badgeLeft,
    badgeRight,
}: InfoCardProps) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));

    const id = `${componentID || convertNametoURL(name)}-infoCard`;

    const [game, type] = tag.split("/");

    const href = `/${tag}/${convertNametoURL(name)}`;

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
                id: id,
                baseScale: 1,
                zoom: 1.05,
            });
    };

    return (
        <Card sx={styles.root()} elevation={2}>
            <Card
                elevation={0}
                sx={styles.card()}
                onMouseEnter={() => handleHover("enter")}
                onMouseLeave={() => handleHover("leave")}
            >
                <ButtonBase href={href} LinkComponent={NavLink}>
                    <Box sx={styles.imageContainer()}>
                        <Image
                            src={`${tag}/${url}/${name}`}
                            id={id}
                            size={size}
                            responsive
                            responsiveSize={0.25}
                        />
                    </Box>
                    <Box sx={styles.textContainer()}>
                        <Text
                            variant={
                                displayName.length > 13 ? "body3" : "body2"
                            }
                            sx={styles.text()}
                        >
                            {displayName}
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
                        icon: styles.badgeIcon(),
                    }}
                />
            )}
            {badgeRight && (
                <InfoBadge
                    data={badgeRight}
                    game={game}
                    styles={{
                        root: styles.badgeContainer("right"),
                        icon: styles.badgeIcon(),
                    }}
                />
            )}
        </Card>
    );
}
