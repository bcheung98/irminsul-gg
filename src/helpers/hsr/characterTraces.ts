import type {
    HSRCharacterTraceNodeMain,
    HSRCharacterTraceNodeSmall,
    HSRCharacterTraceStats,
} from "@/types/hsr/character";

export function createCharacterTraceStats(
    traces: (HSRCharacterTraceNodeMain | HSRCharacterTraceNodeSmall)[],
) {
    const stats: HSRCharacterTraceStats = {};

    function visit(
        trace: HSRCharacterTraceNodeMain | HSRCharacterTraceNodeSmall,
        id: string,
    ) {
        if (!("name" in trace)) {
            stats[id] = trace.stat;
        }
        trace.subTraces?.forEach((subTrace, index) => {
            let nextID = incrementTraceNodeID(id);

            if (trace.subTraces!.length > 1) {
                nextID += `-${index}`;
            }

            visit(subTrace, nextID);
        });
    }

    traces.forEach((trace, index) => {
        visit(trace, `${String.fromCharCode(index + 65)}-1`);
    });

    return stats;
}

export function incrementTraceNodeID(id: string) {
    let splitID = id.split("-");
    splitID[1] = (parseInt(splitID[1]) + 1).toString();
    return splitID.join("-");
}
