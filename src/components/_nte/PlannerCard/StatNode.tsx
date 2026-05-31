import { useEffect, useState } from "react";

// Component imports
import Image from "@/components/Image";
import SkillDescription from "@/components/SkillDescription";

// MUI imports
import { useTheme } from "@mui/material/styles";

// Helper imports
import { usePlannerStore } from "@/stores";
import { splitJoin } from "@/utils";

// Type imports
import { CardMode, CostSliderValues } from "@/types/planner";
import { AttributeData } from "@/types";

interface StatNodeProps {
    id: string;
    mode: CardMode;
    attributes: AttributeData;
    values: Record<string, CostSliderValues>;
}

export default function StatNode({
    id,
    mode,
    attributes,
    values,
}: StatNodeProps) {
    const theme = useTheme();

    const nodeNumber = Number(id.slice(-1));

    const [selected, setSelected] = useState(values[`${id}`].selected);
    const handleSelect = () => {
        setSelected(!selected);
    };

    const setItemValues = usePlannerStore()["nte/setItemValues"];

    useEffect(() => {
        setItemValues({
            id: attributes.id!,
            skillKey: id,
            values: {
                start: 0,
                stop: 0,
                selected,
                type: "main",
                skillKey: `${nodeNumber}`,
            },
        });
    }, [selected]);

    return (
        <Image
            src={`nte/skills/${attributes.id}_${id}`}
            size={40}
            style={{
                padding: "4px",
                borderRadius: "64px",
                border: `2px solid ${theme.border.color.primary}`,
                backgroundColor: theme.iconBackground.primary,
                cursor: mode === "edit" ? "pointer" : "default",
                opacity: selected ? 1 : 0.35,
            }}
            tooltip={`Passive ${nodeNumber}`}
            onClick={mode === "edit" ? handleSelect : undefined}
        />
    );
}
