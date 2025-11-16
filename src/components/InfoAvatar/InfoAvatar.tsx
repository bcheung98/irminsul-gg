// Component imports
import NavLink from "../NavLink";
import Image from "../Image";
import Tooltip from "../Tooltip";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import ButtonBase from "@mui/material/ButtonBase";

// Helper imports
import { formatHref } from "@/utils";
import { getRarityColor } from "@/helpers/genshin/rarityColors";

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

    return (
        <Tooltip title={displayName} arrow placement="top">
            <Card
                elevation={0}
                sx={{
                    position: "relative",
                    width: size,
                    height: size,
                    border: `${
                        theme.infoAvatar.border.width
                    }px solid ${getRarityColor(rarity)}`,
                    borderRadius: theme.infoAvatar.border.radius,
                    backgroundImage:
                        background ||
                        `url(https://assets.irminsul.gg/genshin/backgrounds/Background_${rarity}_Star.png)`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                }}
            >
                <ButtonBase
                    href={`/${tag}/${formatHref(href)}`}
                    LinkComponent={NavLink}
                >
                    <Image
                        src={`${tag}/${url}/${name}`}
                        size={size - theme.infoAvatar.border.width * 2}
                        id={`${componentID || href}-infoAvatar`}
                        zoomOnHover={!disableZoomOnHover}
                    />
                </ButtonBase>
            </Card>
        </Tooltip>
    );
}
