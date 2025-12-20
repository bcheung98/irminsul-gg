// Component imports
import NavLink from "@/components/NavLink";
import Image from "@/components/Image";
import Tooltip from "@/components/Tooltip";
import DataIcon from "@/components/DataIcon";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import ButtonBase from "@mui/material/ButtonBase";

// Helper imports
import { formatHref } from "@/utils";
import { rarityMap } from "@/data/uma/common";

// Type imports
import { InfoAvatarProps } from "@/components/InfoAvatar/InfoAvatar.types";
import { UmaSpecialty } from "@/types/uma";

export interface InfoAvatarSupportProps extends InfoAvatarProps {
    type: UmaSpecialty;
}

export default function InfoAvatarSupport({
    id,
    tag,
    name,
    rarity = 3,
    size = 64,
    disableZoomOnHover,
    url,
    componentID,
    href,
    type,
}: InfoAvatarSupportProps) {
    const theme = useTheme();

    let imgURL = `${tag}/${id}`;
    if (url) {
        imgURL = `${tag}/${url}`;
    }

    const ImageRoot = (
        <Image
            src={imgURL}
            size={size}
            id={`${componentID || href}-infoAvatar`}
            zoomOnHover={!disableZoomOnHover}
        />
    );

    return (
        <Card
            sx={{
                position: "relative",
                overflow: "visible",
                width: size,
                height: size,
                borderRadius: theme.infoAvatar.border.radius,
                background: "transparent",
            }}
        >
            <Tooltip
                title={`${name} (${rarityMap[rarity]} ${type})`}
                arrow
                placement="top"
            >
                <div>
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
                </div>
            </Tooltip>
            <Stack
                sx={{
                    position: "absolute",
                    zIndex: 5,
                    top: -2,
                    right: 2,
                    borderRadius: "8px",
                }}
            >
                <DataIcon
                    game="uma"
                    property="specialty"
                    value={type}
                    styles={{
                        width: `calc(${size}px / 6 + 12px)`,
                        height: `calc(${size}px / 6 + 12px)`,
                        minWidth: "16px",
                        minHeight: "16px",
                    }}
                />
            </Stack>
        </Card>
    );
}
