import {
    distOrStyle,
    distOrTerrain,
    eventOutcomes,
    formatCount,
    formatRaceCount,
    getCharacterList,
    getCharacterName,
    getDate,
    getDistance,
    getEventName,
    getEventProps,
    getGrade,
    getHalf,
    getMonth,
    getMood,
    getOptionList,
    getScenario,
    getStat,
    getStrategy,
    getTrackConditions,
    getTrackName,
    getTrainingType,
    getYear,
    skillTypes,
} from "../events";
import { countText, getOrdinal } from "@/utils";
import type { UmaCharacterProfile } from "@/types/uma/character";
import type { EventNames, EventRewards } from "@/types/uma/event";
import type { Server } from "@/types";

interface EventTextContext {
    profiles: UmaCharacterProfile[];
    charID: number | string;
    server: Server;
    eventNames?: EventNames[];
}

type EventTextFormatter = (
    event: EventRewards,
    context: EventTextContext,
) => string;

export function renderEventTextPlain(
    event: EventRewards,
    context: EventTextContext,
): string {
    const formatter = eventTextFormatters[event.tag];

    if (!formatter) {
        console.warn(`Unknown tag "${event.tag}"`);
        return event.tag;
    }

    return formatter(event, context);
}

const rewardFormatters = {
    sp: ({ value }) => `Speed ${value}`,

    st: ({ value }) => `Stamina ${value}`,

    po: ({ value }) => `Power ${value}`,

    gu: ({ value }) => `Guts ${value}`,

    in: ({ value }) => `Wit ${value}`,

    "5s": ({ value }) => `All stats ${value}`,

    rs: ({ value, count }) =>
        `${countText({
            count,
            single: "random stat",
            multi: null,
            showCount: true,
        })} ${value}`,

    unspecified_stats: ({ value, count }) =>
        `${countText({
            count,
            single: "stat",
            multi: null,
            showCount: true,
        })} ${value}`,

    lo_s: ({ value }) => `Lowest Stat ${value}`,

    hi_s: ({ value }) => `Highest Stat ${value}`,

    ls: ({ value }) => `Last trained stat ${value}`,

    pt: ({ value }) => `Skill points ${value}`,

    bo: ({ value, data }, { profiles, charID }) =>
        `${getCharacterName(data || charID, profiles)} bond ${value}`,

    bo_l: ({ value }) =>
        `Bond of the support with the lowest bond (apart from this card) ${value}`,

    bo_l_c: ({ value, count }) =>
        `Bond of ${count} supports with the lowest bond ${value}`,

    bo_r: ({ value, data }, { profiles }) =>
        `Bond of ${getCharacterName(data, profiles)} random support cards ${value}`,

    goal_npc_bond: ({ value }) => `Scenario NPC bond ${value}`,

    this_card_bond: ({ value }) => `This card bond ${value}`,

    en: ({ value }) => `Energy ${value}`,

    me: ({ value }) => `Maximum Energy ${value}`,

    fe: () => "Full energy recovery",

    fa: ({ value }) => `Fans ${value}`,

    mo: ({ value }) => `Mood ${value}`,

    ha: () => "Heal all negative status effects",

    fd: ({ value }) =>
        `${value} random types of training will be disabled for one turn`,

    oofa: ({ data }) =>
        `Only ${getTrainingType(data)} training can be selected for one turn`,

    race_related_hint: () => "Hint for a skill related to the race",

    srh: ({ count }) =>
        `${countText({
            count,
            single: "hint",
            multi: null,
            showCount: true,
        })} for the strategy used in the race`,

    objectives_harder: () => "Increased difficulty of future training goals",

    objectives_better_rewards: () =>
        "Increased rewards for future training goals",

    mt: ({ value }) => `Performance token you have the least of ${value}`,

    pa: ({ value }) => `Passion ${value}`,

    vo: ({ value }) => `Vocal ${value}`,

    vi: ({ value }) => `Visual ${value}`,

    mn: ({ value }) => `Mental ${value}`,

    rf: () => "Gain a red fragment",

    bf: () => "Gain a blue fragment",

    yf: () => "Gain a yellow fragment",

    all_disc: ({ value }) => `All discipline levels ${value}`,

    veggies: ({ value }) => `All vegetables ${value}`,

    rl: ({ value }) =>
        `Cannot race for ${countText({
            count: Number(value),
            single: "turn",
            multi: null,
            showCount: true,
        })}`,

    rl_date: ({ props }) =>
        `Cannot race in ${getDate(getEventProps(props).date)}`,

    track_hint: ({ value }) => `Relevant track skill hint ${value}`,

    stat_not_disabled: ({ value }) =>
        `Stat that didn't have its facility disabled ${value}`,

    expensive_races: () => "Racing consumes more energy",

    sga: ({ count, value }) =>
        `Star Gauge of ${count} random characters ${value}`,

    app: ({ value }) => `Aptitude Points ${value}`,

    brian_tryhard: () =>
        "Increased difficulty and rewards of future training goals",

    forced_strat: ({ props }) =>
        `Strategy fixed to ${getStrategy(getEventProps(props).strategy)} for the next race`,

    wl_e: ({ value }) => `※ Wisdom Level ${value}`,

    wl_l: ({ value }) => `※ Wisdom Level ${value} or less`,

    wl_mn: ({ value, data }, { profiles }) =>
        `※ ${getCharacterName(data, profiles)}'s Wisdom Level is at least ${value}`,

    wl_c: ({ value }) =>
        `※ Combined Wisdom Level of all Goddesses ${value} or more`,

    ttl_gauge: ({ value, data }, { profiles }) =>
        `${getCharacterName(data, profiles)}'s Instruction gauge ${value}`,

    ttl_gauge_all: ({ value }) => `All Instruction gauges ${value}`,

    ntsr: ({ value }) =>
        `Next turn Specialty Rate of all support cards ${value}`,

    scen_gl_hype: ({ value }) =>
        `Hype Level ${
            value && Array.isArray(value) ? `${value[0]}-${value[1]}` : value
        }`,

    scen_gl_songs: ({ value }) =>
        `${
            value && Array.isArray(value) ? `${value[0]}-${value[1]}` : value
        } songs learned (excluding GIRLS' LEGEND U)`,

    ken_ing: ({ value }) => `Secret ingredients ${value}`,

    shun_act_low: ({ value }) => `Lowest-level Performance ${value}`,
} satisfies Record<string, EventTextFormatter>;

