import { Event, EventPropData } from "@/types/uma/event";

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
                            tag: "energy",
                            value: "+20",
                        },
                    ],
                },
                {
                    rewards: [
                        {
                            tag: "skill_points",
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
                            tag: "energy",
                            value: "+30",
                        },
                    ],
                },
                {
                    rewards: [
                        {
                            tag: "all_stats",
                            value: "+5",
                        },
                    ],
                },
                {
                    rewards: [
                        {
                            tag: "skill_points",
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
                            tag: "energy",
                            value: "-5",
                        },
                        {
                            tag: "last_trained_stat",
                            value: "+5",
                        },
                        {
                            tag: "heal_status_one",
                            random: true,
                        },
                        {
                            tag: "bond",
                            value: "+5",
                            data: 9002,
                        },
                    ],
                },
                {
                    rewards: [
                        {
                            tag: "energy",
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
                            tag: "power",
                            value: "+10",
                        },
                    ],
                },
                {
                    rewards: [
                        {
                            tag: "guts",
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
                            tag: "mood",
                            value: "-1",
                        },
                        {
                            tag: "last_trained_stat",
                            value: "-5",
                        },
                        {
                            tag: "obtain_status",
                            data: 6,
                            random: true,
                        },
                    ],
                },
                {
                    rewards: [
                        {
                            tag: "mood",
                            value: "-1",
                        },
                        {
                            tag: "last_trained_stat",
                            value: "-10",
                        },
                        {
                            tag: "obtain_status",
                            data: 6,
                            random: true,
                        },
                        {
                            tag: "di",
                        },
                        {
                            tag: "obtain_status",
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
                            tag: "energy",
                            value: "+10",
                        },
                        {
                            tag: "mood",
                            value: "-2",
                        },
                        {
                            tag: "last_trained_stat",
                            value: "-10",
                        },
                        {
                            tag: "random_stats",
                            value: "-10",
                            data: 2,
                        },
                        {
                            tag: "obtain_status",
                            data: 6,
                            random: true,
                        },
                    ],
                },
                {
                    rewards: [
                        {
                            tag: "mood",
                            value: "-3",
                        },
                        {
                            tag: "last_trained_stat",
                            value: "-10",
                        },
                        {
                            tag: "random_stats",
                            value: "-10",
                            data: 2,
                        },
                        {
                            tag: "obtain_status",
                            data: 6,
                            random: true,
                        },
                        {
                            tag: "di",
                        },
                        {
                            tag: "energy",
                            value: "+10",
                        },
                        {
                            tag: "obtain_status",
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
                            tag: "all_stats",
                            value: "+20",
                        },
                        { tag: "di" },
                        {
                            tag: "mood",
                            value: "-2",
                        },
                        {
                            tag: "all_stats",
                            value: "-15",
                        },
                        {
                            tag: "obtain_status",
                            data: 1,
                        },
                    ],
                },
                {
                    chances: [45, 55],
                    rewards: [
                        {
                            tag: "obtain_skill",
                            data: 200352,
                        },
                        {
                            tag: "obtain_skill",
                            data: 200382,
                        },
                        {
                            tag: "di",
                        },
                        {
                            tag: "energy",
                            value: "-20",
                        },
                        {
                            tag: "mood",
                            value: "-2",
                        },
                    ],
                },
                {
                    chances: [70, 30],
                    rewards: [
                        {
                            tag: "max_energy",
                            value: "+12",
                        },
                        {
                            tag: "energy",
                            value: "+40",
                        },
                        {
                            tag: "heal_status_all",
                        },
                        {
                            tag: "di",
                        },
                        {
                            tag: "energy",
                            value: "-20",
                        },
                        {
                            tag: "mood",
                            value: "-2",
                        },
                        {
                            tag: "obtain_status",
                            data: 1,
                        },
                    ],
                },
                {
                    chances: [85, 15],
                    rewards: [
                        {
                            tag: "energy",
                            value: "+20",
                        },
                        {
                            tag: "mood",
                            value: "+1",
                        },
                        {
                            tag: "obtain_status",
                            data: 8,
                        },
                        {
                            tag: "di",
                        },
                        {
                            tag: "energy",
                            value: "-10/-20",
                        },
                        {
                            tag: "mood",
                            value: "-1",
                        },
                        {
                            tag: "obtain_status",
                            data: 1,
                            random: true,
                        },
                    ],
                },
                {
                    rewards: [
                        {
                            tag: "energy",
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
                        tag: "energy",
                        value: "+10",
                    },
                    {
                        tag: "skill_points",
                        value: "+5",
                    },
                ],
            },
            {
                chances: [90, 10],
                rewards: [
                    {
                        tag: "energy",
                        value: "+30",
                    },
                    {
                        tag: "skill_points",
                        value: "+10",
                    },
                    {
                        tag: "di",
                    },
                    {
                        tag: "energy",
                        value: "+30",
                    },
                    {
                        tag: "skill_points",
                        value: "+10",
                    },
                    {
                        tag: "speed",
                        value: "-5",
                    },
                    {
                        tag: "power",
                        value: "+5",
                    },
                    {
                        tag: "obtain_status",
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
                            tag: props?.masterTrainer || "random_stats",
                            value: "+10",
                        },
                        {
                            tag: "obtain_status",
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
                            tag: "mood",
                            value: "+1",
                        },
                        {
                            tag: "skill_points",
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
                            tag: "all_stats",
                            value: "+5",
                        },
                        {
                            tag: "skill_points",
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
                            tag: "mood",
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
                            tag: "energy",
                            value: "-10",
                        },
                        {
                            tag: "mood",
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
                            tag: "all_stats",
                            value: "+5",
                        },
                        {
                            tag: "skill_points",
                            value: "+30",
                        },
                        {
                            tag: "mood",
                            value: "+2",
                        },
                        {
                            tag: "obtain_status",
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
                            tag: "energy",
                            value: "+15",
                        },
                        {
                            tag: "guts",
                            value: "-5",
                        },
                        {
                            tag: "mood",
                            value: "-1",
                        },
                        {
                            tag: "di",
                        },
                        {
                            tag: "energy",
                            value: "+15",
                        },
                        {
                            tag: "guts",
                            value: "-5",
                        },
                        {
                            tag: "obtain_status",
                            data: 2,
                        },
                    ],
                },
            ],
        },
    ];
};
