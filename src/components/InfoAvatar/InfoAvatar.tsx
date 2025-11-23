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
import { useGameTag } from "@/context";
import { useRarityColors } from "@/helpers/rarityColors";

// Type imports
import { InfoAvatarProps } from "./InfoAvatar.types";

export default function InfoAvatar({
    tag,
    name,
    displayName = name,
    rarity = 3,
    size = 64,
    background,
    disableZoomOnHover,
    url = "icons",
    componentID,
    href,
}: InfoAvatarProps) {
    const theme = useTheme();

    const game = useGameTag() || "genshin";

    const rarityColors = useRarityColors()[game];

    let imgURL = `${tag}/${name}`;
    if (url) {
        imgURL = `${tag}/${url}/${name}`;
    }

    const ImageRoot = (
        <Image
            src={imgURL}
            size={size - theme.infoAvatar.border.width * 2}
            id={`${componentID || href}-infoAvatar`}
            zoomOnHover={!disableZoomOnHover}
        />
    );

    return (
        <Tooltip title={displayName} arrow placement="top">
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
                    backgroundImage: `url(https://assets.irminsul.gg/wuwa/backgrounds/Background_${rarity}_Star.png)`,
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
