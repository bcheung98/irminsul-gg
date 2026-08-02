import useSWR from "swr";

// Component imports
import TextLabel from "@/components/TextLabel";
import Text from "@/components/Text";
import Image from "@/components/Image";

// MUI imports
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";

// Helper imports
import { useStore, useServerStore } from "@/stores";
import { urls } from "@/api";
import { formatHref, sortBy } from "@/utils";
import { rarityMap } from "@/data/uma/common";
import { scenarios } from "@/data/uma/scenarios";
import { isUnreleasedContentUma } from "@/helpers/isUnreleasedContent";

// Type imports
import { UmaCharacter, UmaRarity, UmaSpecialty, UmaSupport } from "@/types/uma";
import { UmaSkill } from "@/types/uma/skill";
import { UmaScenario } from "@/types/uma/scenario";

export default function SkillSources({
    skill,
    backgroundColor,
}: {
    skill: UmaSkill;
    backgroundColor?: string;
}) {
    const characters: UmaCharacter[] = useSWR(
        urls["uma/characters"],
        (url: string) => fetch(url).then((r) => r.json()),
    ).data;
    const supports: UmaSupport[] = useSWR(urls["uma/supports"], (url: string) =>
        fetch(url).then((r) => r.json()),
    ).data;

    const server = useStore(useServerStore, (state) => state.uma);

    const { id } = skill;

    if (!characters || !supports) return <LinearProgress color="info" />;

    function ItemImage({
        type,
        id,
        name,
        rank,
        specialty,
        url,
        outfit = "Original",
    }: RenderImageProps) {
        const tooltip =
            type === "character"
                ? `${name} (${outfit || "Original"})`
                : `${name} (${rarityMap[rank]} ${specialty})`;
        return (
            <TextLabel
                icon={`uma/${type}s/${id}_icon`}
                iconProps={{ size: [48, 0], tooltip }}
                href={`/uma/${type}s/${formatHref(url)}`}
            />
        );
    }

    function ItemImageScenario({ scenario }: { scenario: UmaScenario }) {
        return (
            <Image
                src={`uma/scenarios/${scenario.id}`}
                size={48}
                responsive
                tooltip={server === "Asia" ? scenario.nameJP : scenario.name}
            />
        );
    }

    function filterSources(item: UmaCharacter | UmaSupport) {
        if (server === "NA") {
            return !isUnreleasedContentUma(item.release);
        } else return item;
    }

    const characterSources = characters
        .filter((char) =>
            [
                char.skills.awakening.map((skill) => Number(skill)),
                char.skills.awakeningJP?.map((skill) => Number(skill)),
                char.skills.innate.map((skill) => Number(skill)),
                char.skills.unique.map((skill) => Number(skill)),
                server === "Asia" &&
                    char.skills.evo.map((skill) => Number(skill.new)),
            ]
                .flat()
                .includes(id),
        )
        .filter(filterSources);

    const characterEventSources = characters
        .filter((char) => {
            return server === "Asia"
                ? (char.skills.eventJP || char.skills.event).includes(id)
                : char.skills.event.includes(id);
        })
        .filter(filterSources);

    const supportSources = supports
        .filter((supp) => supp.hints.skills.includes(id))
        .filter(filterSources)
        .sort((a, b) => sortBy(a.rarity, b.rarity) || sortBy(b.id, a.id));

    const supportEventSources = supports
        .filter((supp) => supp.skillEvents.includes(id))
        .filter(filterSources)
        .sort((a, b) => sortBy(a.rarity, b.rarity) || sortBy(b.id, a.id));

    let scenarioSources: UmaScenario[] = [];
    scenarioSources = scenarios.filter((s) => {
        if (skill.scenarioEvents) {
            if (server === "Asia") {
                return skill.scenarioEvents.includes(s.id);
            } else {
                return skill.scenarioEvents.includes(s.id) && s.global;
            }
        }
    });

    const sourceList = {
        Characters: characterSources,
        "Character Events": characterEventSources,
        Supports: supportSources,
        "Support Events": supportEventSources,
    };

    const sources = [
        characterSources,
        characterEventSources,
        supportSources,
        supportEventSources,
        scenarioSources,
    ].flat();

    return sources.length > 0 ? (
        <Card
            sx={(theme) => ({
                backgroundColor: backgroundColor || theme.background(1),
                p: backgroundColor ? 1 : 0,
            })}
        >
            <Stack spacing={1}>
                {Object.entries(sourceList).map(
                    ([title, sources]) =>
                        sources.length > 0 && (
                            <Stack
                                key={title}
                                spacing={
                                    title.startsWith("Character") ? 0 : 0.5
                                }
                            >
                                <Text variant="body2" weight="highlight">
                                    {`${title}:`}
                                </Text>
                                <Grid container spacing={1}>
                                    {sources.map((item, index) => (
                                        <ItemImage
                                            key={index}
                                            type={
                                                "specialty" in item
                                                    ? "support"
                                                    : "character"
                                            }
                                            id={item.id}
                                            name={item.name}
                                            rank={item.rarity}
                                            specialty={
                                                "specialty" in item
                                                    ? item.specialty
                                                    : undefined
                                            }
                                            outfit={
                                                "outfit" in item
                                                    ? item.outfit
                                                    : undefined
                                            }
                                            url={`${item.url}`}
                                        />
                                    ))}
                                </Grid>
                            </Stack>
                        ),
                )}
                {scenarioSources.length > 0 && (
                    <Stack spacing={0.5}>
                        <Text variant="body2" weight="highlight">
                            Scenario Events:
                        </Text>
                        <Grid container spacing={1}>
                            {scenarioSources.map((scenario, index) => (
                                <ItemImageScenario
                                    key={index}
                                    scenario={scenario}
                                />
                            ))}
                        </Grid>
                    </Stack>
                )}
            </Stack>
        </Card>
    ) : (
        <></>
    );
}

interface RenderImageProps {
    type: "character" | "support";
    id: number;
    name: string;
    rank: UmaRarity;
    url: string;
    specialty?: UmaSpecialty;
    outfit?: string;
}
