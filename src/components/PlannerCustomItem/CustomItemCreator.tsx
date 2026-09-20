import { useEffect, useState } from "react";

// Component imports
import FlexBox from "@/components/FlexBox";
import Text from "@/components/Text";
import SearchBar from "@/components/SearchBar";
import NumberField from "@/components/NumberField";
import { AddCustomAttribute } from "./AddCustomAttribute";
import { AddCustomMaterial } from "./AddCustomMaterial";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

// Helper imports
import { useGameTag } from "@/context";
import { usePlannerStore } from "@/stores";
import { objectKeys } from "@/utils";
import { formatMaterialKey } from "@/components/PlannerSelector/PlannerSelector.utils";
import { useFilterGroups } from "@/components/Filters";
import {
    createCustomItem,
    createCustomItemId,
    createCustomItemName,
} from "./PlannerCustomItem.utils";

// Type imports
import type { GameNoUma, Item } from "@/types";
import type { PlannerItemData } from "@/types/planner";
import type { FilterKey } from "@/types/filters";
import type { CustomItemCreatorProps } from "./PlannerCustomItem.types";

export function CustomItemCreator({
    label,
    sampleItem,
    handleSelect,
    handleClose,
    groups,
    type,
}: CustomItemCreatorProps) {
    const game = useGameTag() as GameNoUma;

    const theme = useTheme();

    const store = usePlannerStore();
    const items = store[`${game}/items`];

    const [inputValue, setInputValue] = useState(() =>
        createCustomItemName(items, label),
    );
    const handleInputChange = (event: React.BaseSyntheticEvent) => {
        setInputValue(event.target.value);
    };

    const [item, setItem] = useState<Item>(() =>
        createCustomItem(game, type, groups),
    );

    const attributeKeys = groups.map((attr) => attr.tag);
    const materialKeys = objectKeys(sampleItem?.materials ?? {});

    const materialGroups = useFilterGroups(game, {
        key: `${game}/${type}` as FilterKey,
    });

    const [valid, setValid] = useState(false);

    const handleSubmit = () => {
        handleSelect({
            ...item,
            id: createCustomItemId(items),
            name: inputValue,
            displayName: inputValue,
        } as PlannerItemData);
    };

    useEffect(() => {
        setValid(
            ((item: Item) => {
                for (const key of attributeKeys) {
                    if (!item[key]) {
                        return false;
                    }
                }
                for (const key of materialKeys) {
                    if (!item.materials[key]) {
                        return false;
                    }
                }
                return true;
            })(item),
        );
    }, [item]);

    return (
        <Stack
            spacing={2}
            sx={{ p: 2, backgroundColor: theme.background(1, "light") }}
            divider={<Divider />}
        >
            <Stack spacing={2}>
                <SearchBar
                    placeholder={`Name`}
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyDown={(event: React.KeyboardEvent) => {
                        if (event.key === "Enter") {
                            event.preventDefault();
                        }
                    }}
                    inputIcon={<></>}
                    height="32px"
                />
                <Stack spacing={1}>
                    <Stack>
                        {groups.map((filter) => (
                            <AddCustomAttribute
                                key={filter.tag}
                                item={item}
                                setItem={setItem}
                                filter={filter}
                            />
                        ))}
                    </Stack>
                    {game === "nte" && type === "characters" && (
                        <NTEAddCustomLifeSkills
                            lifeSkills={item.lifeSkills}
                            setItem={setItem}
                        />
                    )}
                </Stack>
                {materialKeys.map((key) => (
                    <AddCustomMaterial
                        key={key}
                        materials={
                            materialGroups[
                                formatMaterialKey(game, key.toString())
                            ]
                        }
                        materialKey={key.toString()}
                        setItem={setItem}
                    />
                ))}
            </Stack>
            <FlexBox spacing={[1, 2]} wrap sx={{ justifyContent: "right" }}>
                <Button
                    variant="contained"
                    color="error"
                    onClick={handleClose}
                    disableRipple
                    sx={{ p: "4px 16px" }}
                >
                    <Text variant="body2" weight="highlight">
                        Cancel
                    </Text>
                </Button>
                <Button
                    variant="contained"
                    color="success"
                    onClick={handleSubmit}
                    disableRipple
                    sx={{
                        p: "4px 16px",
                        "&.Mui-disabled": {
                            backgroundColor: theme.palette.success.main,
                            color: theme.text.primary,
                            opacity: 0.5,
                            cursor: "not-allowed",
                        },
                    }}
                    disabled={!valid}
                >
                    <Text variant="body2" weight="highlight">
                        Add
                    </Text>
                </Button>
            </FlexBox>
        </Stack>
    );
}

const MAX_LIFE_SKILL_COUNT = 2;

const MIN_LIFE_SKILL_LEVEL = 1;
const MAX_LIFE_SKILL_LEVEL = 5;

const DEFAULT_LIFE_SKILLS = [5, 2];

function NTEAddCustomLifeSkills({
    lifeSkills = DEFAULT_LIFE_SKILLS,
    setItem,
}: {
    lifeSkills: number[];
    setItem: React.Dispatch<React.SetStateAction<Item>>;
}) {
    const handleCountChange = () => {
        setItem((item) => ({
            ...item,
            lifeSkills:
                item.lifeSkills?.length === MAX_LIFE_SKILL_COUNT
                    ? item.lifeSkills.slice(0, 1)
                    : [...(item.lifeSkills ?? [5]), 2],
        }));
    };

    const handleLevelChange = (index: number) => (newValue: number | null) => {
        if (newValue === null) return;

        const levels = Math.min(
            Math.max(Math.round(newValue), MIN_LIFE_SKILL_LEVEL),
            MAX_LIFE_SKILL_LEVEL,
        );

        setItem((item) => ({
            ...item,
            lifeSkills: (item.lifeSkills ?? DEFAULT_LIFE_SKILLS).map(
                (value: number, i: number) => (i === index ? levels : value),
            ),
        }));
    };

    return (
        <FlexBox spacing={1} sx={{ alignItems: "flex-start" }}>
            <Text
                variant="subtitle1"
                weight="highlight"
                sx={{ minWidth: "80px" }}
            >
                Life Skills
            </Text>
            <Stack spacing={1} sx={{ ml: 0.5 }}>
                {lifeSkills.map((levels, index) => (
                    <Stack key={index} spacing={0.5}>
                        <Text variant="subtitle2" weight="highlight">
                            No. of Levels
                        </Text>
                        <FlexBox spacing={2}>
                            <NumberField
                                min={MIN_LIFE_SKILL_LEVEL}
                                max={MAX_LIFE_SKILL_LEVEL}
                                value={levels}
                                smallStep={1}
                                largeStep={2}
                                size="small"
                                onValueChange={handleLevelChange(index)}
                                style={{ width: "25%", minWidth: "80px" }}
                            />
                            {lifeSkills.length === index + 1 && (
                                <Button
                                    variant="contained"
                                    color={!index ? "info" : "error"}
                                    onClick={handleCountChange}
                                    disableRipple
                                    sx={{ p: "4px 16px" }}
                                >
                                    <Text variant="body2" weight="highlight">
                                        {`${!index ? "Add" : "Remove"} Life Skill`}
                                    </Text>
                                </Button>
                            )}
                        </FlexBox>
                    </Stack>
                ))}
            </Stack>
        </FlexBox>
    );
}
