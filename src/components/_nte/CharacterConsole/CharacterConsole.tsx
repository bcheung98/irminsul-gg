// Component imports
import ContentBox from "@/components/ContentBox";
import Text from "@/components/Text";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

// Type imports
import { NTECharacterConsole } from "@/types/nte/character";

export default function CharacterConsole({
    charConsole,
}: {
    charConsole: NTECharacterConsole;
}) {
    const theme = useTheme();

    const backgroundColor = (n: number) =>
        n ? theme.palette.info.dark : theme.background(2, "light");
    const borderColor = (n: number) =>
        n ? theme.palette.info.main : theme.background(1);

    return (
        <ContentBox header="Console">
            <Stack spacing={2}>
                <Stack spacing={1}>
                    <Text weight="highlight">{charConsole.name}</Text>
                    <Text variant="subtitle1">{charConsole.description}</Text>
                </Stack>
                <Stack alignItems="center">
                    <Grid
                        container
                        spacing={0.25}
                        columns={7}
                        sx={{
                            width: { xs: "75%", sm: "40%", lg: "25%" },
                            p: 1,
                            backgroundColor: theme.background(0, "dark"),
                            border: `2px solid ${theme.border.color.primary}`,
                            borderRadius: "8px",
                        }}
                    >
                        {charConsole.slots.flat().map((tile, index) => (
                            <Grid
                                key={index}
                                size={1}
                                sx={{
                                    backgroundColor: `${backgroundColor(tile)}`,
                                    border: `2px solid ${borderColor(tile)}`,
                                    borderRadius: "4px",
                                    aspectRatio: 1,
                                }}
                            />
                        ))}
                    </Grid>
                </Stack>
            </Stack>
        </ContentBox>
    );
}
