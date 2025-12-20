import { StatusEffect } from "@/types/uma/event";

export const statusEffects: StatusEffect[] = [
    {
        id: 1,
        name: "Night Owl",
        description:
            "Before you know it, it's way past bedtime. Lack of sleep may cause her to lose Energy.",
        nameJP: "夜ふかし気味",
        descriptionJP:
            "ついつい夜ふかしをしてしまう寝不足で体力が下がることがある",
    },
    {
        id: 2,
        name: "Slacker",
        description:
            '"I don\'t really feel like practicing today..." May not show up to training.',
        nameJP: "なまけ癖",
        descriptionJP:
            "今日は練習に行かなくてもいっか……トレーニングに来ないことがある",
    },
    {
        id: 3,
        name: "Skin Outbreak",
        description:
            "Skin often doesn't cooperate at that age. May suffer from drops in Mood.",
        nameJP: "肌あれ",
        descriptionJP: "肌あれが気になるお年頃やる気が下がってしまうことがある",
    },
    {
        id: 4,
        name: "Slow Metabolism",
        description:
            "She's starting to put on some weight. Cannot gain Speed from training.",
        nameJP: "太り気味",
        descriptionJP:
            "食べ過ぎで体がちょっと太めトレーニングでスピードが上がらなくなる",
    },
    {
        id: 5,
        name: "Migraine",
        description:
            "These migraines are getting her down. Cannot gain improvements in Mood.",
        nameJP: "片頭痛",
        descriptionJP: "片頭痛でちょっと憂鬱な気分やる気が上がらなくなる",
    },
    {
        id: 6,
        name: "Practice Poor",
        description:
            "Whoa! Be careful not to trip! Has an increased chance of failing training.",
        nameJP: "練習ベタ",
        descriptionJP: "おっと……足元には気を付けて！トレーニングが失敗しやすい",
    },
    {
        id: 7,
        name: "Fast Learner",
        description:
            "She picks things up so easily! Gains all kinds of tactical hints.",
        nameJP: "切れ者",
        descriptionJP: "飲み込みの早さはピカイチ！あらゆる戦術のヒントを得る",
    },
    {
        id: 8,
        name: "Charming ○",
        description:
            '"Training with you is fun!" Builds friendships with her training partners faster.',
        nameJP: "愛嬌○",
        descriptionJP:
            "一緒に練習すると楽しいね！トレーニング相手ともっと仲良くなれる",
    },
    {
        id: 9,
        name: "Hot Topic",
        description:
            '"Exemplary!", "She\'s the talk of the racing world!" Builds rapport with Etsuko Otonashi and Director Akikawa faster.',
        nameJP: "注目株",
        descriptionJP:
            "傑物ッ！　学園を背負って立つ存在！！記者や理事長たちとの交流が評価や成長に繋がりやすくなる",
    },
    {
        id: 10,
        name: "Practice Perfect ○",
        description:
            "She stays focused during practice. Has a decreased chance of failing training.",
        nameJP: "練習上手○",
        descriptionJP: "練習でも準備は怠りませんトレーニングが失敗しにくい",
    },
    {
        id: 11,
        name: "Practice Perfect ◎",
        description:
            "Practice makes perfect! Has a greatly decreased chance of failing training.",
        nameJP: "練習上手◎",
        descriptionJP:
            "丁寧な練習で明日の勝利をつかもうトレーニングがとても失敗しにくい",
    },
    {
        id: 12,
        name: "Under the Weather",
        description:
            "Some unknown issue is bringing her mind and body down. Has a greatly increased chance of failing training until fall.",
        nameJP: "小さなほころび",
        descriptionJP:
            "原因不明の不調で心も体も沈む……秋までトレーニングがとても失敗しやすい",
    },
    {
        id: 13,
        name: "Shining Brightly",
        description:
            "Both mind and body are in top condition! Has a decreased chance of failing training.",
        nameJP: "大輪の輝き",
        descriptionJP:
            "心身ともに充実して元気いっぱい！トレーニングが失敗しにくい",
    },
    {
        id: 14,
        name: "Fan Promise (Hokkaido)",
        description:
            "Win a race at Sapporo or Hakodate to fulfill her promise and get a boost from her fans.",
        nameJP: "ファンとの約束・北海道",
        descriptionJP:
            "札幌・函館でのレースに勝利するとファンと再会して力をもらえる",
    },
    {
        id: 15,
        name: "Fan Promise (Hokuto)",
        description:
            "Win a race at Fukushima or Niigata to fulfill her promise and get a boost from her fans.",
        nameJP: "ファンとの約束・北東",
        descriptionJP:
            "福島・新潟・盛岡でのレースに勝利するとファンと再会して力をもらえる",
    },
    {
        id: 16,
        name: "Fan Promise (Nakayama)",
        description:
            "Wins a race at Nakayama to fulfill her promise and get a boost from her fans.",
        nameJP: "ファンとの約束・千葉",
        descriptionJP:
            "中山・船橋でのレースに勝利するとファンと再会して力をもらえる",
    },
    {
        id: 17,
        name: "Fan Promise (Kansai)",
        description:
            "Win a race at Kyoto or Hanshin to fulfill her promise and get a boost from her fans.",
        nameJP: "ファンとの約束・関西",
        descriptionJP:
            "京都・阪神でのレースに勝利するとファンと再会して力をもらえる",
    },
    {
        id: 18,
        name: "Fan Promise (Kokura)",
        description:
            "Win a race at Kokura to fulfill her promise and get a boost from her fans.",
        nameJP: "ファンとの約束・小倉",
        descriptionJP: "小倉でのレースに勝利するとファンと再会して力をもらえる",
    },
    {
        id: 19,
        name: "Not Ready",
        description:
            "She's just not quite race-ready... Competing in races may lead to fatigue.",
        nameJP: "まだまだ準備中",
        descriptionJP:
            "身体がまだ本格化の時期に入っていない… …レースに出走すると疲れてしまうことがある",
    },
    {
        id: 20,
        name: "Glass Legs",
        description:
            "Can shine in objective races as long as not afflicted by the Bad Practice condition, but will build up fatigue in her legs if racing continuously.\nParticipating in a race two turns in a row will cause the loss of 10 energy and trigger the Bad Practice condition. Doesn't apply if the second race is an objective race.",
        nameJP: "ガラスの脚",
        descriptionJP:
            "練習ベタで出走しない限り目標レースで輝きを放ち成長しやすいただし繊細な脚はレースが続くと疲れてしまう",
    },
    {
        id: 21,
        name: "Eerie Signals",
        description:
            "Disturbed qi flow makes it easier for bad things to happen.\nWinning races becomes difficult.",
        nameJP: "怪しい雲行き",
        descriptionJP: "乱れた氣脈によって悪いことが起きやすくなってしまう",
    },
    {
        id: 22,
        name: "Promises・Kawasaki",
        description:
            "Gain strength by reuniting with your fans.\nWin a race held at the Kawasaki racetrack to gain 10 Power and Wisdom, 1 Mood level, 10 Skill Points, and a level 5 hint for the respective racetrack green skill.",
        nameJP: "ファンとの約束・川崎",
        descriptionJP: "川崎でのレースに勝利するとファンと再会して力をもらえる",
    },
    {
        id: 23,
        name: "Hero's Brilliance",
        description:
            "Head into the race for the final crown exuding the unmistakable determination of a true hero\nTemporarily raises all stats by ~350 for the duration of the Senior year Arima Kinen only.",
        nameJP: "英雄の光輝",
        descriptionJP:
            "最後の一冠を賭けたレースで眩い意志の輝きを放ち紛うことなき英雄の力を発揮する",
    },
    {
        id: 24,
        name: "Flower Bud Awaiting Spring",
        description:
            "Your legs cannot yet withstand the strain of racing, so participating in races may lead to exhaustion\nEnergy has a chance to decrease by 5 after each race.",
        nameJP: "春待つ蕾",
        descriptionJP:
            "成長中の脚は、強い負荷に弱くまだ不安定レースに出走すると疲れてしまうことがある",
    },
    {
        id: 25,
        name: "Positive Thinking",
        description:
            "Stay motivated through mental fortitude!\nPrevents Mood from lowering once, and will disappear once this effect is exhausted.",
        nameJP: "ポジティブ思考",
        descriptionJP:
            "強靭なメンタルでやる気をキープ！やる気ダウンを一度防ぎ、このコンディションが消える",
    },
    {
        id: 26,
        name: "Lucky Constitution",
        description:
            "I'm kinda in the groove today!\nPrevents you from getting a bad condition once, and will disappear once this effect is exhausted.",
        nameJP: "幸運体質",
        descriptionJP:
            "今日はなんだかツイてるかも！　悪いコンディションから一度だけ身を守り、このコンディションが消える",
    },
    {
        id: 27,
        name: "Passionate Oath: Short-distance",
        description:
            "Overcome the thorny path ahead of you, winning at least 4 graded short-distance races, to reunite with the girl you once exchanged oaths with and receive strength.",
        nameJP: "熱き誓い・短距離",
        descriptionJP:
            "険しい道を乗り越えて短距離の重賞を4勝以上すると誓いを交わした少女と再会して力をもらえる",
    },
    {
        id: 28,
        name: "Unshakeable Oath: Short-distance",
        description:
            "Overcome the fierce battles ahead of you, winning at least 7 graded short-distance races, to reunite with the girl you once exchanged oaths with and receive strength.",
        nameJP: "揺るぎない誓い・短距離",
        descriptionJP:
            "厳しい戦いを越えて短距離の重賞を7勝以上すると誓いを交わした少女と再会して力をもらえる",
    },
    {
        id: 29,
        name: "Passionate Oath: Mile",
        description:
            "Overcome the thorny path ahead of you, winning at least 4 graded mile races, to reunite with the girl you once exchanged oaths with and receive strength.",
        nameJP: "熱き誓い・マイル",
        descriptionJP:
            "険しい道を乗り越えてマイルの重賞を4勝以上すると誓いを交わした少女と再会して力をもらえる",
    },
    {
        id: 30,
        name: "Unshakeable Oath: Mile",
        description:
            "Overcome the fierce battles ahead of you, winning at least 7 graded mile races, to reunite with the girl you once exchanged oaths with and receive strength.",
        nameJP: "揺るぎない誓い・マイル",
        descriptionJP:
            "厳しい戦いを越えてマイルの重賞を7勝以上すると誓いを交わした少女と再会して力をもらえる",
    },
    {
        id: 31,
        name: "Iron-Willed Challenger",
        description:
            "Chasing your goal of keep running longer than anyone and rack up more wins than anyone else, performing in objective races and growing from them becomes easier",
        nameJP: "鉄心の挑戦者",
        descriptionJP:
            "誰よりも長く走り続け、誰よりも多くの勝利を重ねるために目標レースで決意がみなぎり成長しやすくなる",
    },
    {
        id: 32,
        name: "Snack Time",
        description:
            "I'm feeling refreshed and ready to do my best today!\nRecover 5 Energy at the start of each turn.",
        nameJP: "リフレッシュの心得",
        descriptionJP:
            "リフレッシュはバッチリ、今日も一日頑張るぞ！気分転換して、ターン開始時に体力がすこし回復する",
    },
    {
        id: 34,
        name: "Development Cooperation",
        description:
            "If you assist with the development of U-TAS, then once the machine is completed, you will receive strength depending on the number of training successes and failures within the time period.",
        nameJP: "未来のための開発協力",
        descriptionJP:
            "『U-TAS』の開発に協力すると、マシン完成時に期間内のトレーニング成功・失敗数に応じた力をもらえる",
    },
    {
        id: 35,
        name: "Pride of Funabashi",
        description:
            "With love for Funabashi in your heart, display unwavering strength in the decisive battle set in your revived hometown, forging a path ahead.\nYour stats are greatly increased in the JBC Classic.",
        nameJP: "船橋の誇り",
        descriptionJP:
            "蘇った故郷が舞台の決戦で皆の未来を切り開くべく船橋への愛を胸に揺るぎない力を発揮する",
    },
    {
        id: 36,
        name: "Frozen Wings",
        description:
            "You feel unwell, and the days of being unable to properly display your strength in races continue.\nAll your stats are reduced by 50.",
        nameJP: "凍りついた翼",
        descriptionJP:
            "不調と向き合う日々が続くレースに出走しても全力を発揮できない",
    },
    {
        id: 37,
        name: "Ten Thousand Miles of Opportunity",
        description:
            "With a yet unsteady racing style, not yet able to overcome the wall of race distances, you're unable to display your full power in Medium-distance races.",
        nameJP: "前程万哩",
        descriptionJP:
            "距離の壁を越えるには心身がまだ未熟走れるイメージが湧かず、中距離のレースで全力を発揮できない",
    },
    {
        id: 38,
        name: "Trials of Love",
        description:
            "'Goals always come with their own challenges. I want to overcome these trials and prove my love!'\nPain prevents you from showing your full potential.",
        nameJP: "ラヴの試練",
        descriptionJP:
            "目標には困難がつきもの、試練を乗り越え愛を証明したい！痛みによってレースで全力を発揮できない",
    },
    {
        id: 100,
        name: "Passion Zone: Team Sirius",
        description:
            "Can carry out Friendship Training with Team Sirius and is immune to Insomnia as well as Lazy Habit.",
        nameJP: "情熱ゾーン：チーム＜シリウス＞",
        descriptionJP:
            "チーム＜シリウス＞と友情トレーニングが可能になり「夜ふかし気味」と「なまけ癖」にならなくなる",
    },
    {
        id: 101,
        name: "Passion Zone: The Throne's Assemblage",
        description:
            "Can carry out Friendship Training with The Throne's Assemblage and is immune to Insomnia and Lazy Habit.",
        nameJP: "情熱ゾーン：玉座に集いし者たち",
        descriptionJP:
            "玉座に集いし者たちと友情トレーニングが可能になり「夜ふかし気味」と「なまけ癖」にならなくなる",
    },
    {
        id: 102,
        name: "Passion Zone: Ancestors & Guides",
        description:
            "Can carry out Friendship Training with Ancestors & Guides and is immune to Insomnia and Lazy Habit.",
        nameJP: "情熱ゾーン：祖にして導く者",
        descriptionJP:
            "祖にして導く者と友情トレーニングが可能になり「夜ふかし気味」と「なまけ癖」にならなくなる",
    },
    {
        id: 103,
        name: "Passion Zone: Carvers of History",
        description:
            "Can carry out Friendship Training with Carvers of History and is immune to Insomnia and Lazy Habit.",
        nameJP: "情熱ゾーン：刻み続ける者たち",
        descriptionJP:
            "刻み続ける者たちと友情トレーニングが可能になり「夜ふかし気味」と「なまけ癖」にならなくなる",
    },
    {
        id: 104,
        name: "Passion Zone: Embodiment of Legends",
        description:
            "Can carry out Friendship Training with Embodiment of Legends and is immune to Insomnia as well as Lazy Habit.",
        nameJP: "情熱ゾーン：伝説の体現者",
        descriptionJP:
            "伝説の体現者と友情トレーニングが可能になり「夜ふかし気味」と「なまけ癖」にならなくなる",
    },
];
