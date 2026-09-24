import { useEffect, useState } from "react";

// Component imports
import Image from "@/components/Image";

// MUI imports
import { useTheme } from "@mui/material/styles";

// Helper imports
import { usePlannerStore } from "@/stores";
import { getTalentNodes } from "@/helpers/endfield/getTalentNodes";

// Type imports
import type { CardMode, CostSliderValues } from "@/types/planner";
import type { AttributeData } from "@/types";
import type { EndfieldStatAttribute } from "@/types/endfield";
import type { EndfieldCharacterPassive } from "@/types/endfield/character";

interface StatNodeProps {
    id: string;
    mode: CardMode;
    attributes: AttributeData;
    mainAttribute?: EndfieldStatAttribute;
    baseSkills?: EndfieldCharacterPassive[];
    talents?: EndfieldCharacterPassive[];
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

    const index = Number(id.slice(-1));

    const [selected, setSelected] = useState(values[id]?.selected ?? true);
    const handleSelect = () => {
        setSelected(!selected);
    };

    const setItemValues = usePlannerStore(
        (state) => state[`endfield/setItemValues`],
    );

    const talentNode = getTalentNodes(talents)[index - 1];

    const baseSkillNodes = baseSkills.flatMap((skill) =>
        skill.levels.map((level) => ({
            skill,
            level,
        })),
    );
    const baseSkillNode = baseSkillNodes[index - 1];

    function getIcon() {
        if (id.startsWith("talent")) {
            return talentNode
                ? `endfield/skills/${attributes.id}_talent${talentNode.talentIndex + 1}`
                : "";
        } else if (id.startsWith("base")) {
            return baseSkillNode
                ? `endfield/icons/base-skills/${baseSkillNode.skill.icon}`
                : "";
        } else if (id.startsWith("outfitting")) {
            return `endfield/icons/Gear`;
        } else {
            return `endfield/icons/stat-icons/${mainAttribute?.toUpperCase()}`;
        }
    }

    function getTooltip() {
        if (id.startsWith("talent")) {
            return talentNode
                ? `${talentNode.talent.name} (E${talentNode.level})`
                : "";
        } else if (id.startsWith("base")) {
            return baseSkillNode
                ? `${baseSkillNode.skill.name} (E${baseSkillNode.level})`
                : "";
        } else if (id.startsWith("outfitting")) {
            return `Outfitting ${numerals[index - 1]} (E${index})`;
        } else {
            return `${charAttributes[mainAttribute]} +${attrValues[index - 1]}`;
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
