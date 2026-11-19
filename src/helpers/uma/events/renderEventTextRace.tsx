// Component imports
import { Race, RaceMulti, RaceSeries } from "@/components/_uma/TrainingEvents";

// Helper imports
import { getCharacterName, getStrategy } from ".";
import { getOrdinal } from "@/utils";

// Type imports
import type { EventRewards } from "@/types/uma/event";
import type { UmaCharacterProfile } from "@/types/uma/character";

type RaceRenderer = (
    event: EventRewards,
    context: {
        profiles: UmaCharacterProfile[];
    },
) => React.ReactNode;

const renderRacePlace: RaceRenderer = ({ tag, props }) => {
    const [start, end] = props?.placement || [2];
    let range = `${getOrdinal(end)} or better`;

    const isObjective = tag === "obj_race_place";

    if (end === 0 || end === null) {
        range = `${getOrdinal(start)} or worse`;
    } else if (!end) {
        range = `${getOrdinal(start)}`;
    } else if (end - start <= 1) {
        range = `${getOrdinal(start)}-${getOrdinal(end)}`;
    }

    return (
        <Race
            race={props?.raceName?.toString()}
            text={`Place ${range} in the <> ${isObjective ? "objective race" : "race"}`}
        />
    );
};

const renderRaceSeries: RaceRenderer = ({ tag }) => <RaceSeries tag={tag} />;

const renderNoRaceSeries: RaceRenderer = ({ tag }) => (
    <RaceSeries tag={tag.split("_").slice(1).join("_")} text="Don't win" />
);

const renderRivalNoRaceSeries: RaceRenderer = (
    { tag, props },
    { profiles },
) => (
    <RaceSeries
        tag={tag.split("_").slice(2).join("_")}
        text={`${getCharacterName(props?.charName, profiles)} does not win`}
    />
);

export const renderEventTextRace = {
    win: ({ props }) => <Race race={props?.raceName} />,

    lose: ({ props }) => <Race race={props?.raceName} text="Lose the" />,

    do_not_win: ({ props }) => (
        <Race race={props?.raceName} text="Do not win the " />
    ),

    win_all: ({ props }) => <RaceMulti races={props?.raceList} />,

    win_any: ({ props }) => (
        <RaceMulti
            races={props?.raceList}
            text="Win any of the following races:"
        />
    ),

    win_or: ({ props }) => (
        <RaceMulti races={props?.raceList} text="Win the" divider=" or the " />
    ),

    win_on_streak: ({ props }) => (
        <Race
            race={props?.raceName?.toString()}
            text="Without breaking the win streak, win the"
        />
    ),

    win_as_strat: ({ props }) => (
        <Race
            race={props?.raceName?.toString()}
            text={`Win the <> as a ${getStrategy(props?.strategy)}`}
        />
    ),

    win_as_not_strat: ({ props }) => (
        <Race
            race={props?.raceName?.toString()}
            text={`Win the <> with any style other than ${getStrategy(
                props?.strategy,
            )}`}
        />
    ),

    win_n_of: ({ count, props }) => (
        <RaceMulti
            races={props?.raceList}
            text={`Win at least ${count} of the following races:`}
        />
    ),

    race_w2: ({ props }) => (
        <Race race={props?.raceName?.toString()} text="Win the <> twice" />
    ),

    race_pn: ({ props }) => (
        <Race
            race={props?.raceName?.toString()}
            text={`Place ${getOrdinal(props?.position)} or better in the`}
        />
    ),

    race_place: renderRacePlace,
    obj_race_place: renderRacePlace,

    participate: ({ props }) => (
        <Race race={props?.raceName} text="Run in the" />
    ),

    obj_participate: ({ props }) => (
        <Race race={props?.raceName} text="Run in the <> objective race" />
    ),

    do_not_participate: ({ props }) => (
        <Race race={props?.raceName} text="Do not run in the" />
    ),

    obj_win: ({ props }) => (
        <Race
            race={props?.raceName?.toString()}
            text="Win the <> objective race"
        />
    ),

    pick_and_win: ({ props }) => (
        <Race
            race={props?.raceName?.toString()}
            text="Pick the <> as an objective and win"
        />
    ),

    dont_pick_and_win: ({ props }) => (
        <Race
            race={props?.raceName?.toString()}
            text="Enter the <> as an optional race and win"
        />
    ),

    beat_rival: ({ props }, { profiles }) => (
        <Race
            race={props?.raceName?.toString()}
            text={`Run in the <> and beat ${getCharacterName(
                props?.charName,
                profiles,
            )}`}
        />
    ),

    rival_draw: ({ props }, { profiles }) => (
        <Race
            race={props?.raceName?.toString()}
            text={`Both you and ${getCharacterName(
                props?.charName,
                profiles,
            )} lose the`}
        />
    ),

    rival_wins: ({ props }, { profiles }) => (
        <Race
            race={props?.raceName?.toString()}
            text={`${getCharacterName(props?.charName, profiles)} wins the <>`}
        />
    ),

    lose_to_rival: ({ props }, { profiles }) => (
        <Race
            race={props?.raceName?.toString()}
            text={`Run in the <> and lose to ${getCharacterName(
                props?.charName,
                profiles,
            )}`}
        />
    ),

    triple_crown: renderRaceSeries,
    triple_tiara: renderRaceSeries,
    spring_triple_crown: renderRaceSeries,
    autumn_triple_crown_senior: renderRaceSeries,
    autumn_triple_crown_same_year: renderRaceSeries,

    no_triple_crown: renderNoRaceSeries,
    no_triple_tiara: renderNoRaceSeries,

    rival_no_triple_crown: renderRivalNoRaceSeries,
    rival_no_triple_tiara: renderRivalNoRaceSeries,

    rc: ({ value, props }) => (
        <Race
            race={props?.raceName?.toString()}
            text={`Objective ${value} changed to`}
        />
    ),

    ra: ({ props }) => (
        <Race
            race={props?.raceName?.toString()}
            text="Objective race <> cancelled"
        />
    ),

    rh: ({ props }) => (
        <Race
            race={props?.raceName?.toString()}
            text="Increased difficulty of "
        />
    ),

    noa: ({ props }) => (
        <Race race={props?.raceName?.toString()} text="New objective added: " />
    ),
} satisfies Record<string, RaceRenderer>;
