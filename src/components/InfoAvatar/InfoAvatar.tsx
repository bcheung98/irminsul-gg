// Component imports
import NavLink from "@/components/NavLink";
import Image from "@/components/Image";
import Tooltip from "@/components/Tooltip";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Card from "@mui/material/Card";
import ButtonBase from "@mui/material/ButtonBase";

// Helper imports
import { formatHref } from "@/utils";
import { useRarityColors } from "@/helpers/rarityColors";

// Type imports
import { InfoAvatarProps } from "./InfoAvatar.types";
import { Game } from "@/types";

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
    const matches = useMediaQuery(theme.breakpoints.down("md"));

    if (matches) {
        size = size - size * 0.125;
    }

    const game = tag.split("/")[0] as Game;

    const rarityColors = useRarityColors()[game];

    let imgURL = `${tag}/${id}`;
    if (url) {
        imgURL = `${tag}/${url}`;
    }

    const ImageRoot = (
        <Image
            src={imgURL}
            style={{ width: "100%", height: "100%" }}
            id={`${componentID || href}-infoAvatar`}
            zoomOnHover={!disableZoomOnHover}
            responsive
        />
    );

    return (
        <Tooltip title={name} arrow placement="top">
            <Card
                elevation={0}
                sx={{
                    width: size,
                    height: size,
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
                        {ImageRoot}
                    </ButtonBase>
                ) : (
                    ImageRoot
                )}
            </Card>
        </Tooltip>
    );
}
