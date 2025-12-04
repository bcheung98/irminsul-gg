export function incrementTraceNodeID(id: string) {
    let splitID = id.split("-");
    splitID[1] = (parseInt(splitID[1]) + 1).toString();
    return splitID.join("-");
}
