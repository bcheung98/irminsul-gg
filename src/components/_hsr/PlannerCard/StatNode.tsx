import { useEffect, useState } from "react";
import Xarrow from "react-xarrows";

// Component imports
import FlexBox from "@/components/FlexBox";
import Image from "@/components/Image";
import SkillDescription from "@/components/SkillDescription";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";

// Helper imports
import { usePlannerStore } from "@/stores";
import { formatCharacterBonusStats } from "../CharacterTraces/CharacterTraces.utils";
import { characterBonusStats } from "@/data/hsr/characterBonusStats";
import { incrementTraceNodeID } from "@/helpers/hsr/characterTraces";

// Type imports
import type {
    HSRCharacterTraceNodeMain,
    HSRCharacterTraceNodeSmall,
    HSRCharacterTraceStats,
} from "@/types/hsr/character";
import type {
    CardMode,
    CostSliderValues,
    PlannerItemData,
} from "@/types/planner";

const defaultNodeValues: CostSliderValues = {
    start: 0,
    stop: 0,
    selected: true,
};

interface StatNodeProps {
    id: string;
    mode: CardMode;
    attributes: PlannerItemData;
    trace: HSRCharacterTraceNodeMain | HSRCharacterTraceNodeSmall;
    traceStats?: HSRCharacterTraceStats;
    values: Record<string, CostSliderValues>;
}

export default function StatNode({
    id,
    mode,
    attributes,
    trace,
    traceStats,
    values,
}: StatNodeProps) {
    const theme = useTheme();

    const nodeValues = values[`trace-${id}`] ?? defaultNodeValues;

    const [selected, setSelected] = useState(nodeValues.selected);
    const handleSelect = () => {
        setSelected(!selected);
    };

    const setItemValues = usePlannerStore(
        (state) => state[`hsr/setItemValues`],
    );

    let title = "";
    let imgSrc = "";
    let imgSize = 40;
    let unlock = trace.unlock;
    const stat = traceStats?.[id];

    // Main trace node
    if ("name" in trace) {
        title = `${unlock} Trace`;
        if (!attributes.custom) {
            imgSrc = `hsr/skills/${attributes.id}_${unlock.toLowerCase()}`;
        }
    }
    // Minor trace node
    else if (stat) {
        title = `${formatCharacterBonusStats(stat)} +${
            characterBonusStats[stat][unlock]
        } (${unlock})`;
        imgSrc = `hsr/icons/stat-icons/${stat}`;
        imgSize = 32;
    }
    // Custom minor trace node
    else {
        title = `${id} (${unlock})`;
        imgSize = 32;
    }

    useEffect(() => {
        setItemValues({
            id: attributes.id!,
            skillKey: `trace-${id}`,
            values: {
                start: 0,
                stop: 0,
                selected,
                type: "name" in trace ? "main" : "small",
                skillKey: unlock,
            },
        });
    }, [selected]);

    return (
        <FlexBox spacing={3}>
            <Image
                id={`${attributes.id}-${id}`}
                src={imgSrc}
                size={imgSize}
                responsive
                responsiveSize={0.2}
                style={{
                    padding: "4px",
                    backgroundColor: theme.iconBackground.primary,
                    border: `2px solid ${theme.border.color.primary}`,
                    borderRadius: "64px",
                    cursor: mode === "edit" ? "pointer" : "default",
                    opacity: selected ? 1 : 0.35,
                }}
                tooltip={<SkillDescription game="hsr" description={title} />}
                onClick={mode === "edit" ? handleSelect : undefined}
            />
            {trace.subTraces && (
                <Stack spacing={2}>
                    {trace.subTraces.map((subTrace, index) => {
                        let nextID = incrementTraceNodeID(id);
                        // If there is more than one child node, add an extra identifier to the ID
                        if (trace.subTraces && trace.subTraces.length > 1) {
                            nextID = nextID + `-${index}`;
                        }
                        return (
                            <div key={index}>
                                <StatNode
                                    id={nextID}
                                    mode={mode}
                                    attributes={attributes}
                                    trace={subTrace}
                                    traceStats={traceStats}
                                    values={values}
                                />
                                <Xarrow
                                    start={`${attributes.id}-${id}`}
                                    end={`${attributes.id}-${nextID}`}
                                    showHead={false}
                                    path="grid"
                                    color={theme.text.description}
                                    strokeWidth={2}
                                    startAnchor="right"
                                    endAnchor="left"
                                />
                            </div>
                        );
                    })}
                </Stack>
            )}
        </FlexBox>
    );
}
