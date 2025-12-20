import { useEffect, useState } from "react";

// Component imports
import Image from "@/components/Image";
import SkillDescription from "@/components/SkillDescription";

// MUI imports
import { useTheme } from "@mui/material/styles";

// Helper imports
import { usePlannerStore } from "@/stores";
import { characterBonusStats } from "@/data/wuwa/characterBonusStats";

// Type imports
import { CardMode, CostSliderValues } from "@/types/planner";
import { AttributeData } from "@/types";
import { WuWaBonusStat, WuWaCharacterBonusStats } from "@/types/wuwa/character";
import { splitJoin } from "@/utils";

interface StatNodeProps {
    id: string;
    mode: CardMode;
    attributes: AttributeData;
    bonusStats?: WuWaCharacterBonusStats;
    values: Record<string, CostSliderValues>;
}

export default function StatNode({
    id,
    mode,
    attributes,
    bonusStats = ["", ""],
    values,
}: StatNodeProps) {
    const theme = useTheme();

    const nodeNumber = Number(id.slice(-1)) % 2 ? 1 : 2;

    const [selected, setSelected] = useState(values[`${id}`].selected);
    const handleSelect = () => {
        setSelected(!selected);
    };

    const setItemValues = usePlannerStore()["wuwa/setItemValues"];

    function getIcon() {
        if (id.startsWith("passive"))
            return `wuwa/skills/${attributes.id}_${id}`;
        else {
            const index = ["3", "4", "5", "6"].includes(id.slice(-1)) ? 0 : 1;
            return `wuwa/icons/stat-icons/${splitJoin(bonusStats[index])}`;
        }
    }

    function getTooltip() {
        if (id.startsWith("passive")) return `Inherent Skill ${nodeNumber}`;
        else {
            const index = ["3", "4", "5", "6"].includes(id.slice(-1)) ? 0 : 1;
            const stat = bonusStats[index];
            const value = characterBonusStats[stat][nodeNumber - 1];
            return (
                <SkillDescription
                    game="wuwa"
                    description={`${formatCharacterBonusStats(stat)} +${value}`}
                />
            );
        }
    }

    useEffect(() => {
        setItemValues({
            id: attributes.id!,
            skillKey: `node-${id}`,
            values: {
                start: 0,
                stop: 0,
                selected,
                type: id.startsWith("passive") ? "main" : "small",
                skillKey: `${nodeNumber}`,
            },
        });
    }, [selected]);

    return (
        <Image
            src={getIcon()}
            size={id.startsWith("passive") ? 40 : 32}
            style={{
                padding: "4px",
                borderRadius: "64px",
                border: `2px solid ${theme.border.color.primary}`,
                backgroundColor: theme.iconBackground.primary,
                cursor: mode === "edit" ? "pointer" : "default",
                opacity: selected ? 1 : 0.35,
            }}
            tooltip={getTooltip()}
            onClick={mode === "edit" ? handleSelect : undefined}
        />
    );
}

function formatCharacterBonusStats(stat: WuWaBonusStat) {
    if (stat.endsWith("DMG Bonus")) {
        const element = stat.split(" ")[0];
        return `<span class="text-${element.toLowerCase()}">${element} DMG Bonus</span>`;
    } else {
        return stat;
    }
}
