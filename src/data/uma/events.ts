import type { Event, EventPropData } from "@/types/uma/event";

export const eventsCommon = ({ props }: { props?: EventPropData }): Event[] => {
    return [
        {
            name: "Dance Lesson",
            nameJP: "ダンスレッスン",
            options: [
                {
                    rewards: [
                        {
                            tag: props?.dance[0] || "",
                            value: "+10",
                        },
                    ],
                },
                {
                    rewards: [
                        {
                            tag: props?.dance[1] || "",
                            value: "+10",
                        },
                    ],
                },
            ],
        },
        {
            name: "New Year's Resolutions",
            nameJP: "新年の抱負",
            options: [
                {
                    rewards: [
                        {
                            tag: props?.newYear || "",
                            value: "+10",
                        },
                    ],
                },
                {
                    rewards: [
                        {
                            tag: "en",
                            value: "+20",
                        },
                    ],
                },
                {
                    rewards: [
                        {
                            tag: "pt",
                            value: "+20",
                        },
                    ],
                },
            ],
        },
        {
            name: "New Year's Shrine Visit",
            nameJP: "初詣",
            options: [
                {
                    rewards: [
                        {
                            tag: "en",
                            value: "+30",
                        },
                    ],
                },
                {
                    rewards: [
                        {
                            tag: "5s",
                            value: "+5",
                        },
                    ],
                },
                {
                    rewards: [
                        {
                            tag: "pt",
                            value: "+35",
                        },
                    ],
                },
            ],
        },
        {
            name: "Extra Training",
            nameJP: "追加の自主トレ",
            options: [
                {
                    rewards: [
                        {
                            tag: "en",
                            value: "-5",
                        },
                        {
                            tag: "ls",
                            value: "+5",
                        },
                        {
                            tag: "he",
                            random: true,
                        },
                        {
                            tag: "bo",
                            value: "+5",
                            data: 9002,
                        },
                    ],
                },
                {
                    rewards: [
                        {
                            tag: "en",
                            value: "+5",
                        },
                    ],
                },
            ],
        },
        {
            name: "At Summer Camp (Year 2)",
            nameJP: "夏合宿（2年目）にて",
            options: [
                {
                    rewards: [
                        {
                            tag: "po",
                            value: "+10",
                        },
                    ],
                },
                {
                    rewards: [
                        {
                            tag: "gu",
                            value: "+10",
                        },
                    ],
                },
            ],
        },
        {
            name: "Get Well Soon!",
            nameJP: "お大事に！",
            options: [
                {
                    rewards: [
                        {
                            tag: "mo",
                            value: "-1",
                        },
                        {
                            tag: "ls",
                            value: "-5",
                        },
                        {
                            tag: "se",
                            data: 6,
                            random: true,
                        },
                    ],
                },
                {
                    rewards: [
                        {
                            tag: "mo",
                            value: "-1",
                        },
                        {
                            tag: "ls",
                            value: "-10",
                        },
                        {
                            tag: "se",
                            data: 6,
                            random: true,
                        },
                        {
                            tag: "di",
                        },
                        {
                            tag: "se",
                            data: 10,
                        },
                    ],
                },
            ],
        },
        {
            name: "Don't Overdo It!",
            nameJP: "無茶は厳禁！",
            options: [
                {
                    rewards: [
                        {
                            tag: "en",
                            value: "+10",
                        },
                        {
                            tag: "mo",
                            value: "-2",
                        },
                        {
                            tag: "ls",
                            value: "-10",
                        },
                        {
                            tag: "rs",
                            value: "-10",
                            data: 2,
                        },
                        {
                            tag: "se",
                            data: 6,
                            random: true,
                        },
                    ],
                },
                {
                    rewards: [
                        {
                            tag: "mo",
                            value: "-3",
                        },
                        {
                            tag: "ls",
                            value: "-10",
                        },
                        {
                            tag: "rs",
                            value: "-10",
                            data: 2,
                        },
                        {
                            tag: "se",
                            data: 6,
                            random: true,
                        },
                        {
                            tag: "di",
                        },
                        {
                            tag: "en",
                            value: "+10",
                        },
                        {
                            tag: "se",
                            data: 10,
                        },
                    ],
                },
            ],
        },
        {
            name: "Just an Acupuncturist, No Worries! ☆",
            nameJP: "あんし～ん笹針師、参☆上",
            options: [
                {
                    chances: [30, 70],
                    rewards: [
                        {
                            tag: "5s",
                            value: "+20",
                        },
                        { tag: "di" },
                        {
                            tag: "mo",
                            value: "-2",
                        },
                        {
                            tag: "5s",
                            value: "-15",
                        },
                        {
                            tag: "se",
                            data: 1,
                        },
                    ],
                },
                {
                    chances: [45, 55],
                    rewards: [
                        {
                            tag: "sg",
                            data: 200352,
                        },
                        {
                            tag: "sg",
                            data: 200382,
                        },
                        {
                            tag: "di",
                        },
                        {
                            tag: "en",
                            value: "-20",
                        },
                        {
                            tag: "mo",
                            value: "-2",
                        },
                    ],
                },
                {
                    chances: [70, 30],
                    rewards: [
                        {
                            tag: "me",
                            value: "+12",
                        },
                        {
                            tag: "en",
                            value: "+40",
                        },
                        {
                            tag: "ha",
                        },
                        {
                            tag: "di",
                        },
                        {
                            tag: "en",
                            value: "-20",
                        },
                        {
                            tag: "mo",
                            value: "-2",
                        },
                        {
                            tag: "se",
                            data: 1,
                        },
                    ],
                },
                {
                    chances: [85, 15],
                    rewards: [
                        {
                            tag: "en",
                            value: "+20",
                        },
                        {
                            tag: "mo",
                            value: "+1",
                        },
                        {
                            tag: "se",
                            data: 8,
                        },
                        {
                            tag: "di",
                        },
                        {
                            tag: "en",
                            value: "-10/-20",
                        },
                        {
                            tag: "mo",
                            value: "-1",
                        },
                        {
                            tag: "se",
                            data: 6,
                            random: true,
                        },
                    ],
                },
                {
                    rewards: [
                        {
                            tag: "en",
                            value: "+10",
                        },
                    ],
                },
            ],
        },
    ];
};

