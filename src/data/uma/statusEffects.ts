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
            "Gain strength by reuniting with your fans.<br />Win a race held at the Sapporo or Hakodate racetrack to gain 10 Speed and Guts, 1 Mood level, 10 Skill Points, and a level 5 hint for the respective racetrack green skill.",
        nameJP: "ファンとの約束・北海道",
        descriptionJP:
            "札幌・函館でのレースに勝利するとファンと再会して力をもらえる",
    },
    {
        id: 15,
        name: "Fan Promise (Hokuto)",
        description:
            "Gain strength by reuniting with your fans.<br />Win a race held at the Fukushima, Niigata, or Morioka racetracks to gain 10 Speed and Stamina, 1 Mood level, 10 Skill Points, and a level 5 hint for the respective racetrack green skill.",
        nameJP: "ファンとの約束・北東",
        descriptionJP:
            "福島・新潟・盛岡でのレースに勝利するとファンと再会して力をもらえる",
    },
    {
        id: 16,
        name: "Fan Promise (Nakayama)",
        description:
            "Gain strength by reuniting with your fans.<br />Win a race held at the Nakayama or Funabashi racetracks to gain 10 Power and Guts, 1 Mood level, 10 Skill Points, and a level 5 hint for the respective racetrack green skill.",
        nameJP: "ファンとの約束・千葉",
        descriptionJP:
            "中山・船橋でのレースに勝利するとファンと再会して力をもらえる",
    },
    {
        id: 17,
        name: "Fan Promise (Kansai)",
        description:
            "Gain strength by reuniting with your fans.<br />Win a race held at the Kyoto or Hanshin racetrack to gain 10 Stamina and Wisdom, 1 Mood level, 10 Skill Points, and a level 5 hint for the respective racetrack green skill.",
        nameJP: "ファンとの約束・関西",
        descriptionJP:
            "京都・阪神でのレースに勝利するとファンと再会して力をもらえる",
    },
    {
        id: 18,
        name: "Fan Promise (Kokura)",
        description:
            "Gain strength by reuniting with your fans.<br />Win a race held at the Kokura racetrack to gain 10 Stamina and Guts, 1 Mood level, 10 Skill Points, and a level 5 hint for the respective racetrack green skill.",
        nameJP: "ファンとの約束・小倉",
        descriptionJP: "小倉でのレースに勝利するとファンと再会して力をもらえる",
    },
    {
        id: 19,
        name: "Not Ready",
        description:
            "She's just not quite race ready... Competing in races may lead to fatigue.",
        nameJP: "まだまだ準備中",
        descriptionJP:
            "身体がまだ本格化の時期に入っていない… …レースに出走すると疲れてしまうことがある",
    },
    {
        id: 20,
        name: "Legs of Glass",
        description:
            "Has stellar growth during goal races as long as she's not afflicted with Practice Poor, but her fragile legs tire easily after consecutive races.",
        nameJP: "ガラスの脚",
        descriptionJP:
            "練習ベタで出走しない限り目標レースで輝きを放ち成長しやすいただし繊細な脚はレースが続くと疲れてしまう",
    },
    {
        id: 21,
        name: "Ominous Portent",
        description:
            "Bad things are more likely to occur due to unbalanced qi.",
        nameJP: "怪しい雲行き",
        descriptionJP: "乱れた氣脈によって悪いことが起きやすくなってしまう",
    },
    {
        id: 22,
        name: "Fan Promise (Kawasaki)",
        description:
            "Gain strength by reuniting with your fans.<br />Win a race held at the Kawasaki racetrack to gain 10 Power and Wisdom, 1 Mood level, 10 Skill Points, and a level 5 hint for the respective racetrack green skill.",
        nameJP: "ファンとの約束・川崎",
        descriptionJP: "川崎でのレースに勝利するとファンと再会して力をもらえる",
    },
    {
        id: 23,
        name: "Hero's Brilliance",
        description:
            "In the race for the final crown, her willpower surges forth in a brilliant display of strength unmistakably fit for a hero.",
        nameJP: "英雄の光輝",
        descriptionJP:
            "最後の一冠を賭けたレースで眩い意志の輝きを放ち紛うことなき英雄の力を発揮する",
    },
    {
        id: 24,
        name: "Bud Longing for Spring",
        description:
            "Her fragile legs still have some growing to do before attaining greater stability. Competing in races may lead to fatigue.",
        nameJP: "春待つ蕾",
        descriptionJP:
            "成長中の脚は、強い負荷に弱くまだ不安定レースに出走すると疲れてしまうことがある",
    },
    {
        id: 25,
        name: "Positive Thinking",
        description:
            "Stay motivated through mental fortitude!<br />Prevents Mood from lowering once, and will disappear once this effect is exhausted.",
        nameJP: "ポジティブ思考",
        descriptionJP:
            "強靭なメンタルでやる気をキープ！やる気ダウンを一度防ぎ、このコンディションが消える",
    },
    {
        id: 26,
        name: "Lucky Constitution",
        description:
            "I'm kinda in the groove today!<br />Prevents you from getting a bad condition once, and will disappear once this effect is exhausted.",
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
            "I'm feeling refreshed and ready to do my best today!<br />Recover 5 Energy at the start of each turn.",
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
            "With love for Funabashi in your heart, display unwavering strength in the decisive battle set in your revived hometown, forging a path ahead.<br />Your stats are greatly increased in the JBC Classic.",
        nameJP: "船橋の誇り",
        descriptionJP:
            "蘇った故郷が舞台の決戦で皆の未来を切り開くべく船橋への愛を胸に揺るぎない力を発揮する",
    },
    {
        id: 36,
        name: "Frozen Wings",
        description:
            "You feel unwell, and the days of being unable to properly display your strength in races continue.<br />All your stats are reduced by 50.",
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
            "'Goals always come with their own challenges. I want to overcome these trials and prove my love!'<br />Pain prevents you from showing your full potential.",
        nameJP: "ラヴの試練",
        descriptionJP:
            "目標には困難がつきもの、試練を乗り越え愛を証明したい！痛みによってレースで全力を発揮できない",
    },
    {
        id: 39,
        name: "A Sign of the Thaw",
        description:
            "Her resolve fixed on this race, she gives everything she has and impulsively unleashes a late-race spurt that leaves everyone in the dust.",
        nameJP: "雪解けの予感",
        descriptionJP:
            "全員をひれ伏させる末脚を衝動のままに解き放つこの一戦への決意を胸に持てる力の全てを発揮する",
    },
    {
        id: 44,
        name: "Jittery Legs",
        description:
            "Mile races are over in a flash! I can't settle into the pace. This is impossible! I just want to go home... Her nerves tie her legs in knots, preventing her from performing at her best in Mile races.",
        nameJP: "足に伝う焦燥",
        descriptionJP:
            "マイルは短期決戦！ペースが掴めず無理ゲー！もう帰りたい……動揺から足がもつれ、マイルのレースで全力を発揮できない",
    },
    {
        id: 100,
        name: "Pure Passion: Team Sirius",
        description:
            "Able to do Friendship Training with Team Sirius, and immune to Night Owl and Slacker.",
        nameJP: "情熱ゾーン：チーム＜シリウス＞",
        descriptionJP:
            "チーム＜シリウス＞と友情トレーニングが可能になり「夜ふかし気味」と「なまけ癖」にならなくなる",
    },
    {
        id: 101,
        name: "Pure Passion: Heirs to the Throne",
        description:
            "Able to do Friendship Training with Heirs to the Throne, and immune to Night Owl and Slacker.",
        nameJP: "情熱ゾーン：玉座に集いし者たち",
        descriptionJP:
            "玉座に集いし者たちと友情トレーニングが可能になり「夜ふかし気味」と「なまけ癖」にならなくなる",
    },
    {
        id: 102,
        name: "Pure Passion: Progenitors and Guides",
        description:
            "Able to do Friendship Training with Progenitors and Guides, and immune to Night Owl and Slacker.",
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
