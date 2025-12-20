// Component imports
import Image from "@/components/Image";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";

// Helper imports
import {
    TEHAddItem,
    TEHItemTitle,
    TEHRootStackParams,
    useTEHelperData,
} from "./TEHelper.utils";

// Type imports
import { TEHDeckData } from "@/types/uma/te-helper";
import { formatCharacterTitle } from "@/helpers/uma/formatTitle";

export default function TEHDeckCharacterCard({
    data,
    mini,
}: {
    data: TEHDeckData;
    mini?: boolean;
}) {
    const theme = useTheme();

    const { characters } = useTEHelperData();
    const character = characters.find((character) => character.id === data);

    const cardStyles = {
        width: mini ? "64px" : "96px",
        height: mini ? "64px" : "96px",
        borderRadius: "16px",
        backgroundColor: theme.background(0, "dark"),
        cursor: mini ? "default" : "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "&:hover": {
            backgroundColor: mini
                ? theme.background(0, "dark")
                : theme.background(0),
        },
    };

    return (
        <Stack {...TEHRootStackParams} sx={{ width: mini ? "64px" : "96px" }}>
            {character ? (
                <Image
                    src={`uma/characters/${character.id}`}
                    size={mini ? 64 : 96}
                    style={{
                        borderRadius: mini ? "8px" : "16px",
                        backgroundColor: theme.background(0, "dark"),
                        cursor: mini ? "default" : "pointer",
                    }}
                    tooltip={mini && formatCharacterTitle(character)}
                />
            ) : (
                <TEHAddItem sx={cardStyles} mini={mini} />
            )}
            {!mini && (
                <TEHItemTitle>
                    {character
                        ? `${character.name} (${
                              character.outfit || "Original"
                          })`
                        : "Trainee"}
                </TEHItemTitle>
            )}
        </Stack>
    );
}
