"use client";

import { BaseSyntheticEvent, useState } from "react";
import { useShallow } from "zustand/react/shallow";

// Component imports
import ContentBox from "@/components/ContentBox";
import SelectWithArrows from "@/components/SelectWithArrows";
import MenuItem from "@/components/MenuItem";
import TextLabel from "@/components/TextLabel";
import Text from "@/components/Text";
import { default as Tabs } from "@/components/Tabs";
import {
    GenshinCharacterInfoAvatar,
    GenshinWeaponInfoAvatar,
} from "@/components/InfoAvatar";

// MUI imports
import { useTheme } from "@mui/material/styles";
import { SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";

// Helper imports
import { useSettingsStore } from "@/stores/useSettingsStore";
import { getFarmableMaterials } from "@/helpers/genshin/getFarmableMaterials";
import { Day, days } from "@/helpers/dates";

// Type imports
import { GenshinCharacter, GenshinWeapon } from "@/types/genshin";

export default function FarmingSchedule(props: {
    characters: GenshinCharacter[];
    weapons: GenshinWeapon[];
}) {
    const theme = useTheme();

    const hideUnreleasedContent = useSettingsStore(
        useShallow((state) => state.hideUnreleasedContent)
    );

    const [tabValue, setTabValue] = useState(0);
    const handleTabChange = (_: BaseSyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const d = new Date().getDay();
    const today = days[d];

    const [index, setIndex] = useState(d);
    const handleIndexChange = (event: SelectChangeEvent) => {
        setIndex(Number(event.target.value));
    };
    const handleIndexChangeLeft = () => {
        if (index - 1 >= 0) {
            setIndex(index - 1);
        } else {
            setIndex(6);
        }
    };
    const handleIndexChangeRight = () => {
        if (index + 1 < days.length) {
            setIndex(index + 1);
        } else {
            setIndex(0);
        }
    };

    const formatDayString = (day: Day) => {
        if (day === today) {
            day += " (Today)";
        }
        return day;
    };

    const { characterMats, weaponMats } = getFarmableMaterials(
        days[index],
        hideUnreleasedContent
    );
    const characters = props.characters
        .filter((character) =>
            characterMats.includes(character.materials.talent.toString())
        )
        .sort((a, b) => a.fullName.localeCompare(b.fullName));
    const weapons = props.weapons
        .filter((weapon) =>
            weaponMats.includes(weapon.materials.weapon.toString())
        )
        .sort(
            (a, b) =>
                b.rarity - a.rarity ||
                a.displayName.localeCompare(b.displayName)
        );

    const selectProps = {
        index,
        data: days,
        handleIndexChange,
        handleIndexChangeLeft,
        handleIndexChangeRight,
    };

    function LabelText(props: { index: number; children: React.ReactNode }) {
        return (
            <Text
                variant="subtitle1"
                sx={{
                    color:
                        props.index === tabValue
                            ? theme.text.selected
                            : theme.text.primary,
                }}
            >
                {props.children}
            </Text>
        );
    }

    function TabPanel({
        materials,
        value,
        index,
    }: {
        materials: (string | undefined)[];
        value: number;
        index: number;
    }) {
        const getImgSrc = (material = "") => {
            return index
                ? `genshin/materials/weapon/${material}4`
                : `genshin/materials/talent/${material}3`;
        };

        const items = index ? weapons : characters;

        return (
            <Tabs.Panel value={value} index={index}>
                <Stack spacing={2} divider={<Divider />}>
                    {materials.map((material, matIndex) => (
                        <Stack key={material} spacing={1}>
                            <TextLabel
                                icon={getImgSrc(material)}
                                iconProps={{ size: 48 }}
                                title={material}
                                titleProps={{ variant: "h6" }}
                            />
                            <Grid container spacing={1}>
                                {items.map((item) =>
                                    "title" in item
                                        ? characterMats[matIndex] ===
                                              item.materials.talent && (
                                              <GenshinCharacterInfoAvatar
                                                  key={item.id}
                                                  character={item}
                                                  props={{
                                                      componentID: `${item.url}-farmingSchedule`,
                                                  }}
                                              />
                                          )
                                        : weaponMats[matIndex] ===
                                              item.materials.weapon && (
                                              <GenshinWeaponInfoAvatar
                                                  key={item.id}
                                                  weapon={item}
                                                  props={{
                                                      componentID: `${item.url}-farmingSchedule`,
                                                  }}
                                              />
                                          )
                                )}
                            </Grid>
                        </Stack>
                    ))}
                </Stack>
            </Tabs.Panel>
        );
    }

    return (
        <ContentBox
            header="Farming Schedule"
            actions={
                <SelectWithArrows
                    {...selectProps}
                    width="192px"
                    disabledLeft={false}
                    disabledRight={false}
                >
                    {days.map((day, index) => (
                        <MenuItem key={day} value={index}>
                            <Text variant="subtitle1">
                                {formatDayString(day)}
                            </Text>
                        </MenuItem>
                    ))}
                </SelectWithArrows>
            }
            contentProps={{ padding: 0 }}
        >
            <Tabs.List
                value={tabValue}
                onChange={handleTabChange}
                showIndicator
                tabcolor={theme.text.selected}
            >
                <Tabs.Selector
                    label={<LabelText index={0}>Characters</LabelText>}
                />
                <Tabs.Selector
                    label={<LabelText index={1}>Weapons</LabelText>}
                />
            </Tabs.List>
            {[characterMats, weaponMats].map((material, index) => (
                <TabPanel
                    key={index}
                    materials={material}
                    value={tabValue}
                    index={index}
                />
            ))}
        </ContentBox>
    );
}