const conditionFormatters = {
    success: () => "※ Success",

    fail: () => "※ Fail",

    ee: () => "Event chain ended",

    pd: () => "Recreation enabled",

    ct: ({ value }) => `${value}`,

    brf: ({ props }) =>
        `※ Will affect the outcome of the ${getOrdinal(
            getEventProps(props).eventNumber,
        )} event`,

    brp: ({ props }) => {
        const { eventOption, eventNumber } = getEventProps(props);
        return `※ Can only happen if you chose the ${getOrdinal(
            eventOption,
        )} option during the ${getOrdinal(eventNumber)} event`;
    },

    bp2: ({ props }) =>
        `※ If you chose the ${getOrdinal(
            getEventProps(props).eventOption,
        )} option during both previous two chain events`,

    other_cases: () => "※ In other cases",

    result_good: () => "※ Good result",

    result_average: () => "※ Average result",

    result_bad: () => "※ Bad result",

    mood_min: ({ props }) =>
        `※ Mood is ${getMood(getEventProps(props).mood)} or better`,

    mood_max: ({ props }) =>
        `※ Mood is ${getMood(getEventProps(props).mood)} or lower`,

    mood_exact: ({ props }) =>
        `※ Mood is ${getMood(getEventProps(props).mood)}`,

    mood_or: ({ props }) => {
        const { moodList } = getEventProps(props);
        return `※ Mood is ${getMood(moodList[0])} or ${getMood(moodList[1])}`;
    },

    energy_min: ({ value }) => `※ ${value} or more energy`,

    energy_max: ({ value }) => `※ ${value} or less energy`,

    scenario_link: ({ data }) =>
        `※ Scenario link: This event will grant higher rewards in the ${getScenario(
            Number(data),
        )} scenario.`,

    sl: ({ data }, { profiles }) =>
        `※ If ${getCharacterName(data, profiles)} is scenario-linked:`,

    nsl: () => "※ If not scenario-linked:",

    fan: ({ value }) => `※ At least ${value?.toLocaleString()} fans`,

    fans_minimum: ({ value }) =>
        `Have at least ${value?.toLocaleString()} fans`,

    fans_maximum: ({ value }) => `※ Less than ${value?.toLocaleString()} fans`,

    highest_facility: () =>
        "※ The outcome depends on which training facility has the highest level (ties decided at random)",

    most_trained: () =>
        "※ The outcome depends on the most frequent training type",

    mc_linked: () => "※ When training a scenario link character:",

    aoharu_team_s: () => "※ When your overall team rank reaches S",

    aoharu_run_reward: () =>
        "※ After successfully finishing the training. Skill hint reward depends on the team name.",

    aoharu_team_name: () =>
        "※ You can only choose a name if the related character is scenario-linked.",

    char: ({ data }, { profiles }) => `※ ${getCharacterName(data, profiles)}`,

    char_h_dl: ({ data }, { profiles }) =>
        `${getCharacterName(data, profiles)}`,

    larc_chara_choice: () =>
        "※ Depending on your choice, a different 'Trust ＜From X＞' event will trigger later.",

    match_by_name: () =>
        "※ The order of choices in this event is inconsistent, so you must match by name.",

    pl: ({ props }) => {
        const { placement } = getEventProps(props);

        if (!placement?.length) return "";

        if (placement.length === 1) {
            return `※ ${getOrdinal(placement[0])}`;
        }

        if (placement[1] === 0) {
            return `※ ${getOrdinal(placement[0])} or worse`;
        }

        return `※ ${getOrdinal(placement[0])}-${getOrdinal(placement[1])}`;
    },

    co: ({ value }) => `${value}`,

    nc: () =>
        "※ These conditions are unconfirmed, and require additional testing",

    obj: () =>
        "※ Objective-related, but the event will vary depends on your result",

    special_effects_off: () => "Special effects off",

    unknown: () => "Unknown conditions",

    pop: ({ props }) =>
        `Be the #${getEventProps(props).pop} favorite for the current race`,

    use_strategy: ({ props }) =>
        `Use the ${getStrategy(getEventProps(props).strategy)} strategy`,

    fans_before_finals: ({ value }) =>
        `Have at least ${value?.toLocaleString()} fans before the finals`,

    turf_only: () => "※ Turf only",
} satisfies Record<string, EventTextFormatter>;

