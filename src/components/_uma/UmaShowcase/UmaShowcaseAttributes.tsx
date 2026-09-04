// Component imports
import Text from "@/components/Text";

// MUI imports
import Stack from "@mui/material/Stack";
import Rating from "@mui/material/Rating";

// Type imports
import { UmaCharacter } from "@/types/uma/character";

export default function UmaShowcaseAttributes({
    character,
    starLevel,
}: {
    character: UmaCharacter;
    starLevel: number;
}) {
    return (
        <Stack spacing={1}>
            <Stack sx={{ textAlign: "center" }}>
                <Text
                    weight="highlight"
                    sx={{ textShadow: `black 1px 1px 4px` }}
                >
                    [{character.title}]
                </Text>
                <Text
                    variant="h5"
                    weight="highlight"
                    sx={{ textShadow: `black 1px 1px 4px` }}
                >
                    {character.name}
                </Text>
            </Stack>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Rating
                    value={starLevel}
                    readOnly
                    sx={(theme) => ({
                        "& .MuiRating-iconFilled": {
                            color: theme.text.star,
                            filter: `drop-shadow(0 2px 2px rgb(197, 87, 14))`,
                        },
                        "& .MuiRating-iconEmpty": {
                            color: theme.border.color.primary,
                            filter: `drop-shadow(0 2px 2px rgb(197, 87, 14))`,
                        },
                    })}
                />
            </div>
        </Stack>
    );
}
