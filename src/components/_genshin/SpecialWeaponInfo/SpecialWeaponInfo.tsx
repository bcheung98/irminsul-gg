import { useState } from "react";

// Component imports
import Slider from "@/components/Slider";
import Text from "@/components/Text";
import StatsTable from "@/components/StatsTable";
import SkillDescription from "@/components/SkillDescription";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";

// Helper imports
import { range } from "@/utils";

const levels = ["1", "20", "40", "60", "80", "90", "90"];

export default function SpecialWeaponInfo({ id }: { id: number }) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("sm"));

    if (!(id in weapons)) {
        return <></>;
    }

    const weapon = weapons[id as keyof typeof weapons];

    const maxLevel = levels.length;

    const [sliderValue, setSliderValue] = useState(maxLevel);
    const handleSliderChange = (_: Event, newValue: number | number[]) => {
        setSliderValue(newValue as number);
    };

    const marks = range(0, maxLevel).map((level) => ({
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
                {level - 1}
            </Text>
        ),
    }));

    const index = sliderValue - 1;
    const passiveLevels = [1, 1, 2, 2, 3, 3, 4];
    const refinementLevel = passiveLevels[index];

    return (
        <Stack spacing={2} divider={<Divider />}>
            <Stack spacing={3}>
                <Stack spacing={1} sx={{ width: { xs: "100%", md: "75%" } }}>
                    <Text weight="highlight" sx={{ minWidth: "60px" }}>
                        Unlock Level
                    </Text>
                    <Slider
                        value={sliderValue}
                        step={1}
                        min={1}
                        max={levels.length}
                        marks={marks}
                        onChange={handleSliderChange}
                        size={matches ? "medium" : "small"}
                        sx={{
                            minWidth: "100px",
                            maxWidth: { xs: "100%", sm: "50%" },
                            ml: "8px",
                        }}
                    />
                </Stack>
                <Stack spacing={2} sx={{ width: { xs: "100%", md: "75%" } }}>
                    <Stack spacing={1}>
                        <Text variant="h6" weight="highlight">
                            {weapon.titles[index]}
                        </Text>
                        <Text weight="highlight">Lv. {levels[index]}</Text>
                    </Stack>
                    <StatsTable
                        hideSlider
                        levels={levels}
                        data={weapon.data}
                        orientation="column"
                        sliderValue={sliderValue || levels.length}
                        handleSliderChange={handleSliderChange}
                        tableProps={{
                            sx: {
                                width: { xs: "100%", sm: "50%" },
                            },
                        }}
                    />
                </Stack>
                {sliderValue > 1 && (
                    <Card sx={{ p: 2, backgroundColor: theme.background(0) }}>
                        <Stack spacing={2}>
                            <Stack spacing={1}>
                                <Text weight="highlight">
                                    {`${weapon.passive.name} (R${refinementLevel})`}
                                </Text>
                                <Text
                                    component="span"
                                    variant="subtitle1"
                                    sx={{
                                        color: theme.text.description,
                                    }}
                                >
                                    <SkillDescription
                                        game="genshin"
                                        description={
                                            weapon.passive.scaling[
                                                refinementLevel - 1
                                            ]
                                        }
                                    />
                                </Text>
                            </Stack>
                            <Text variant="body2" sx={{ fontStyle: "italic" }}>
                                <SkillDescription
                                    game="genshin"
                                    description={weapon.passive.splash[index]}
                                />
                            </Text>
                        </Stack>
                    </Card>
                )}
            </Stack>
            <Stack spacing={1}>
                <Text variant="h6" weight="highlight">
                    Ascension
                </Text>
                <Text variant="subtitle1">
                    This weapon does not require any materials for ascension.
                </Text>
            </Stack>
        </Stack>
    );
}

const weapons = {
    11521: {
        titles: [
            "-",
            "Origin of Stellar Grace",
            "Melody of the Astral Voices",
            "Boundless Journey to the Starry Sea",
            "Solitary Drifting of the Astral Vessel",
            "Grand Wish of the Shifting Stars",
            "Twilight of Fallen Stars",
        ],
        data: [
            ["Level", ...levels],
            [
                "Base ATK|genshin/icons/stat-icons/ATK",
                46,
                122,
                235,
                382,
                532,
                608,
                608,
            ],
            [
                "CRIT Rate|genshin/icons/stat-icons/CRIT_Rate",
                "7.2%",
                "12.7%",
                "18.5%",
                "24.4%",
                "30.2%",
                "33.1%",
                "33.1%",
            ],
        ],
        passive: {
            name: "Traveler's Path",
            scaling: [
                'When the Traveler equips this, their ATK will increase by <span class="text-value">16%</span> for <span class="text-value">8</span>s after they hit an opponent. At the same time, they will also regenerate <span class="text-value">3</span> Elemental Energy. This effect can trigger once every <span class="text-value">5</span>s. This can be triggered even when the character is not on the field.',
                'When the Traveler equips this, their CRIT DMG increases by 6% for every Element they have resonated with. Additionally, the Traveler\'s ATK will also increase by <span class="text-value">20%</span> for 8s, and regenerate <span class="text-value">3</span> Elemental Energy, after they attack and hit an opponent. This effect can trigger once every 5s. This can be triggered even when the character is not on the field.',
                'When the Traveler equips this, their CRIT DMG increases by 6% for every Element they have resonated with. Additionally, the Traveler\'s ATK will also increase by <span class="text-value">24%</span> for 8s, and regenerate <span class="text-value">5</span> Elemental Energy, after they attack and hit an opponent. This effect can trigger once every 5s. This can be triggered even when the character is not on the field.',
                'When the Traveler equips this, their CRIT DMG increases by 6% for every Element they have resonated with. Additionally, the Traveler\'s ATK will also increase by <span class="text-value">32%</span> for 8s, and regenerate <span class="text-value">5</span> Elemental Energy, after they attack and hit an opponent. This effect can trigger once every 5s. This can be triggered even when the character is not on the field.',
                'When the Traveler equips this, their CRIT DMG increases by 6% for every Element they have resonated with. Additionally, the Traveler\'s ATK will also increase by <span class="text-value">40%</span> for 8s, and regenerate <span class="text-value">5</span> Elemental Energy, after they attack and hit an opponent. This effect can trigger once every 5s. This can be triggered even when the character is not on the field.',
            ],
            splash: [
                "",
                "The traveler journeyed far into foreign lands, all for a slim chance at redemption.",
                'It is not known when the traveler gave up on capturing sounds amidst the eternal silence.<br />"If that is the case, then allow me to say a few words."',
                "In some corner of the universe, there must be answers and hope.<br />How much time has slipped way since someone looked up at the starry sky with such a thought?",
                "Perhaps humans are no different from moths drawn to a flame.<br />But so be it. Even the most ordinary life yearns to survive.",
                "The darkness cannot dull the traveler's edge. With swords and plowshares aboard, a new beginning is well within reach.",
                "",
            ],
        },
    },
};