const raceConditionFormatters = {
    w_e: ({ count }) => `※ ${formatCount(count)} wins`,

    never_won_g1_before: () => `No previous G1 wins`,

    won_g1_before: () => `At least one previous G1 win`,

    clear_objective: ({ value }) => `Clear objective #${value}`,

    win_g1: ({ count }) =>
        `Win ${
            Array.isArray(count)
                ? `${formatCount(count)} G1 races`
                : countText({
                      count,
                      single: "any G1 race",
                      multi: "$X G1 races",
                  })
        }`,

    win_g1_track: ({ count, props }) =>
        `Win a G1 race on the ${getTrackName(
            Number(getEventProps(props).trackName),
        )} racetrack ${countText({
            count,
            single: "",
            multi: "$X times",
        })}`,

    win_g1_length: ({ count, props }) =>
        `Win a ${getDistance(getEventProps(props).distance)} G1 race ${countText(
            {
                count,
                single: "",
                multi: "$X times",
            },
        )}`,

    win_g1_strat: ({ count, props }) =>
        `Win a G1 race as ${getStrategy(getEventProps(props).strategy)} ${countText(
            {
                count,
                single: "",
                multi: "$X times",
            },
        )}`,

    win_g1_year: ({ count, props }) =>
        `Win at least ${count === 1 ? "one" : count} G1 race${
            count === 1 ? "" : "s"
        } during ${getYear(getEventProps(props).year)}`,

    win_streak_graded: ({ value }) =>
        `Get a win streak of ${value}+ graded races (G3, G2, G1)`,

    win_g1_cnt_class_distance: ({ count, props }) => {
        const { year, distanceList } = getEventProps(props);
        return `In the ${getYear(year)}, win at least ${count} ${distanceList
            .map((d) => getDistance(d))
            .join("/")} G1 ${countText({
            count,
            single: "race",
        })}`;
    },

    dist_wins_branch: ({ value }) =>
        `The rewards will depend on the amount of ${getDistance(
            Number(value),
        )} wins`,

    racetrack_wins_branch: ({ props }) =>
        `The rewards will depend on the amount of ${getTrackName(
            Number(getEventProps(props).trackName),
        )} racetrack wins`,

    "3_crown_route": () => "Select the Triple Crown route",

    mile_route: () => "Select the Mile route",

    brian_five: () => "Or win at least 5 G1 races before the third year",

    gold_city_race: () =>
        "※ From Senior Year Early May, the rewards for non-objective races change",

    third_any_non_objective: () => "Place 3rd in any non-objective race",

    lose_by_nose: () => "Lose the race by a nose",

    dt_race_w: ({ count, props }) => {
        const { distance, terrain } = getEventProps(props);
        const type = distOrTerrain(distance, terrain);

        if (Array.isArray(count)) {
            return `Win ${formatCount(count)} ${type} races`;
        }

        return `Win ${countText({
            count,
            single: "any",
            multi: `at least ${count}`,
        })} ${type} ${countText({
            count,
            single: "race",
        })}`;
    },

    y_gn_race_w: ({ count, props }) => {
        const { grade, year } = getEventProps(props);
        return `Win ${countText({
            count,
            single: "any",
            multi: "$X",
        })} ${getGrade(grade)} ${countText({
            count,
            single: "race",
        })} in ${getYear(year)}`;
    },

    gn_race_pn: ({ count, props }) => {
        const { position, grade } = getEventProps(props);
        return `Place ${getOrdinal(position)} or better in any ${getGrade(
            grade,
        )} race ${formatRaceCount(count)}`;
    },

    any_race_pn: ({ count, props }) =>
        `Place ${getOrdinal(
            getEventProps(props).position,
        )} or better in any race ${formatRaceCount(count)}`,

    dt_gn_race_w: ({ count, props }) => {
        const { grade, distance, terrain } = getEventProps(props);
        return `Win any ${getGrade(grade)} ${distOrTerrain(
            distance,
            terrain,
        )} race ${formatRaceCount(count)}`;
    },

    gn_race_w: ({ count, props }) => {
        const { distance, terrain } = getEventProps(props);
        return `Win any ${distOrTerrain(distance, terrain)} race ${formatRaceCount(
            count,
        )}`;
    },

    gn_race_no_w: ({ count, props }) => {
        const { grade, distance, terrain } = getEventProps(props);
        return `Win any non-objective ${getGrade(grade)} ${distOrTerrain(
            distance,
            terrain,
        )} race ${formatRaceCount(count)}`;
    },

    y_dt_gn_race_no_w: ({ count, props }) => {
        const { grade, distance, terrain, year } = getEventProps(props);
        return `Win any non-objective ${getGrade(grade)} ${distOrTerrain(
            distance,
            terrain,
        )} race ${formatRaceCount(count)} in year ${year}`;
    },

    dt_gn_race_no_w: ({ count, props }) => {
        const { grade, distance, terrain } = getEventProps(props);
        return `Win any non-objective ${getGrade(grade)} ${distOrTerrain(
            distance,
            terrain,
        )} race ${formatRaceCount(count)}`;
    },

    s_gn2_race_w: ({ count, props }) => {
        const { gradeList, strategy } = getEventProps(props);
        return `Win any ${getGrade(gradeList[0])} or ${getGrade(
            gradeList[1],
        )} race as ${getStrategy(strategy)} ${formatRaceCount(count)}`;
    },

    s_gn_race_w: ({ count, props }) => {
        const { grade, strategy } = getEventProps(props);
        return `Win any ${getGrade(grade)} race as ${getStrategy(
            strategy,
        )} ${formatRaceCount(count, "time", "$X times")}`;
    },

    s_gn_race_wn_c: ({ count, props }) => {
        const { grade, strategy } = getEventProps(props);

        return `Get a win streak of ${
            Array.isArray(count) ? formatCount(count) : `${count}+`
        } ${getGrade(grade)} ${countText({
            count: Array.isArray(count) ? 2 : count,
            single: "race",
        })} as ${getStrategy(strategy)}`;
    },

    s_fn_gn_race_w: ({ count, props }) => {
        const { grade, strategy, pop } = getEventProps(props);
        return `Win any ${getGrade(grade)} race as ${getStrategy(
            strategy,
        )} being the #${pop} favorite ${formatRaceCount(count)}`;
    },

    s_dt_gn_race_w: ({ count, props }) => {
        const { grade, distance, terrain, strategy } = getEventProps(props);
        return `Win any ${getGrade(grade)} ${distOrTerrain(
            distance,
            terrain,
        )} race as ${getStrategy(strategy)} ${formatRaceCount(count)}`;
    },

    s_fn_dt_gn_race_w: ({ count, props }) => {
        const { grade, distance, terrain, strategy, pop } =
            getEventProps(props);

        return `Win any ${getGrade(grade)} ${distOrTerrain(
            distance,
            terrain,
        )} race as ${getStrategy(strategy)} being the #${pop} favorite ${formatRaceCount(
            count,
        )}`;
    },

    l_gn_race_w: ({ count, props }) =>
        `Win any ${getEventProps(props).length}m race ${formatRaceCount(count)}`,

    tc_gn_race_w: ({ count, props }) => {
        const { grade, trackConds } = getEventProps(props);
        return `Win ${countText({
            count,
            single: `a ${getGrade(grade)} race`,
            multi: `$X ${getGrade(grade)} races`,
        })} in one of these track conditions: ${getTrackConditions(
            trackConds,
        )}`;
    },

    rt_race_w: ({ count, props }) =>
        `Win any race on the ${getTrackName(
            Number(getEventProps(props).trackName),
        )} racetrack ${formatRaceCount(count)}`,

    r_race_w: ({ count, props }, { profiles }) =>
        `Win against ${getCharacterName(
            getEventProps(props).charName,
            profiles,
        )} in ${countText({
            count,
            single: "a race at least once",
            multi: `races at least ${count} times`,
        })}`,

    rn_race_w: ({ count, props }, { profiles }) =>
        `Win against any of the following characters ${countText({
            count,
            single: "time",
            multi: null,
            showCount: true,
        })}: ${getCharacterList(getEventProps(props).charList, profiles)}`,

    r_gn_race_w: ({ count, props }, { profiles }) => {
        const { charName, grade } = getEventProps(props);
        return `Win against ${getCharacterName(charName, profiles)} in ${countText(
            {
                count,
                single: `a ${getGrade(grade)} race at least once`,
                multi: `${getGrade(grade)} races at least ${count} times`,
            },
        )}`;
    },

    rn_gn_race_w: ({ count, props }, { profiles }) =>
        `Win against any of the following characters in ${getGrade(
            getEventProps(props).grade,
        )} races ${countText({
            count,
            single: "once",
            multi: `at least ${count} times`,
        })}: ${getCharacterList(getEventProps(props).charList, profiles)}`,
} satisfies Record<string, EventTextFormatter>;

