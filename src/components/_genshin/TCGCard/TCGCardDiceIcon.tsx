// Component imports
import Text from "@/components/Text";

// MUI imports
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

export default function TCGCardDiceIcon(props: {
    cost: string;
    orientation: "column" | "row";
    size: string;
}) {
    const costArray = props.cost.split(" ");

    return (
        <Stack direction={props.orientation} spacing={0.5}>
            {costArray.map((cost, index) => (
                <Box
                    key={index}
                    sx={{
                        textAlign: "center",
                        width: props.size,
                        height: props.size,
                        backgroundImage: `url(https://assets.irminsul.gg/v2/genshin/tcg/icons/dice/${cost.slice(
                            -1
                        )}.png)`,
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "100%",
                    }}
                >
                    <Text
                        weight="highlight"
                        sx={{
                            fontSize: `calc(${props.size} / 2.25) !important`,
                            lineHeight: props.size,
                            color: `white`,
                            textShadow:
                                "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000",
                            userSelect: "none",
                        }}
                    >
                        {cost.slice(0, -1)}
                    </Text>
                </Box>
            ))}
        </Stack>
    );
}
