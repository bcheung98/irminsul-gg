// Component imports
import Image from "@/components/Image";
import TCGCardHPIcon from "../TCGCard/TCGCardHPIcon";
import TCGCardDiceIcon from "../TCGCard/TCGCardDiceIcon";
import TCGCardEnergyIcon from "../TCGCard/TCGCardEnergyIcon";

// MUI imports
import { alpha, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

// Helper imports
import { pxToInt } from "@/utils";

export default function TCGCardImage({
    id,
    size = 128,
    cost,
    hp,
    componentID,
    style,
}: {
    id: number;
    size?: number;
    cost?: string | number;
    hp?: number;
    componentID?: string;
    style?: React.CSSProperties;
}) {
    const theme = useTheme();

    const BadgeLeft = (
        <Stack
            sx={{
                position: "absolute",
                zIndex: 5,
                top: -5,
                left: -12,
            }}
        >
            {hp && <TCGCardHPIcon hp={hp} size={`${pxToInt(size) / 4}px`} />}
            {id >= 100000 && cost && (
                <TCGCardDiceIcon
                    cost={`${cost}`}
                    orientation="column"
                    size={`${pxToInt(size) / 3}px`}
                />
            )}
        </Stack>
    );

    const BadgeRight = cost ? (
        <Stack
            sx={{
                position: "absolute",
                zIndex: 5,
                top: 0,
                right: 0,
                backgroundColor: alpha(
                    theme.appbar.backgroundColor.main,
                    0.675
                ),
                borderRadius: "0px 15px 0px 8px",
            }}
        >
            {id < 100000 && (
                <TCGCardEnergyIcon
                    energy={cost}
                    size={`${pxToInt(size) / (16 / 3)}px`}
                />
            )}
        </Stack>
    ) : null;

    return (
        <Box sx={{ position: "relative", overflow: "visible" }}>
            <Box
                sx={{
                    display: "flex",
                    overflow: "clip",
                    borderRadius: "16px 16px 0px 0px",
                    width: "auto",
                    height: "auto",
                    backgroundColor: "transparent",
                    backgroundOrigin: "border-box",
                    backgroundClip: "padding-box, border-box",
                }}
            >
                <Image
                    src={`genshin/tcg/cards/${id}`}
                    id={componentID}
                    style={style}
                />
            </Box>
            {BadgeLeft}
            {BadgeRight}
        </Box>
    );
}
