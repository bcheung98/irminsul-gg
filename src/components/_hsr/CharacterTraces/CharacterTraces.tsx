import { useState } from "react";

// Component imports
import CharacterTraceNode from "./CharacterTraceNode";
import CharacterTraceInfo from "./CharacterTraceInfo";
import CharacterTraceTotalStat from "./CharacterTraceTotalStat";
import CharacterBuffs from "@/components/CharacterBuffs";
import ContentBox from "@/components/ContentBox";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

// Helper imports
import { useSkillContext, useSkillVersionContext } from "@/context";
import { useTextColor } from "@/helpers/styles";

// Type imports
import { AttributeData } from "@/types";
import { CharacterSkillsList, SkillKeyword } from "@/types/skill";
import { Materials } from "@/types/materials";
import {
    HSRCharacterTraceNodeData,
    HSRCharacterTraceNodeMain,
    HSRCharacterTraceNodeSmall,
} from "@/types/hsr/character";

interface CharacterTracesProps {
    traces: (HSRCharacterTraceNodeMain | HSRCharacterTraceNodeSmall)[];
    keywords?: SkillKeyword[];
    materials: Materials;
    attributes: AttributeData;
}

export default function CharacterTraces({
    traces,
    keywords,
    materials,
    attributes,
}: CharacterTracesProps) {
    const theme = useTheme();

    const textColor = useTextColor(theme.text);

    const buffs = useSkillVersionContext();

    const skillsContext = useSkillContext();
    let skills: CharacterSkillsList | undefined;
    if (skillsContext) {
        skills = skillsContext;
    }

    const [currentTrace, setCurrentTrace] =
        useState<HSRCharacterTraceNodeData | null>(null);

    const setTrace = (trace: HSRCharacterTraceNodeData) => {
        if (JSON.stringify(trace) !== JSON.stringify(currentTrace)) {
            setCurrentTrace(trace);
        }
    };

    return (
        <ContentBox header="Traces" actions={<CharacterBuffs {...buffs} />}>
            <Stack spacing={2} divider={<Divider />}>
                <Grid
                    container
                    columnSpacing={6}
                    rowSpacing={currentTrace ? 2 : 0}
                >
                    <Grid size="auto">
                        <Stack spacing={2} divider={<Divider />}>
                            {traces.map((trace, index) => (
                                <CharacterTraceNode
                                    key={index}
                                    id={`${String.fromCharCode(index + 65)}-1`}
                                    attributes={attributes}
                                    trace={trace}
                                    selectedID={currentTrace?.id || "0"}
                                    setTrace={setTrace}
                                />
                            ))}
                        </Stack>
                        <Divider
                            sx={{
                                mt: 2,
                                display: {
                                    xs: currentTrace !== null ? "flex" : "none",
                                    sm: "none",
                                },
                            }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: "grow" }}>
                        <CharacterTraceInfo
                            trace={currentTrace}
                            keywords={keywords}
                            attributes={attributes}
                            materials={materials}
                        />
                    </Grid>
                </Grid>
                <CharacterTraceTotalStat
                    traces={traces}
                    color={textColor("hsr", attributes.element)}
                />
            </Stack>
        </ContentBox>
    );
}