export const eventSlowMetabolism = ({
    props,
}: {
    props?: EventPropData;
}): Event => {
    return {
        name: props?.miscEventNames[1].en || "",
        nameJP: props?.miscEventNames[1].jp || "",
        options: [
            {
                rewards: [
                    {
                        tag: "en",
                        value: "+10",
                    },
                    {
                        tag: "pt",
                        value: "+5",
                    },
                ],
            },
            {
                chances: [90, 10],
                rewards: [
                    {
                        tag: "en",
                        value: "+30",
                    },
                    {
                        tag: "pt",
                        value: "+10",
                    },
                    {
                        tag: "di",
                    },
                    {
                        tag: "en",
                        value: "+30",
                    },
                    {
                        tag: "pt",
                        value: "+10",
                    },
                    {
                        tag: "sp",
                        value: "-5",
                    },
                    {
                        tag: "po",
                        value: "+5",
                    },
                    {
                        tag: "se",
                        data: 4,
                    },
                ],
            },
        ],
    };
};

export const eventMisc = ({ props }: { props?: EventPropData }): Event[] => {
    return [
        {
            name: "Master Trainer",
            nameJP: "名指導",
            options: [
                {
                    rewards: [
                        {
                            tag: props?.masterTrainer || "rs",
                            value: "+10",
                        },
                        {
                            tag: "se",
                            data: 10,
                            random: true,
                        },
                    ],
                },
            ],
        },
        {
            name: "Fan Letter",
            nameJP: "ファンレター",
            options: [
                {
                    rewards: [
                        {
                            tag: "mo",
                            value: "+1",
                        },
                        {
                            tag: "pt",
                            value: "+30",
                        },
                    ],
                },
            ],
        },
        {
            name: props?.miscEventNames[0].en || "",
            nameJP: props?.miscEventNames[0].jp || "",
            options: [
                {
                    rewards: [
                        {
                            tag: "5s",
                            value: "+5",
                        },
                        {
                            tag: "pt",
                            value: "+5",
                        },
                    ],
                },
            ],
        },
        {
            name: props?.miscEventNames[2].en || "",
            nameJP: props?.miscEventNames[2].jp || "",
            options: [
                {
                    rewards: [
                        {
                            tag: "mo",
                            value: "-1",
                        },
                    ],
                },
            ],
        },
        {
            name: props?.miscEventNames[3].en || "",
            nameJP: props?.miscEventNames[3].jp || "",
            options: [
                {
                    rewards: [
                        {
                            tag: "en",
                            value: "-10",
                        },
                        {
                            tag: "mo",
                            value: "-1",
                        },
                    ],
                },
            ],
        },
        {
            name: props?.miscEventNames[4].en || "",
            nameJP: props?.miscEventNames[4].jp || "",
            options: [
                {
                    rewards: [
                        {
                            tag: "5s",
                            value: "+5",
                        },
                        {
                            tag: "pt",
                            value: "+30",
                        },
                        {
                            tag: "mo",
                            value: "+2",
                        },
                        {
                            tag: "se",
                            data: 7,
                            random: true,
                        },
                    ],
                },
            ],
        },
        {
            name: props?.miscEventNames[5].en || "",
            nameJP: props?.miscEventNames[5].jp || "",
            options: [
                {
                    rewards: [
                        {
                            tag: "en",
                            value: "+15",
                        },
                        {
                            tag: "gu",
                            value: "-5",
                        },
                        {
                            tag: "mo",
                            value: "-1",
                        },
                        {
                            tag: "di",
                        },
                        {
                            tag: "en",
                            value: "+15",
                        },
                        {
                            tag: "gu",
                            value: "-5",
                        },
                        {
                            tag: "se",
                            data: 2,
                        },
                    ],
                },
            ],
        },
    ];
};

