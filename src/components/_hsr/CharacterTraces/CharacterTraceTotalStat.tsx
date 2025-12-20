// Component imports
import SkillDescription from "@/components/SkillDescription";
import TextLabel from "@/components/TextLabel";
import Text from "@/components/Text";

// MUI imports
import { useTheme } from "@mui/material/styles";

// Helper imports
import { characterBonusStats } from "@/data/hsr/characterBonusStats";
import { formatCharacterBonusStats } from "./CharacterTraces.utils";

// Type imports
import {
    BonusStat,
    HSRCharacterTraceNodeMain,
    HSRCharacterTraceNodeSmall,
} from "@/types/hsr/character";

export default function CharacterTraceTotalStat({
    color,
    traces,
}: {
    color: string;
    traces: (HSRCharacterTraceNodeMain | HSRCharacterTraceNodeSmall)[];
}) {
    const theme = useTheme();

    const traceStats = {} as Record<BonusStat, number>;

    function calculateTraceStats(
        traces: (HSRCharacterTraceNodeMain | HSRCharacterTraceNodeSmall)[]
    ) {
        traces.forEach((trace) => {
            if ("stat" in trace) {
                const stat = trace.stat;
                let value = characterBonusStats[trace.stat][trace.unlock];
                if (stat !== "SPD") {
                    value = value.slice(0, -1);
                }
                if (!traceStats[stat]) {
                    traceStats[stat] = 0;
                }
                traceStats[stat] += parseFloat(value);
            }
            if (trace.subTraces) {
                calculateTraceStats(trace.subTraces);
            }
        });
    }

    calculateTraceStats(traces);

    return (
        <>
            <Text weight="highlight">Total Stat Bonus from Traces</Text>
            {Object.entries(traceStats).map(([stat, value]) => (
                <TextLabel
                    key={stat}
                    icon={`hsr/icons/stat-icons/${stat}`}
                    iconProps={{
                        size: 36,
                        styles: {
                            border: `2px solid ${color}`,
                            borderRadius: "64px",
                            padding: "4px",
                            backgroundColor: theme.iconBackground.primary,
                        },
                    }}
                    title={
                        <SkillDescription
                            game="hsr"
                            description={`${formatCharacterBonusStats(
                                stat as BonusStat
                            )} +${parseFloat(value.toFixed(1))}${
                                stat !== "SPD" ? "%" : ""
                            }`}
                        />
                    }
                    titleProps={{ variant: "body1" }}
                />
            ))}
        </>
    );
}
