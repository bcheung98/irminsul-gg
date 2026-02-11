import { useEffect, useState } from "react";

// Component imports
import Image from "@/components/Image";

// MUI imports
import { useTheme } from "@mui/material/styles";

// Helper imports
import { usePlannerStore } from "@/stores";

// Type imports
import { CardMode, CostSliderValues } from "@/types/planner";
import { AttributeData } from "@/types";
import { EndfieldStatAttribute } from "@/types/endfield";
import { EndfieldCharacterPassive } from "@/types/endfield/character";

interface StatNodeProps {
    id: string;
    mode: CardMode;
    attributes: AttributeData;
    mainAttribute?: EndfieldStatAttribute;
    baseSkills?: EndfieldCharacterPassive[];
    talents?: EndfieldCharacterPassive[];
    levels?: number[];
    values: Record<string, CostSliderValues>;
}

export default function StatNode({
    id,
    mode,
    attributes,
    mainAttribute = "str",
    baseSkills = [],
    talents = [],
    values,
}: StatNodeProps) {
    const theme = useTheme();

    const index = id.slice(-1)[0];

    const [selected, setSelected] = useState(values[`${id}`].selected);
    const handleSelect = () => {
        setSelected(!selected);
    };

    const setItemValues = usePlannerStore()["endfield/setItemValues"];

    function getIcon() {
        if (id.startsWith("talent"))
            return `endfield/skills/${attributes.id}_talent${Number(index) < 3 ? 1 : 2}`;
        else if (id.startsWith("base")) {
            return `endfield/icons/base-skills/${baseSkills[Number(index) < 3 ? 0 : 1].icon}`;
        } else if (id.startsWith("outfitting")) {
            return `endfield/icons/Gear`;
        } else {
            return `endfield/icons/stat-icons/${mainAttribute?.toUpperCase()}`;
        }
    }

    function getTooltip() {
        if (id.startsWith("talent")) {
            const talentLevels = talents
                .map((skill) => skill.levels.filter((i) => i != 0))
                .flat();
            return `${talents[Number(index) < 3 ? 0 : 1].name} (E${talentLevels[Number(index) - 1]})`;
        } else if (id.startsWith("base")) {
            const baseSkillLevels = baseSkills
                .map((skill) => skill.levels)
                .flat();
            return `${baseSkills[Number(index) < 3 ? 0 : 1].name} (E${baseSkillLevels[Number(index) - 1]})`;
        } else if (id.startsWith("outfitting")) {
            return `Outfitting ${numerals[Number(index) - 1]} (E${index})`;
        } else {
            return `${charAttributes[mainAttribute]} +${attrValues[Number(index) - 1]}`;
        }
    }

    useEffect(() => {
        setItemValues({
            id: attributes.id!,
            skillKey: id,
            values: {
                start: 0,
                stop: 0,
                selected,
                type: id.startsWith("talent") ? "main" : "small",
            },
        });
    }, [selected]);

    return (
        <Image
            src={getIcon()}
            size={id.startsWith("talent") ? 40 : 32}
            responsive
            responsiveSize={0.2}
            style={{
                padding: id.startsWith("base") ? "0px" : "4px",
                borderRadius: id.startsWith("base") ? "4px" : "64px",
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

const numerals = ["I", "II", "III"];
const charAttributes = {
    str: "Strength",
    agi: "Agility",
    int: "Intellect",
    wil: "Will",
};
const attrValues = [10, 15, 15, 20];
