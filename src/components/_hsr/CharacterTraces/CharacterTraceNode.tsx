import { useEffect, useMemo } from "react";
import Xarrow from "react-xarrows";

// Component imports
import FlexBox from "@/components/FlexBox";
import Image from "@/components/Image";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";

// Helper imports
import { useSkillVersionContext } from "@/context";
import { useTextColor } from "@/helpers/styles";
import {
    formatCharacterBonusStatDescription,
    formatCharacterBonusStatTitle,
} from "./CharacterTraces.utils";
import { characterBonusStats } from "@/data/hsr/characterBonusStats";
import { incrementTraceNodeID } from "@/helpers/hsr/incrementTraceNodeID";

// Type imports
import { AttributeData } from "@/types";
import {
    HSRCharacterTraceNodeData,
    HSRCharacterTraceNodeMain,
    HSRCharacterTraceNodeSmall,
} from "@/types/hsr/character";

interface CharacterTraceNodeProps {
    id: string;
    selectedID: string;
    attributes: AttributeData;
    trace: HSRCharacterTraceNodeMain | HSRCharacterTraceNodeSmall;
    setTrace: (Trace: HSRCharacterTraceNodeData) => void;
}

export default function CharacterTraceNode({
    id,
    selectedID,
    attributes,
    trace,
    setTrace,
}: CharacterTraceNodeProps) {
    const theme = useTheme();

    const selected = id === selectedID;
    const textColor = useTextColor(theme.text);
    const color = textColor("hsr", attributes.element);

    const skillVersion = useSkillVersionContext();

    let title = "";
    let description = "";
    let stat = undefined;
    let imgSrc = "";
    let imgSize = 48;
    let unlock = trace.unlock;

    if ("name" in trace) {
        title = trace.name;
        description = trace.description;
        if (trace.variants && skillVersion.value !== "v1") {
            description =
                trace.variants.find(
                    (variant) => variant.version.value === skillVersion.value
                )?.description || trace.description;
        }
        imgSrc = `hsr/skills/${attributes.id}_${unlock.toLowerCase()}`;
    } else {
        title = formatCharacterBonusStatTitle(trace.stat);
        description = formatCharacterBonusStatDescription(
            trace.stat,
            characterBonusStats[trace.stat][unlock]
        );
        stat = trace.stat;
        imgSrc = `hsr/icons/stat-icons/${trace.stat}`;
        imgSize = 32;
    }

    const traceNodeData: HSRCharacterTraceNodeData = useMemo(
        () => ({
            id,
            title,
            description,
            unlock,
            stat,
        }),
        [skillVersion.value]
    );

    useEffect(() => {
        if (selected) {
            setTrace(traceNodeData);
        } else if (selectedID === "0") {
            if (attributes.weaponType === "Preservation" && id === "A-2-0") {
                setTrace(traceNodeData);
            } else if (
                attributes.weaponType !== "Preservation" &&
                id === "A-1"
            ) {
                setTrace(traceNodeData);
            }
        }
    }, [skillVersion.value]);

    return (
        <FlexBox spacing={5}>
            <Image
                id={`${attributes.id}-${id}`}
                src={imgSrc}
                size={imgSize}
                style={{
                    padding: "4px",
                    backgroundColor: theme.iconBackground.primary,
                    border: `2px solid ${
                        selected ? color : theme.border.color.primary
                    }`,
                    borderRadius: "64px",
                    boxShadow: selected ? `0 0 12px 4px ${color}` : "none",
                    transition: "box-shadow 250ms",
                    cursor: "pointer",
                }}
                onClick={() => setTrace(traceNodeData)}
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
                                <CharacterTraceNode
                                    id={nextID}
                                    selectedID={selectedID}
                                    attributes={attributes}
                                    trace={subTrace}
                                    setTrace={setTrace}
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
