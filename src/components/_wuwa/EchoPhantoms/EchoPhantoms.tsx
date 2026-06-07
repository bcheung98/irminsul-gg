// Component imports
import Text from "@/components/Text";
import Image from "@/components/Image";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";

// Helper imports
import { range } from "@/utils";

export default function EchoPhantoms({
    id,
    count,
}: {
    id: number;
    count: number;
}) {
    const theme = useTheme();

    return (
        <Stack spacing={1}>
            <Text variant="h6" weight="highlight">
                Phantoms
            </Text>
            <Grid container spacing={2}>
                {range(1, count).map((i) => (
                    <Grid key={i} size="auto">
                        <Image
                            src={`wuwa/echoes/${id}_${i}`}
                            style={{
                                border: `2px solid ${theme.border.color.primary}`,
                                borderRadius: "8px",
                                backgroundColor: theme.background(0, "dark"),
                            }}
                            responsive
                        />
                    </Grid>
                ))}
            </Grid>
        </Stack>
    );
}
