// Component imports
import Image from "@/components/Image";

// MUI imports
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

// Helper imports
import { range } from "@/utils";

export default function TCGCardEnergyIcon({
    energy,
    size,
}: {
    energy: string | number;
    size: string;
}) {
    return (
        <Stack>
            {range(Number(energy)).map((index) => (
                <Box key={index} sx={{ width: size, height: size }}>
                    <Image
                        src="genshin/tcg/icons/Energy_Card"
                        alt="Energy"
                        style={{
                            width: "100%",
                            height: "100%",
                            padding: "4px",
                            maxWidth: "64px",
                            userSelect: "none",
                            pointerEvents: "none",
                        }}
                    />
                </Box>
            ))}
        </Stack>
    );
}
