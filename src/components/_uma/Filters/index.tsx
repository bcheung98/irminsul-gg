// Component imports
import RarityStars from "@/components/RarityStars";
import Text from "@/components/Text";
import UmaCharacterFilters from "./CharacterFilters";
import UmaSupportFilters from "./SupportFilters";
import UmaSkillFilters from "./SkillFilters";

// Helper imports
import {
    createFilterButtons,
    createGroupedFilterButtons,
} from "@/components/Filters";
import { rarities, rarityMap, specialties } from "@/data/uma/common";

// Type imports
import type { FilterGroups, FilterGroupsProps } from "@/types/filters";

export { UmaCharacterFilters, UmaSupportFilters, UmaSkillFilters };

export function umaFilters({ key }: FilterGroupsProps): FilterGroups {
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
            tag: "aptitude",
            buttons: [],
            groupButtons: createGroupedFilterButtons({
                groupItems: aptitudeButtons,
                dropdown: false,
                getLabel: (item: string) => item,
            }),
        },
        specialty: {
            name: "Specialty",
            tag: "specialty",
            buttons: createFilterButtons({
                items: specialties,
                url: "uma/icons/specialties",
                iconPadding: "2px",
            }),
        },
        rarity: {
            name: "Rarity",
            tag: "rarity",
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
            padding: key === "uma/characters" ? "4px 8px" : 0,
        },
        conditions: {
            name: "Conditions",
            tag: "conditions",
            buttons: [],
            groupButtons: createGroupedFilterButtons({
                groupItems: conditionButtons,
                dropdown: false,
                getLabel: (item: string) => item,
            }),
        },
        skillRarity: {
            name: "Rarity",
            tag: "skillRarity",
            buttons: [6, 3, 2, 1].map((rarity) => ({
                value: rarity,
                label: <Text variant="body2">{skillRarities[rarity - 1]}</Text>,
            })),
            padding: "4px 8px",
        },
    };
}