export const eventsRace: Event[] = [
    {
        name: "Victory!",
        nameJP: "レース勝利！",
        options: [
            {
                rewards: [
                    { tag: "en", value: "-15" },
                    { tag: "rr", props: { raceType: "optional_win" } },
                    { tag: "race_related_hint", random: true },
                ],
            },
            {
                rewards: [
                    { tag: "en", value: "-5" },
                    { tag: "rr", props: { raceType: "optional_win" } },
                    { tag: "race_related_hint", random: true },
                    { tag: "di" },
                    { tag: "en", value: "-20" },
                    { tag: "rr", props: { raceType: "optional_win" } },
                    { tag: "race_related_hint", random: true },
                ],
            },
        ],
    },
    {
        name: "Solid Showing",
        nameJP: "レース入着",
        options: [
            {
                rewards: [
                    { tag: "en", value: "-20" },
                    { tag: "rr", props: { raceType: "optional_place" } },
                    { tag: "race_related_hint", random: true },
                ],
            },
            {
                rewards: [
                    { tag: "en", value: "-10" },
                    { tag: "rr", props: { raceType: "optional_place" } },
                    { tag: "race_related_hint", random: true },
                    { tag: "di" },
                    { tag: "en", value: "-30" },
                    { tag: "rr", props: { raceType: "optional_place" } },
                    { tag: "race_related_hint", random: true },
                ],
            },
        ],
    },
    {
        name: "Defeat",
        nameJP: "レース敗北",
        options: [
            {
                rewards: [
                    { tag: "en", value: "-25" },
                    { tag: "rr", props: { raceType: "optional_lose" } },
                    { tag: "race_related_hint", random: true },
                ],
            },
            {
                rewards: [
                    { tag: "en", value: "-15" },
                    { tag: "rr", props: { raceType: "optional_lose" } },
                    { tag: "race_related_hint", random: true },
                    { tag: "di" },
                    { tag: "en", value: "-35" },
                    { tag: "rr", props: { raceType: "optional_lose" } },
                    { tag: "race_related_hint", random: true },
                ],
            },
        ],
    },
    {
        name: "Etsuko's Elated Coverage",
        nameJP: "乙名史記者の悦楽取材",
        options: [
            {
                rewards: [
                    { tag: "en", value: "-15" },
                    { tag: "mo", value: "+1" },
                    { tag: "rr", props: { raceType: "optional_win" } },
                    { tag: "fa", value: "+500" },
                    { tag: "race_related_hint", random: true },
                    { tag: "bo", value: "+15", data: 9003 },
                ],
            },
        ],
    },
    {
        name: "Etsuko's Exhaustive Coverage",
        nameJP: "乙名史記者の徹底取材",
        options: [
            {
                rewards: [
                    { tag: "en", value: "-25" },
                    { tag: "mo", value: "-1" },
                    { tag: "rr", props: { raceType: "optional_lose" } },
                    { tag: "bo", value: "-10", data: 9003 },
                    { tag: "di" },
                    { tag: "en", value: "-15" },
                    { tag: "mo", value: "+1" },
                    { tag: "rr", props: { raceType: "optional_lose" } },
                    { tag: "bo", value: "+15", data: 9003 },
                ],
            },
            {
                rewards: [
                    { tag: "en", value: "-20" },
                    { tag: "rr", props: { raceType: "optional_lose" } },
                    { tag: "bo", value: "+10", data: 9003 },
                ],
            },
        ],
    },
];
