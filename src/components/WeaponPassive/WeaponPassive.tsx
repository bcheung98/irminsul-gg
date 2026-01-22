import { useEffect, useState } from "react";

// Component imports
import SkillDescription from "@/components/SkillDescription";
import Text from "@/components/Text";
import Slider from "@/components/Slider";
import ContentDialog from "@/components/ContentDialog";
import KeywordPopup from "@/components/KeywordPopup";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";

// Helper imports
import { useGameTag } from "@/context";
import { range } from "@/utils";
import { weaponSubStats } from "@/data/endfield/weaponStats";
import { getKeywordPopupTitle, useSkillKeyword } from "@/helpers/skills";

// Type imports
import { TWeaponStats } from "@/components/StatsDisplay/StatsDisplay.types";
import { EndfieldWeaponAttribute } from "@/types/endfield/weapon";
import { SkillKeyword } from "@/types/skill";

export default function WeaponPassive({ stats }: { stats: TWeaponStats }) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));

    const game = useGameTag();

    const { passive } = stats;
    const className = "weapon-passive-value";

    const [sliderValue, setSliderValue] = useState(0);
    const handleSliderChange = (_: Event, newValue: number | number[]) => {
        setSliderValue(newValue as number);
    };

    const maxLevel = game === "endfield" ? 9 : 5;

    const marks = range(maxLevel).map((level) => ({
        value: level,
        label: (
            <Text
                variant={sliderValue === level ? "subtitle1" : "subtitle2"}
                weight={sliderValue === level ? "highlight" : "primary"}
                sx={{
                    userSelect: "none",
                    opacity: sliderValue === level ? 1 : 0.25,
                }}
            >
                {level + 1}
            </Text>
        ),
    }));

    const getSkillKeyword = useSkillKeyword()[game];

    const [currentKeyword, setCurrentKeyword] = useState<SkillKeyword | null>(
        null,
    );
    const [dialogOpen, setDialogOpen] = useState(false);
    const handleDialogOpen = (event: React.BaseSyntheticEvent) => {
        const keyword = getSkillKeyword({
            tag: event.target.dataset.tag,
            attributes: {},
        });
        if (keyword) {
            setCurrentKeyword(keyword);
            setDialogOpen(true);
        }
    };
    const handleDialogClose = () => {
        setDialogOpen(false);
        setCurrentKeyword(null);
    };

    function EndfieldWeaponSkill(props: {
        attributes: EndfieldWeaponAttribute;
    }) {
        const stat = weaponSubStats[props.attributes.stat];
        return (
            <Stack spacing={1}>
                <Text weight="highlight">{`${stat.title} [${props.attributes.scaling}]`}</Text>
                <Text
                    component="span"
                    variant="subtitle1"
                    sx={{
                        color: theme.text.description,
                    }}
                >
                    {`${stat.description || props.attributes.stat} `}
                    <span
                        style={{
                            color: theme.text.endfield.value,
                            fontWeight: theme.font.weight.highlight,
                        }}
                    >{`+${stat.scaling[props.attributes.scaling][sliderValue]}`}</span>
                </Text>
            </Stack>
        );
    }

    if (passive) {
        useEffect(() => {
            const targets = document.getElementsByClassName(className);
            passive.scaling?.forEach(
                (subScaling: (string | number)[], index: number) => {
                    const target = targets[index];
                    if (target) {
                        target.innerHTML = subScaling[sliderValue].toString();
                    }
                },
            );
        }, [sliderValue]);

        return (
            <>
                <Stack spacing={2}>
                    <Card sx={{ p: 2, backgroundColor: theme.background(0) }}>
                        <Stack spacing={2}>
                            {"attributes" in stats && (
                                <>
                                    <EndfieldWeaponSkill
                                        attributes={stats.attributes.primary}
                                    />
                                    {stats.attributes.secondary && (
                                        <EndfieldWeaponSkill
                                            attributes={
                                                stats.attributes.secondary
                                            }
                                        />
                                    )}
                                </>
                            )}
                            <Stack spacing={1}>
                                <Text weight="highlight">{passive.name}</Text>
                                <Text
                                    component="span"
                                    variant="subtitle1"
                                    sx={{
                                        color: theme.text.description,
                                    }}
                                >
                                    <SkillDescription
                                        game={game}
                                        description={passive.description}
                                        targetClassName="text-refinement"
                                        newClassName={className}
                                        onClick={handleDialogOpen}
                                    />
                                </Text>
                            </Stack>
                        </Stack>
                    </Card>
                    {passive.scaling && (
                        <Box sx={{ width: { xs: "90%", md: "30vw" } }}>
                            <Slider
                                value={sliderValue}
                                marks={marks}
                                step={1}
                                min={0}
                                max={maxLevel - 1}
                                onChange={handleSliderChange}
                                size={matches ? "medium" : "small"}
                                sx={{
                                    minWidth: "100px",
                                    maxWidth:
                                        game === "endfield" ? "400px" : "200px",
                                    ml: 2,
                                }}
                            />
                        </Box>
                    )}
                </Stack>
                <ContentDialog
                    open={dialogOpen}
                    setOpen={setDialogOpen}
                    onClose={handleDialogClose}
                    header={getKeywordPopupTitle(game, currentKeyword)}
                    maxWidth="md"
                >
                    <KeywordPopup keyword={currentKeyword} attributes={{}} />
                </ContentDialog>
            </>
        );
    } else {
        return <></>;
    }
}