const eventConditionFormatters = {
    do_not_race: ({ props }) => {
        const { date } = getEventProps(props);
        const [y, m, h] = date;
        return `Don't race in ${getYear(y)}, ${getHalf(h)} ${getMonth(m)}`;
    },

    date: ({ props }) => {
        const { date } = getEventProps(props);
        const [y, m, h] = date;
        return `Triggers in ${getYear(y)}, ${getHalf(h)} ${getMonth(m)}`;
    },

    date_before_finals: () => "Triggers before the Finals start",

    win_connect_live: () => "Finish your Fan Promise from the previous event",

    larc_trust: () =>
        "Pick the respective character's choice in the 'With' event",

    et: ({ props }, { eventNames, server }) =>
        `Event「${getEventName(
            eventNames,
            getEventProps(props).eventName,
            server,
        )}」will occur next turn`,

    event_block: ({ props }, { eventNames, server }) =>
        `Event「${getEventName(
            eventNames,
            getEventProps(props).eventName,
            server,
        )}」will not occur this run`,

    event_unlock: ({ props }, { eventNames, server }) =>
        `Unlocks event「${getEventName(
            eventNames,
            getEventProps(props).eventName,
            server,
        )}」`,

    ev: ({ props }, { eventNames, server }) =>
        `Trigger the 「${getEventName(
            eventNames,
            getEventProps(props).eventName,
            server,
        )}」training event`,

    evn: ({ count, props }, { eventNames, server }) =>
        `Trigger the 「${getEventName(
            eventNames,
            getEventProps(props).eventName,
            server,
        )}」training event ${count} times`,

    mo_ev: ({ props }, { eventNames, server }) => {
        const { eventName, mood } = getEventProps(props);
        return `Trigger the 「${getEventName(
            eventNames,
            eventName,
            server,
        )}」training event while having at least ${getMood(mood)} mood`;
    },

    ev_trs_t: ({ props }, { eventNames, server }) =>
        `After the 「${getEventName(
            eventNames,
            getEventProps(props).eventName,
            server,
        )}」event, train in the facility that wasn't locked`,

    ev_trc_t: ({ count, props }, { eventNames, server }) =>
        `After the 「${getEventName(
            eventNames,
            getEventProps(props).eventName,
            server,
        )}」event, train in the facility that wasn't locked ${countText({
            count,
            single: "",
            multi: "times",
        })}`,

    p_ev_s: ({ props }, { eventNames, server }) =>
        `Fulfill a promise to your fans in the 「${getEventName(
            eventNames,
            getEventProps(props).eventName,
            server,
        )}」event`,

    e_ev: ({ data, count }) =>
        `Trigger any training event that grants ${data} ${countText({
            count,
            single: "",
            multi: "$X times",
        })}`,

    ev_ac_on: ({ props }, { eventNames, server }) => {
        const { eventName, eventOutcome, eventOptions } = getEventProps(props);

        return `In the 「${getEventName(
            eventNames,
            eventName,
            server,
        )}」training event, get the ${
            eventOutcomes[eventOutcome]
        } outcome after selecting one of the following choices: ${getOptionList(
            eventOptions,
        )}`;
    },

    ev_ac_on_nooutcome: ({ props }, { eventNames, server }) => {
        const { eventName, eventOptions } = getEventProps(props);

        return `In the 「${getEventName(
            eventNames,
            eventName,
            server,
        )}」training event, select one of the following choices: ${getOptionList(
            eventOptions,
        )}`;
    },

    ev_cn_on: ({ props }, { eventNames, server }) => {
        const { eventName, eventOutcome, eventOption } = getEventProps(props);

        const name = getEventName(eventNames, eventName, server);
        const prefix = `In the 「${name}」training event`;

        if (eventOutcome != null && eventOption != null) {
            return `${prefix}, get the ${eventOutcomes[eventOutcome]} outcome after selecting choice #${eventOption}`;
        }

        if (eventOutcome != null) {
            return `${prefix}, get the ${eventOutcomes[eventOutcome]} outcome`;
        }

        if (eventOption != null) {
            return `${prefix}, select choice #${eventOption}`;
        }

        return prefix;
    },

    ev_cn_on_nochoice: ({ props }, { eventNames, server }) => {
        const { eventName, eventOutcome } = getEventProps(props);

        return `In the 「${getEventName(
            eventNames,
            eventName,
            server,
        )}」training event, get the ${eventOutcomes[eventOutcome]} outcome`;
    },

    ev_cn_on_nooutcome: ({ props }, { eventNames, server }) => {
        const { eventName, eventOption } = getEventProps(props);

        return `In the 「${getEventName(
            eventNames,
            eventName,
            server,
        )}」training event, select choice #${eventOption}`;
    },

    by_date: ({ props }) =>
        `※ Must be fulfilled by ${getDate(getEventProps(props).date)}`,

    between_dates: ({ props }, context) => {
        const { conditions, dateRange } = getEventProps(props);

        return `${renderEventTextPlain(conditions[0], context)} between ${getDate(dateRange[0])} and ${getDate(dateRange[1])}`;
    },
} satisfies Record<string, EventTextFormatter>;

