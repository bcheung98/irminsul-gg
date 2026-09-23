// Component imports
import NavLink from "@/components/NavLink";
import Image from "@/components/Image";
import Tooltip from "@/components/Tooltip";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import ButtonBase from "@mui/material/ButtonBase";

// Helper imports
import { formatHref } from "@/utils";
import { useRarityColors } from "@/helpers/rarityColors";

// Type imports
import type { InfoAvatarProps } from "./InfoAvatar.types";
import type { Game } from "@/types";

export default function InfoAvatar({
    id,
    tag,
    name,
    rarity = 3,
    size = 64,
    background,
    disableZoomOnHover,
    url,
    componentID,
    href,
}: InfoAvatarProps) {
    const theme = useTheme();

    const game = tag.split("/")[0] as Game;

    const rarityColors = useRarityColors()[game];

    let imageUrl = `${tag}/${id}`;
    if (url) {
        imageUrl = `${tag}/${url}`;
    }

    const image = (
        <Image
            src={imageUrl}
            size={size}
            id={`${componentID || href}-infoAvatar`}
            zoomOnHover={!disableZoomOnHover}
            style={{
                width: "100%",
                height: "100%",
            }}
            fadeOnLoad
        />
    );

    return (
        <Tooltip title={name} placement="top">
            <Card
                elevation={0}
                sx={{
                    width: { xs: size - size * 0.125, md: size },
                    height: { xs: size - size * 0.125, md: size },
                    border: `${
                        theme.infoAvatar.border.width
                    }px solid ${rarityColors(rarity)}`,
                    borderRadius: theme.infoAvatar.border.radius,
                    backgroundColor: background || theme.background(1),
                    backgroundImage: !tag.startsWith("uma")
                        ? `url(https://assets.irminsul.gg/v2/_common/rarity-background/${rarity}.png)`
                        : "none",
                    backgroundSize: "contain",
                }}
            >
                {href ? (
                    <ButtonBase
                        href={`/${tag}/${formatHref(href)}`}
                        LinkComponent={NavLink}
                    >
                        {image}
                    </ButtonBase>
                ) : (
                    image
                )}
            </Card>
        </Tooltip>
    );
}
