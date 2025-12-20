// Component imports
import RarityStars from "@/components/RarityStars";
import Text from "@/components/Text";

// Helper imports
import {
    createFilterButtons,
    createGroupedFilterButtons,
} from "@/helpers/filters";
import { rarities, rarityMap, specialties } from "./common";

// Type imports
import { Filters, FilterGroupsProps, FilterGroups } from "@/types";
import {
    UmaAptitude,
    UmaRarity,
    UmaSkillRarity,
    UmaSpecialty,
} from "@/types/uma";

export function umaFilters<T extends Filters>({
    key,
    filters,
    setFilters,
}: FilterGroupsProps<T>): FilterGroups {
    const aptitudeButtons = {
        Track: ["Turf", "Dirt"],
        Distance: ["Sprint", "Mile", "Medium", "Long"],
        Style: ["Front", "Pace", "Late", "End"],
    };

    const conditionButtons = {
        None: ["No condition"],
        Track: ["Turf", "Dirt"],
        Distance: ["Sprint", "Mile", "Medium", "Long"],
        Style: ["Front", "Pace", "Late", "End"],
        Stage: [
            "Early-Race",
            "Mid-Race",
            "Late-Race",
            "Last-Spurt",
            "Corner",
            "Straight",
            "Final Corner",
            "Final Straight",
            "Slope",
        ],
    };

    const skillRarities = ["Normal", "Rare", "Unique", "_", "_", "Evolved"];

    return {
        aptitude: {
            name: "Aptitude",
            value: filters.aptitude,
            buttons: [],
            groupButtons: createGroupedFilterButtons({
                groupItems: aptitudeButtons,
                dropdown: false,
                getLabel: (item: string) => item,
            }),
            onChange: (_: React.BaseSyntheticEvent, newValues: UmaAptitude[]) =>
                setFilters(key, "aptitude", newValues),
        },
        specialty: {
            name: "Specialty",
            value: filters.specialty,
            buttons: createFilterButtons({
                items: specialties,
                url: "uma/icons/specialties",
                iconPadding: "2px",
            }),
            onChange: (
                _: React.BaseSyntheticEvent,
                newValues: UmaSpecialty[]
            ) => setFilters(key, "specialty", newValues),
        },
        rarity: {
            name: "Rarity",
            value: filters.rarity,
            buttons:
                key === "uma/characters"
                    ? rarities.slice(2).map((rarity) => ({
                          value: rarity,
                          label: (
                              <RarityStars
                                  rarity={rarity + 2}
                                  useRarityColor
                                  variant="h6"
                              />
                          ),
                      }))
                    : createFilterButtons({
                          items: rarities.slice(0, -2),
                          url: "uma/rarity",
                          getURL: (item: number) => rarityMap[item],
                          getTooltip: () => "",
                      }),
            onChange: (_: React.BaseSyntheticEvent, newValues: UmaRarity[]) =>
                setFilters(key, "rarity", newValues),
            padding: key === "uma/characters" ? "4px 8px" : 0,
        },
        conditions: {
            name: "Conditions",
            value: filters.conditions,
            buttons: [],
            groupButtons: createGroupedFilterButtons({
                groupItems: conditionButtons,
                dropdown: false,
                getLabel: (item: string) => item,
            }),
            onChange: (_: React.BaseSyntheticEvent, newValues: string[]) =>
                setFilters(key, "conditions", newValues),
        },
        skillRarity: {
            name: "Rarity",
            value: filters.skillRarity,
            buttons: [6, 3, 2, 1].map((rarity) => ({
                value: rarity,
                label: <Text variant="body2">{skillRarities[rarity - 1]}</Text>,
            })),
            onChange: (
                _: React.BaseSyntheticEvent,
                newValues: UmaSkillRarity[]
            ) => {
                let data = [...newValues];
                if (data.includes(3)) {
                    data.push(4, 5);
                } else {
                    const index4 = data.indexOf(4);
                    if (index4 > -1) {
                        data = data.splice(index4, -1);
                    }
                    const index5 = data.indexOf(5);
                    if (index5 > -1) {
                        data = data.splice(index5, -1);
                    }
                }
                setFilters(key, "skillRarity", data);
            },
            padding: "4px 8px",
        },
    };
}
