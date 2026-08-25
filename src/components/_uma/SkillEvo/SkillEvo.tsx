import useSWR from "swr";

// Component imports
import TextLabel from "@/components/TextLabel";
import Text from "@/components/Text";
import SkillInfo from "@/components/_uma/SkillInfo";

// MUI imports
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";

// Helper imports
import { urls } from "@/api";
import { formatHref } from "@/utils";
import { useStore, useServerStore } from "@/stores";

// Type imports
import { UmaCharacter } from "@/types/uma";
import { UmaSkillEvolution } from "@/types/uma/skill";

export default function SkillEvo({
    evolutions,
    handleClick,
}: {
    evolutions?: UmaSkillEvolution[];
    handleClick?: (arg: any) => void;
}) {
    const characters: UmaCharacter[] = useSWR(
        urls["uma/characters"],
        (url: string) => fetch(url).then((r) => r.json()),
    ).data;

    const server = useStore(useServerStore, (state) => state.uma);

    if (!evolutions || evolutions.length === 0 || server === "NA") return <></>;
    if (!characters) return <LinearProgress color="info" />;

    function ItemImage({ charID, evos }: { charID: number; evos: number[] }) {
        const character = characters.find((char) => char.id === charID);
        if (!character) return <></>;

        const { name, outfit, url, release } = character;

        if (server === "NA" && !release.global) return <></>;

        return (
            <Stack spacing={1}>
                <TextLabel
                    icon={`uma/characters/${charID}_icon`}
                    iconProps={{ size: [48, 0] }}
                    title={`${name} (${outfit || "Original"})`}
                    href={`/uma/characters/${formatHref(url)}`}
                />
                <Stack spacing={1}>
                    {evos.map((skill) => (
                        <SkillInfo
                            key={skill}
                            skillID={skill}
                            handleClick={handleClick}
                            disablePopup={!Boolean(handleClick)}
                        />
                    ))}
                </Stack>
            </Stack>
        );
    }

    return (
        <Stack spacing={1}>
            <Text weight="highlight">Evolutions:</Text>
            <Stack spacing={2}>
                {evolutions.map((evo, index) => (
                    <Box key={index}>
                        {evo.cardID && (
                            <ItemImage charID={evo.cardID} evos={evo.evos} />
                        )}
                    </Box>
                ))}
            </Stack>
        </Stack>
    );
}
