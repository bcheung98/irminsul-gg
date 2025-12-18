import { countText, getOrdinal } from "@/utils";
import {
    distances,
    grades,
    moods,
    specialties,
    strategies,
    terrain,
} from "@/data/uma/common";
import { formatAptitude } from "./formatConditions";
import { raceConditions } from "@/data/uma/races";
import { racetracks } from "@/data/uma/racetracks";
import { scenarios } from "@/data/uma/scenarios";
import { UmaCharacterProfile } from "@/types/uma/character";
import { EventRewards } from "@/types/uma/event";

export function getEventText({
    event,
    profiles,
    charID,
}: {
    event: EventRewards;
    profiles: UmaCharacterProfile[];
    charID: number | string;
}) {
    const { tag, value, count, data, props = {} } = event;

    const getCharacter = (id?: string | number) => {
        if (typeof id === "string") {
            return id;
        }
        const char = profiles.find(
            (character) => character.id === Number(id || 0)
        );
        return char ? char.name : "";
    };
    const getCharacterList = (ids = [0]) => {
        return ids.map((i) => getCharacter(i));
    };

    let {
        year = props?.year || 1,
        month = props?.month || 1,
        half = props?.half || 1,
        grade = props?.grade || 0,
        gradeList = props?.gradeList || [1, 2],
        distance = props?.distance || 0,
        distanceList = props?.distanceList || [0],
        strategy = props?.strategy || 1,
        terrain = props?.terrain || 1,
        length = props?.length || 1600,
        trackName = props?.trackName || 0,
        trackConds = props?.trackConds || [0],
        position = props?.position || 1,
        pop = props?.pop || 1,
        stat = props?.stat || 1,
        mood = props?.mood || 3,
        eventName = props?.eventName || "",
        eventNumber = props?.eventNumber || 1,
        eventOption = props?.eventOption || 1,
        eventOptions = props?.eventOptions || [1],
        eventOutcome = props?.eventOutcome || 2,
        charName = props?.charName || 0,
        charList = props?.charList || [0],
    } = props;

    charName = getCharacter(event.props?.charName);
    gradeList = event.props?.gradeList || [1, 2];
    let mood1 = 3;
    let mood2 = 3;
    if (mood && mood > 10) {
        [mood1, mood2] = mood
            .toString()
            .split("")
            .map((i) => Number(i));
    }

    const textMap: { [key: string]: string } = {
        // Event Rewards
        speed: `Speed ${value}`,
        stamina: `Stamina ${value}`,
        power: `Power ${value}`,
        guts: `Guts ${value}`,
        wit: `Wit ${value}`,
        all_stats: `All stats ${value}`,
        random_stats: `${countText({
            count,
            single: "random stat",
            multi: null,
            showCount: true,
        })} ${value}`,
        unspecified_stats: `${countText({
            count,
            single: "stat",
            multi: null,
            showCount: true,
        })} ${value}`,
        skill_points: `Skill points ${value}`,
        bond: `${getCharacter(data || charID)} bond ${value}`,
        this_card_bond: `This card bond ${value}`,
        bond_lowest: `Bond of the support with the lowest bond (apart from this card) ${value}`,
        bond_random: `Bond of ${getCharacter(
            data
        )} random support cards ${value}`,
        energy: `Energy ${value}`,
        max_energy: `Maximum Energy ${value}`,
        full_energy: "Full energy recovery",
        fans: `Fans ${value}`,
        success: "※ Success",
        fail: "※ Fail",
        heal_status_one: "Heal a negative status effect",
        heal_status_all: "Heal all negative status effects",
        motivation: `Mood ${value}`,
        last_trained_stat: `Last trained stat ${value}`,
        event_chain_end: "Event chain ended",
        rec_enabled: "Recreation enabled",
        standard_race_rewards: "Standard race rewards",
        nothing: "Nothing happens",
        training_disabled: `${value} random types of training will be disabled for one turn`,
        race_related_hint: "Hint for a skill related to the race",
        strategy_related_hint: `${countText({
            count,
            single: "hint",
            multi: null,
            showCount: true,
        })} for the strategy used in the race`,
        objectives_harder: "Increased difficulty of future training goals",
        objectives_better_rewards:
            "Increased rewards for future training goals",
        min_token: `Performance token you have the least of ${value}`,
        dance: `Dance ${value}`,
        passion: `Passion ${value}`,
        vocal: `Vocal ${value}`,
        visual: `Visual ${value}`,
        mental: `Mental ${value}`,
        red_fragment: "Gain a red fragment",
        blue_fragment: "Gain a blue fragment",
        yellow_fragment: "Gain a yellow fragment",
        all_disc: `All discipline levels ${value}`,
        veggies: `All vegetables ${value}`,
        races_locked: `Cannot race for ${countText({
            count,
            single: "turn",
            multi: null,
            showCount: true,
        })}`,
        event_count: `${value}`,
        event_trigger: `Event 「${value}」 will occur next turn`,
        track_hint: `Relevant track skill hint ${value}`,
        stat_not_disabled: `Stat that didn't have its facility disabled ${value}`,
        expensive_races: "Racing consumes more energy",
        star_gauge: `Star Gauge of ${count} random characters ${value}`,
        aptitude_points: `Aptitude Points ${value}`,
        brian_tryhard:
            "Increased difficulty and rewards of future training goals",
        branch_future: `※ Will affect the outcome of the ${getOrdinal(
            eventNumber
        )} event`,
        branch_previous: `※ Can only happen if you chose the ${getOrdinal(
            eventOption
        )} option during the ${getOrdinal(eventNumber)} event`,
        branch_previous2: `※ If you chose the ${getOrdinal(
            eventOption
        )} option during both previous two chain events`,
        other_cases: "※ In other cases",
        result_good: "※ Good result",
        result_average: "※ Average result",
        result_bad: "※ Bad result",
        wins_exact: `※ ${count} wins`,
        mood: `Mood ${value}`,
        mood_good: "※ Mood Good or better",
        mood_bad: "※ Mood Normal or worse",
        mood_min: `※ Mood ${getMood(mood)} or better`,
        mood_max: `※ Mood ${getMood(mood)} or worse`,
        mood_exact: `※ Mood ${getMood(mood)}`,
        mood_or: `※ Mood ${mood1} or ${mood2}`,
        scenario_link: `※ Scenario link: This event will grant higher rewards in the ${getScenario(
            Number(data)
        )} scenario.`,
        scenario_linked: `※ If ${getCharacter(data)} is scenario-linked:`,
        not_scenario_linked: "※ If not scenario-linked:",
        fans_minimum: `※ At least ${value?.toLocaleString()} fans`,
        fans_maximum: `※ Less than ${value?.toLocaleString()} fans`,
        highest_facility:
            "※ The outcome depends on which training facility has the highest level (ties decided at random)",
        most_trained:
            "※ The outcome depends on the most frequent training type",
        mc_linked: "※ When training a scenario link character:",
        aoharu_team_s: "※ When your overall team rank reaches S",
        aoharu_run_reward:
            "※ After successfully finishing the training. Skill hint reward depends on the team name.",
        aoharu_team_name:
            "※ You can only choose a name if the related character is scenario-linked.",
        wl_exact: `※ Wisdom Level ${value}`,
        wl_less: `※ Wisdom Level ${value} or less`,
        wl_min_name: `※ ${getCharacter(
            data
        )}'s Wisdom Level is at least ${value}`,
        wl_combined: `※ Combined Wisdom Level of all Goddesses ${value} or more`,
        ttl_gauge: `${getCharacter(data)}'s Instruction gauge ${value}`,
        ttl_gauge_all: `All Instruction gauges ${value}`,
        ntsr: `Next turn Specialty Rate of all support cards ${value}`,
        app: `Aptitude Points ${value}`,
        char: `※ ${getCharacter(data)}`,
        char_h_dl: `${getCharacter(data)}`,
        larc_chara_choice:
            "※ Depending on your choice, a different 'Trust ＜From X＞' event will trigger later.",
        match_by_name:
            "※ The order of choices in this event is inconsistent, so you must match by name.",

        // Secret conditions
        nc: "※ These conditions are unconfirmed, and require additional testing",
        obj: "※ Objective-related, but the event will vary depends on your result",
        unknown: "Unknown conditions",
        pop: `Be the #${pop} favorite for the current race`,
        use_strategy: `Use the ${strategy} strategy`,
        clear_objective: `Clear objective #${value}`,
        win_g1: `Win ${countText({
            count,
            single: "any G1 race",
            multi: `$X G1 races`,
        })}`,
        win_g1_track: `Win a G1 race on the ${
            racetracks[Number(trackName)]
        } racetrack ${countText({
            count,
            single: "",
            multi: `$X times`,
        })}`,
        win_g1_length: `Win a ${getDistance(distance)} G1 race ${countText({
            count,
            single: "",
            multi: `$X times`,
        })}`,
        win_g1_strat: `Win a G1 race as ${getStrategy(strategy)} ${countText({
            count,
            single: "",
            multi: `$X times`,
        })}`,
        win_g1_year: `Win at least one G1 race during ${getYear(
            year
        )} ${countText({ count, single: "", multi: `$X times` })}`,
        win_streak_graded: `Get a win streak of ${value}+ graded races (G3, G2, G1)`,
        win_all_g1_rival: `Win all G1 races in which ${getCharacter(
            data
        )} is also participating`,
        win_g1_cnt_class_distance: `In the ${getYear(
            year
        )}, win at least ${count} ${distanceList
            .map((d) => getDistance(d))
            .join("/")} G1 ${countText({
            count,
            single: "race",
        })}`,
        do_not_race: `Don't race in ${getYear(year)}, ${getHalf(
            half
        )} ${getMonth(month)}`,
        date: `Triggers in ${getYear(year)}, ${getHalf(half)} ${getMonth(
            month
        )}`,
        date_before_finals: "Triggers before the Finals start",
        fans_before_finals: `Have at least ${value?.toLocaleString()} fans before the finals`,
        dist_wins_branch: `The rewards will depend on the amount of ${getDistance(
            Number(value)
        )} wins`,
        racetrack_wins_branch: `The rewards will depend on the amount of ${
            racetracks[Number(value)]
        } racetrack wins`,
        "3_crown_route": "Select the Triple Crown route",
        mile_route: "Select the Mile route",
        win_connect_live: "Finish your Fan Promise from the previous event",
        brian_five: "Or win at least 5 G1 races before the third year",
        third_any_non_objective: "Place 3rd in any non-objective race",
        larc_trust:
            "Pick the respective character's choice in the 'With' event",
        turf_only: "※ Turf only",
        fans_min: `Have at least ${value?.toLocaleString()} fans`,
        stat: `Have at least ${value} ${getStat(stat)}`,
        e_skill: `Have ${countText({
            count,
            single: "any",
            multi: `at least ${count}`,
        })} ${skillTypes[value as string]} ${countText({
            count,
            single: "skill",
        })}`,
        a_skill: `Have ${countText({
            count,
            single: "any",
            multi: `at least ${count}`,
        })} skills for ${distOrStyle(distance, strategy)} aptitude`,
        rest: `Rest ${countText({
            count,
            single: "at least once",
            multi: `a total of ${count} or more times`,
        })}`,
        rec_char: `Go on a recreation event with your trainee ${countText({
            count,
            single: "",
            multi: `$X times`,
        })}`,
        rec_pal: `Go on a recreation event with any Pal or Group support ${countText(
            { count, single: "", multi: `$X times` }
        )}`,
        rec_summer: `Go on a recreation event during summer camp ${countText({
            count,
            single: "",
            multi: `$X times`,
        })}`,
        dt_race_w: `Win ${countText({
            count,
            single: "any",
            multi: `at least ${count}`,
        })} ${distOrTerrain(distance, terrain)} ${countText({
            count,
            single: "race",
        })}`,
        y_gn_race_w: `Win ${countText({
            count,
            single: "any",
            multi: `$X`,
        })} ${getGrade(grade)} ${countText({
            count,
            single: "race",
        })} in ${getYear(year)}`,
        gn_race_pn: `Place ${getOrdinal(position)} or better in any ${getGrade(
            grade
        )} race ${countText({
            count,
            single: "",
            multi: `$X times`,
        })}`,
        any_race_pn: `Place ${getOrdinal(
            position
        )} or better in any race ${countText({
            count,
            single: "",
            multi: `$X times`,
        })}`,
        dt_gn_race_w: `Win any ${getGrade(grade)} ${distOrTerrain(
            distance,
            terrain
        )} race ${countText({ count, single: "", multi: `$X times` })}`,
        gn_race_w: `Win any ${distOrTerrain(
            distance,
            terrain
        )} race ${countText({ count, single: "", multi: `$X times` })}`,
        gn_race_no_w: `Win any non-objective ${getGrade(grade)} ${distOrTerrain(
            distance,
            terrain
        )} race ${countText({ count, single: "", multi: `$X times` })}`,
        y_dt_gn_race_no_w: `Win any non-objective ${getGrade(
            grade
        )} ${distOrTerrain(distance, terrain)} race ${countText({
            count,
            single: "",
            multi: `$X times`,
        })} in year ${year}`,
        dt_gn_race_no_w: `Win any non-objective ${getGrade(
            grade
        )} ${distOrTerrain(distance, terrain)} race ${countText({
            count,
            single: "",
            multi: `$X times`,
        })}`,
        s_gn2_race_w: `Win any ${getGrade(gradeList[0])} or ${getGrade(
            gradeList[1]
        )} race as ${getStrategy(strategy)} ${countText({
            count,
            single: "",
            multi: `$X times`,
        })}`,
        s_gn_race_w: `Win any ${getGrade(grade)} race as ${getStrategy(
            strategy
        )} ${countText({ count, single: "", multi: `$X times` })}`,
        s_gn_race_wn_c: `Get a win streak of ${count}+ ${getGrade(
            grade
        )} ${countText({ count, single: "race" })} as ${getStrategy(strategy)}`,
        s_fn_gn_race_w: `Win any ${getGrade(grade)} race as ${getStrategy(
            strategy
        )} being the #${pop} favorite ${countText({
            count,
            single: "",
            multi: `$X times`,
        })}`,
        s_dt_gn_race_w: `Win any ${getGrade(grade)} ${distOrTerrain(
            distance,
            terrain
        )} race as ${getStrategy(strategy)} ${countText({
            count,
            single: "",
            multi: `$X times`,
        })}`,
        s_fn_dt_gn_race_w: `Win any ${getGrade(grade)} ${distOrTerrain(
            distance,
            terrain
        )} race as ${getStrategy(
            strategy
        )} being the #${pop} favorite ${countText({
            count,
            single: "",
            multi: `$X times`,
        })}`,
        l_gn_race_w: `Win any ${length}m race ${countText({
            count,
            single: "",
            multi: `$X times`,
        })}`,
        tc_gn_race_w: `Win ${countText({
            count,
            single: `a ${getGrade(grade)} race`,
            multi: `$X ${getGrade(grade)} races`,
        })} in one of these track conditions: ${getTrackConditions(
            trackConds
        )}`,
        rt_race_w: `Win any race on the ${
            racetracks[Number(trackName)]
        } racetrack ${countText({
            count,
            single: "",
            multi: `$X times`,
        })}`,
        r_race_w: `Win against ${getCharacter(charName)} in ${countText({
            count,
            single: "a race at least once",
            multi: `races at least ${count} times`,
        })}`,
        rn_race_w: `Win against any of the following characters ${countText({
            count,
            single: "time",
            multi: null,
            showCount: true,
        })}: ${getCharacterList(charList)}`,
        r_gn_race_w: `Win against ${getCharacter(charName)} in ${countText({
            count,
            single: `a ${getGrade(grade)} race at least once`,
            multi: `${getGrade(grade)} races at least ${count} times`,
        })}`,
        rn_gn_race_w: `Win against any of the following characters in ${getGrade(
            grade
        )} races ${countText({
            count,
            single: "once",
            multi: `at least ${count} times`,
        })}: ${getCharacterList(charList)}`,
        mo_ev: `Trigger the 「${
            eventName || value
        }」 training event while having at least ${getMood(mood)} mood`,
        ev: `Trigger the 「${eventName || value}」 training event`,
        evn: `Trigger the 「${
            eventName || value
        }」 training event ${count} times`,
        ev_trc_t: `After the 「${
            eventName || value
        }」 event, train in the facility that wasn't locked ${countText({
            count,
            single: "",
            multi: "times",
        })}`,
        p_ev_s: `Fulfill a promise to your fans in the 「${
            eventName || value
        }」 event`,
        e_ev: `Trigger any training event that grants ${data} ${countText({
            count,
            single: "",
            multi: `$X times`,
        })}`,
        ev_ac_on: `In the 「${eventName || value}」 training event, get the ${
            eventOutcomes[eventOutcome]
        } outcome after selecting one of the following choices: ${getOptionList(
            eventOptions
        )}`,
        ev_ac_on_nooutcome: `In the 「${
            eventName || value
        }」 training event, select one of the following choices: ${getOptionList(
            eventOptions
        )}`,
        ev_cn_on: `In the 「${eventName || value}」 training event, get the ${
            eventOutcomes[eventOutcome]
        } outcome after selecting choice #${eventOption}`,
        ev_cn_on_nochoice: `In the 「${
            eventName || value
        }」 training event, get the ${eventOutcomes[eventOutcome]} outcome`,
        ev_cn_on_nooutcome: `In the 「${
            eventName || value
        }」 training event, select choice #${eventOption}`,
        no_fail_training: "Don't fail a single training during the run",
        scen_uaf_wf: "Win the U.A.F. Showdown",
        scen_uaf_wa: "Win all the U.A.F. tournaments",

        // Others
        ft: "After first training",
        at: "Randomly after training (repeatable)",
        ds: "Recreation enabled",
        ny: "Dating before the first New Year's",
        fs: "After Finals (bond maxed)",
        ff: "After Finals (bond not maxed)",
        tf: "Training together failed",
    };

    if (tag in textMap) {
        return textMap[tag];
    } else {
        console.warn(`Unknown tag "${tag}"`);
        return tag;
    }
}

