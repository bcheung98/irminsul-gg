import type { HSRWeaponType } from "@/types/hsr";
import type {
    HSRCharacterTraceNodeMain,
    HSRCharacterTraceNodeSmall,
} from "@/types/hsr/character";

export const characterTraceTemplates: Record<
    HSRWeaponType,
    (HSRCharacterTraceNodeMain | HSRCharacterTraceNodeSmall)[]
> = {
    Preservation: [
        {
            stat: "",
            unlock: "Lv. 1",
            subTraces: [
                {
                    name: "",
                    description: "",
                    unlock: "A2",
                    subTraces: [
                        {
                            stat: "",
                            unlock: "A2",
                            subTraces: [
                                {
                                    stat: "",
                                    unlock: "A3",
                                },
                            ],
                        },
                    ],
                },
                {
                    name: "",
                    description: "",
                    unlock: "A4",
                    subTraces: [
                        {
                            stat: "",
                            unlock: "A4",
                            subTraces: [
                                {
                                    stat: "",
                                    unlock: "A5",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: "",
            description: "",
            unlock: "A6",
            subTraces: [
                {
                    stat: "",
                    unlock: "A6",
                    subTraces: [
                        {
                            stat: "",
                            unlock: "Lv. 75",
                        },
                        {
                            stat: "",
                            unlock: "Lv. 80",
                        },
                    ],
                },
            ],
        },
        {
            stat: "",
            unlock: "A3",
        },
        {
            stat: "",
            unlock: "A5",
        },
    ],
    Hunt: [
        {
            name: "",
            description: "",
            unlock: "A2",
            subTraces: [
                {
                    stat: "",
                    unlock: "A2",
                    subTraces: [
                        {
                            stat: "",
                            unlock: "A3",
                        },
                    ],
                },
            ],
        },
        {
            name: "",
            description: "",
            unlock: "A4",
            subTraces: [
                {
                    stat: "",
                    unlock: "A4",
                    subTraces: [
                        {
                            stat: "",
                            unlock: "A5",
                        },
                    ],
                },
            ],
        },
        {
            name: "",
            description: "",
            unlock: "A6",
            subTraces: [
                {
                    stat: "",
                    unlock: "A6",
                    subTraces: [
                        {
                            stat: "",
                            unlock: "Lv. 75",
                        },
                        {
                            stat: "",
                            unlock: "Lv. 80",
                        },
                    ],
                },
            ],
        },
        {
            stat: "",
            unlock: "Lv. 1",
        },
        {
            stat: "",
            unlock: "A3",
        },
        {
            stat: "",
            unlock: "A5",
        },
    ],
    Erudition: [
        {
            name: "",
            description: "",
            unlock: "A2",
            subTraces: [
                {
                    stat: "",
                    unlock: "A2",
                    subTraces: [
                        {
                            stat: "",
                            unlock: "A3",
                        },
                        {
                            stat: "",
                            unlock: "A3",
                        },
                    ],
                },
            ],
        },
        {
            name: "",
            description: "",
            unlock: "A4",
            subTraces: [
                {
                    stat: "",
                    unlock: "A4",
                    subTraces: [
                        {
                            stat: "",
                            unlock: "A5",
                        },
                        {
                            stat: "",
                            unlock: "A5",
                        },
                    ],
                },
            ],
        },
        {
            name: "",
            description: "",
            unlock: "A6",
            subTraces: [
                {
                    stat: "",
                    unlock: "A6",
                },
                {
                    stat: "",
                    unlock: "Lv. 75",
                },
            ],
        },
        {
            stat: "",
            unlock: "Lv. 1",
        },
        {
            stat: "",
            unlock: "Lv. 80",
        },
    ],
    Nihility: [
        {
            name: "",
            description: "",
            unlock: "A2",
            subTraces: [
                {
                    stat: "",
                    unlock: "A2",
                    subTraces: [
                        {
                            stat: "",
                            unlock: "A3",
                            subTraces: [
                                {
                                    stat: "",
                                    unlock: "A3",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: "",
            description: "",
            unlock: "A4",
            subTraces: [
                {
                    stat: "",
                    unlock: "A4",
                    subTraces: [
                        {
                            stat: "",
                            unlock: "A5",
                            subTraces: [
                                {
                                    stat: "",
                                    unlock: "A5",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: "",
            description: "",
            unlock: "A6",
            subTraces: [
                {
                    stat: "",
                    unlock: "A6",
                },
                {
                    stat: "",
                    unlock: "Lv. 75",
                },
            ],
        },
        {
            stat: "",
            unlock: "Lv. 1",
            subTraces: [
                {
                    stat: "",
                    unlock: "Lv. 80",
                },
            ],
        },
    ],
    Destruction: [
        {
            name: "",
            description: "",
            unlock: "A2",
            subTraces: [
                {
                    stat: "",
                    unlock: "A2",
                    subTraces: [
                        {
                            stat: "",
                            unlock: "A3",
                            subTraces: [
                                {
                                    stat: "",
                                    unlock: "A3",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: "",
            description: "",
            unlock: "A4",
            subTraces: [
                {
                    stat: "",
                    unlock: "A4",
                    subTraces: [
                        {
                            stat: "",
                            unlock: "A5",
                            subTraces: [
                                {
                                    stat: "",
                                    unlock: "A5",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: "",
            description: "",
            unlock: "A6",
            subTraces: [
                {
                    stat: "",
                    unlock: "A6",
                    subTraces: [
                        {
                            stat: "",
                            unlock: "Lv. 75",
                        },
                        {
                            stat: "",
                            unlock: "Lv. 80",
                        },
                    ],
                },
            ],
        },
        {
            stat: "",
            unlock: "Lv. 1",
        },
    ],
    Harmony: [
        {
            name: "",
            description: "",
            unlock: "A2",
            subTraces: [
                {
                    stat: "",
                    unlock: "A2",
                    subTraces: [
                        {
                            stat: "",
                            unlock: "A3",
                        },
                    ],
                },
            ],
        },
        {
            name: "",
            description: "",
            unlock: "A4",
            subTraces: [
                {
                    stat: "",
                    unlock: "A4",
                    subTraces: [
                        {
                            stat: "",
                            unlock: "A5",
                        },
                    ],
                },
            ],
        },
        {
            name: "",
            description: "",
            unlock: "A6",
            subTraces: [
                {
                    stat: "",
                    unlock: "A6",
                    subTraces: [
                        {
                            stat: "",
                            unlock: "Lv. 75",
                        },
                        {
                            stat: "",
                            unlock: "Lv. 80",
                        },
                    ],
                },
            ],
        },
        {
            stat: "",
            unlock: "Lv. 1",
            subTraces: [
                {
                    stat: "",
                    unlock: "A3",
                },
                {
                    stat: "",
                    unlock: "A5",
                },
            ],
        },
    ],
    Abundance: [
        {
            name: "",
            description: "",
            unlock: "A2",
            subTraces: [
                {
                    stat: "",
                    unlock: "A2",
                    subTraces: [
                        {
                            stat: "",
                            unlock: "A3",
                            subTraces: [
                                {
                                    stat: "",
                                    unlock: "A3",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: "",
            description: "",
            unlock: "A4",
            subTraces: [
                {
                    stat: "",
                    unlock: "A4",
                    subTraces: [
                        {
                            stat: "",
                            unlock: "A5",
                            subTraces: [
                                {
                                    stat: "",
                                    unlock: "A5",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: "",
            description: "",
            unlock: "A6",
            subTraces: [
                {
                    stat: "",
                    unlock: "A6",
                },
                {
                    stat: "",
                    unlock: "Lv. 75",
                },
            ],
        },
        {
            stat: "",
            unlock: "Lv. 1",
        },
        {
            stat: "",
            unlock: "Lv. 80",
        },
    ],
    Remembrance: [
        {
            name: "",
            description: "",
            unlock: "A2",
            subTraces: [
                {
                    stat: "",
                    unlock: "A3",
                },
                {
                    stat: "",
                    unlock: "A4",
                },
            ],
        },
        {
            name: "",
            description: "",
            unlock: "A4",
            subTraces: [
                {
                    stat: "",
                    unlock: "A5",
                },
                {
                    stat: "",
                    unlock: "A5",
                },
            ],
        },
        {
            name: "",
            description: "",
            unlock: "A6",
            subTraces: [
                {
                    stat: "",
                    unlock: "A6",
                    subTraces: [
                        {
                            stat: "",
                            unlock: "Lv. 75",
                            subTraces: [
                                {
                                    stat: "",
                                    unlock: "Lv. 80",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            stat: "",
            unlock: "Lv. 1",
            subTraces: [
                {
                    stat: "",
                    unlock: "A2",
                },
                {
                    stat: "",
                    unlock: "A3",
                },
            ],
        },
    ],
    Elation: [
        {
            name: "",
            description: "",
            unlock: "A2",
            subTraces: [
                {
                    stat: "",
                    unlock: "A3",
                },
                {
                    stat: "",
                    unlock: "A3",
                },
            ],
        },
        {
            name: "",
            description: "",
            unlock: "A4",
            subTraces: [
                {
                    stat: "",
                    unlock: "A4",
                    subTraces: [
                        {
                            stat: "",
                            unlock: "A5",
                            subTraces: [
                                {
                                    stat: "",
                                    unlock: "A5",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            name: "",
            description: "",
            unlock: "A6",
            subTraces: [
                {
                    stat: "",
                    unlock: "A6",
                    subTraces: [
                        {
                            stat: "",
                            unlock: "Lv. 75",
                            subTraces: [
                                {
                                    stat: "",
                                    unlock: "Lv. 80",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            stat: "",
            unlock: "Lv. 1",
        },
        {
            stat: "",
            unlock: "A2",
        },
    ],
};
