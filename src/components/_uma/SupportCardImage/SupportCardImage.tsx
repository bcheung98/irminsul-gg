// Component imports
import Image from "@/components/Image";

// MUI imports
import { SxProps, Theme } from "@mui/material/styles";
import Box from "@mui/material/Box";

// Helper imports
import { getSupportCardRarityColor } from "@/helpers/uma/rarityColors";
import { rarityMap } from "@/data/uma/common";

// Type imports
import { UmaSupport } from "@/types/uma";
import Stack from "@mui/material/Stack";

export default function SupportImage({
    support,
    style,
    handleClickOpen,
}: {
    support: UmaSupport;
    style: React.CSSProperties;
    handleClickOpen?: () => void;
}) {
    const { id, rarity, specialty } = support;

    const supportImageStyle =
        (rarity: number): SxProps<Theme> =>
        () => ({
            display: "flex",
            overflow: "clip",
            borderRadius: "16px",
            width: "auto",
            backgroundColor: "transparent",
            border: "4px solid transparent",
            backgroundImage: `linear-gradient(transparent, transparent), ${getSupportCardRarityColor(
                rarity
            )}`,
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box, border-box",
        });

    return (
        <Box
            sx={{
                position: "relative",
                overflow: "visible",
            }}
        >
            <Box sx={supportImageStyle(rarity)} onClick={handleClickOpen}>
                <Image src={`uma/supports/${id}`} style={style} />
            </Box>
            <Stack
                sx={{
                    position: "absolute",
                    zIndex: 5,
                    top: -2,
                    left: 8,
                    width: "25%",
                }}
            >
                <Image
                    src={`uma/rarity/${rarityMap[rarity]}`}
                    style={{ width: "100%" }}
                />
            </Stack>
            <Box
                sx={{
                    position: "absolute",
                    zIndex: 5,
                    top: -2,
                    right: 1,
                    display: "flex",
                    justifyContent: "right",
                    width: "25%",
                }}
            >
                <Image
                    src={`uma/icons/specialties/${specialty}`}
                    style={{ width: "100%", borderRadius: "4px" }}
                    tooltip={specialty}
                    tooltipArrow="bottom"
                />
            </Box>
        </Box>
    );
}
