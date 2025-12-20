import useSWR from "swr";

// Component imports
import FlexBox from "@/components/FlexBox";
import TextLabel from "@/components/TextLabel";
import Text from "@/components/Text";
import Image from "@/components/Image";
import SkillDescription from "../SkillDescription";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import LinearProgress from "@mui/material/LinearProgress";

// Helper imports
import { useStore, useServerStore } from "@/stores";
import { urls } from "@/lib/fetchData";
import { formatHref, sortBy } from "@/utils";
import { rarityMap } from "@/data/uma/common";
import { scenarios } from "@/data/uma/scenarios";
import { getUmaSkillRarityColor } from "@/helpers/uma/rarityColors";
import { isUnreleasedContentUma } from "@/helpers/isUnreleasedContent";

// Type imports
import { UmaCharacter, UmaRarity, UmaSpecialty, UmaSupport } from "@/types/uma";
import { UmaSkill } from "@/types/uma/skill";
import { UmaScenario } from "@/types/uma/scenario";

export default function SkillPopup({
    skill,
    showSources = false,
}: {
    skill: UmaSkill;
    showSources?: boolean;
}) {
    const characters: UmaCharacter[] = useSWR(
        urls["uma/characters"],
        (url: string) => fetch(url).then((r) => r.json())
    ).data;
    const supports: UmaSupport[] = useSWR(urls["uma/supports"], (url: string) =>
        fetch(url).then((r) => r.json())
    ).data;

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));

    const server = useStore(useServerStore, (state) => state.uma);

    const { id, name, rarity, cost, icon } = skill;

    const skillName = name.global || name.jp;

    const textColor = rarity >= 2 ? "rgb(121, 64, 22)" : theme.text.primary;
    const textStyle = {
        color: textColor,
    };

    const skillDesc = (
        <SkillDescription
            description={skill.description.global || skill.description.jp}
            color={textColor}
            weight="highlight"
        />
    );

    const skillUnlock = rarity === 4 && <Text sx={textStyle}>(3★)</Text>;

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

    if (!characters || !supports) return <LinearProgress color="info" />;

    function filterSources(item: UmaCharacter | UmaSupport) {
        if (server === "NA") {
            return !isUnreleasedContentUma(item.release);
        } else return item;
    }

    const characterSources = characters
        .filter((char) =>
            [
                ...char.skills.awakening.map((skill) => Number(skill)),
                ...char.skills.innate.map((skill) => Number(skill)),
                ...char.skills.unique.map((skill) => Number(skill)),
                ...char.skills.evo.map((skill) => Number(skill.new)),
            ].includes(id)
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

    return (
        <Stack spacing={1}>
            <Card
                sx={{
                    p: 1,
                    backgroundColor: theme.background(0),
                    backgroundImage: getUmaSkillRarityColor(rarity),
                }}
            >
                <FlexBox spacing={2}>
                    <Stack
                        spacing={0.5}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Image
                            src={`uma/skills/${icon}`}
                            size={48}
                            responsive
                        />
                        {skillUnlock}
                    </Stack>
                    <Stack spacing={0.5} sx={{ width: "90%" }}>
                        <FlexBox
                            spacing={[0.5, 1]}
                            wrap
                            sx={{ justifyContent: "space-between" }}
                        >
                            <Text
                                variant={matches ? "body1" : "body2"}
                                weight="highlight"
                                sx={textStyle}
                            >
                                {skillName}
                            </Text>
                            {cost && (
                                <Box
                                    sx={{
                                        p: "1px 8px",
                                        backgroundColor:
                                            theme.appbar.backgroundColor.main,
                                        borderRadius: "16px",
                                    }}
                                >
                                    <Text
                                        variant="subtitle2"
                                        weight="highlight"
                                        sx={{
                                            color: theme.appbar.color.primary,
                                        }}
                                    >{`Skill Pts: ${cost}`}</Text>
                                </Box>
                            )}
                        </FlexBox>
                        <Divider />
                        {skillDesc}
                    </Stack>
                </FlexBox>
            </Card>
            {showSources && sources.length > 0 && (
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
                            )
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
            )}
        </Stack>
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