const trainingConditionFormatters = {
    stat: ({ value, props }) =>
        `Have at least ${value} ${getStat(getEventProps(props).stat)}`,

    e_skill: ({ count, value }) => {
        const type = skillTypes[value as string];

        if (Array.isArray(count)) {
            return `Have ${formatCount(count)} ${type} skills`;
        }

        return `Have ${countText({
            count,
            single: "any",
            multi: `at least ${count}`,
        })} ${type} ${countText({
            count,
            single: "skill",
        })}`;
    },

    a_skill: ({ count, props }) => {
        const { distance, strategy } = getEventProps(props);
        const aptitude = distOrStyle(distance, strategy);

        if (Array.isArray(count)) {
            return `Have ${formatCount(count)} skills for ${aptitude} aptitude`;
        }

        return `Have ${countText({
            count,
            single: "any",
            multi: `at least ${count}`,
        })} skills for ${aptitude} aptitude`;
    },

    rest: ({ count }) =>
        `Rest ${countText({
            count,
            single: "at least once",
            multi: `a total of ${count} or more times`,
        })}`,

    out_c: ({ count }) =>
        `Go on a recreation event with your trainee ${countText({
            count,
            single: "",
            multi: "$X times",
        })}`,

    out_s: ({ count }) =>
        `Go on a recreation event with any Pal or Group support ${countText({
            count,
            single: "",
            multi: "$X times",
        })}`,

    sc_out: ({ count }) =>
        `Go on a recreation event during summer camp ${countText({
            count,
            single: "",
            multi: "$X times",
        })}`,

    train_nf: () => "Don't fail a single training during the run",
} satisfies Record<string, EventTextFormatter>;

const miscFormatters = {
    scen_uaf_wf: () => "Win the U.A.F. Showdown",

    scen_uaf_wa: () => "Win all the U.A.F. tournaments",

    no: () => "Nothing happens",

    ft: () => "After first training",

    at: () => "Randomly after training (repeatable)",

    ds: () => "Recreation enabled",

    ny: () => "Dating before the first New Year's",

    fs: () => "After Finals (bond maxed)",

    ff: () => "After Finals (bond not maxed)",

    tf: () => "Training together failed",
} satisfies Record<string, EventTextFormatter>;

const eventTextFormatters: Record<string, EventTextFormatter> = {
    ...rewardFormatters,
    ...conditionFormatters,
    ...raceConditionFormatters,
    ...eventConditionFormatters,
    ...trainingConditionFormatters,
    ...miscFormatters,
};
