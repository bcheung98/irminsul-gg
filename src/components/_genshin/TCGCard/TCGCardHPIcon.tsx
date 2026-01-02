// Component imports
import Text from "@/components/Text";

// MUI imports
import { Box } from "@mui/material";

export default function TCGCardHPIcon(props: { hp: number; size: string }) {
    return (
        <Box
            sx={{
                textAlign: "center",
                verticalAlign: "center",
                width: props.size,
                height: "auto",
                backgroundImage:
                    "url(https://assets.irminsul.gg/v2/genshin/tcg/icons/HP.png)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "100%",
            }}
        >
            <Text
                weight="highlight"
                sx={{
                    fontSize: `calc(${props.size} / 2) !important`,
                    lineHeight: `calc(${props.size} * 1.25) !important`,
                    color: `white`,
                    textShadow:
                        "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
                    userSelect: "none",
                }}
            >
                {props.hp}
            </Text>
        </Box>
    );
}