const skillTypes: { [key: string]: string } = {
    type_speed: "Speed-type",
    type_nav: "Navigation-type",
    type_rec: "Recovery-type",
    type_accel: "Acceleration-type",
    type_green: "Green",
};

const eventOutcomes: { [key: number]: string } = {
    0: "bad",
    1: "average",
    2: "good",
    3: "best",
    23: "good or best",
};

export function distOrTerrain(d?: number, t?: number) {
    if (d) {
        return getDistance(d);
    } else if (t) {
        return terrain[t - 1];
    } else {
        return "";
    }
}

export function distOrStyle(d?: number, s?: number) {
    if (d) {
        return getDistance(d);
    } else if (s) {
        return getStrategy(s);
    } else {
        return "";
    }
}

function getStat(s = 1) {
    return specialties[s - 1];
}

export function getDistance(d = 0) {
    return formatAptitude(distances[d]);
}

export function getStrategy(s = 1) {
    return formatAptitude(strategies[s - 1]);
}

function getYear(y = 1) {
    return `${years[y - 1]} Year`;
}

function getMonth(m = 1) {
    return months[m - 1];
}

function getHalf(h = 1) {
    return times[h - 1];
}

function getGrade(g = 1) {
    return grades[g];
}

function getMood(m = 3) {
    return moods[m - 1];
}

function getTrackConditions(c = [1]) {
    return c
        .map((x, i) =>
            i < c.length - 1
                ? `${raceConditions[x]}, `
                : `or ${raceConditions[x]}`
        )
        .join("");
}

function getScenario(s = 1) {
    return scenarios.find((scenario) => scenario.id === s)?.name || "";
}

function getOptionList(o = [1]) {
    return o
        .map((x, i) => (i < o.length - 1 ? `#${x}, ` : `or #${x}`))
        .join("");
}

const years = ["Debut", "Classic", "Senior"];
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
const times = ["Early", "Late"];
