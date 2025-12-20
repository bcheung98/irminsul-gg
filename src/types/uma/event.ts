export interface Events {
    id: number;
    events: EventData;
    props?: EventPropData;
}

export type EventTypes = keyof EventList;

export interface EventList {
    scenario: ScenarioEvents[];
    "support-common": SupportEvents[];
    "support-ssr": SupportEvents[];
    "support-sr": SupportEvents[];
    "support-pal": PalGroupEvents[];
    "support-group": PalGroupEvents[];
    character: CharacterEvents[];
    "character-outfit": CharacterEvents[];
}

export interface EventPropData {
    dance: [string, string];
    newYear: string;
    masterTrainer: string;
    miscEventNames: { en: string; jp: string }[];
}

export interface EventData {
    character?: Event[];
    recreation?: Event[];
    secret?: Event[];
    outfit?: Event[];
    common?: Event[];
    chain?: Event[];
    special?: Event[];
    random?: Event[];
    scenario?: Event[];
}

export interface Event {
    id?: number;
    name: string;
    nameJP: string;
    options: EventOptions[];
    conditions?: EventRewards[];
    headers?: string[];
    relevantChar?: number;
    didNotExist?: string;
    otherVersions?: EventOtherVersions[];
    altOutcome?: EventOptions[];
    altOptions?: Event[];
    forceHasChoices?: boolean;
    scenarioLink?: number;
    cardID?: number;
}

export interface EventOptions {
    optionName?: string;
    rewards: EventRewards[];
    chances?: number[];
}

export interface EventRewards {
    tag: string;
    value?: string | number | (string | number)[] | null;
    count?: number | number[];
    data?: number | string;
    props?: EventExtraProps;
    random?: boolean;
}

export interface EventOtherVersions {
    version: string;
    data: Event;
}

export type EventValue = string | number;
export type EventDataValue = EventValue | EventValue[];

export interface CharacterEvents extends Events {
    events: CharacterEventData;
}
export type CharacterEventData = Pick<
    EventData,
    "character" | "recreation" | "secret" | "outfit"
>;

export interface SupportEvents extends Events {
    events: SupportEventData;
}
export type SupportEventData = Pick<EventData, "common" | "chain">;

export interface PalGroupEvents extends Events {
    events: PalGroupEventData;
}
export type PalGroupEventData = Pick<
    EventData,
    "special" | "random" | "recreation"
>;

export interface ScenarioEvents extends Events {
    events: ScenarioEventData;
}
export type ScenarioEventData = Pick<EventData, "scenario" | "random">;

export interface EventExtraProps {
    year?: number;
    month?: number;
    half?: number;
    grade?: number;
    gradeList?: number[];
    distance?: number;
    distanceList?: number[];
    strategy?: number;
    strategyList?: number[];
    terrain?: number;
    length?: number;
    raceName?: number | string;
    raceList?: (number | string)[];
    trackName?: number | string;
    trackList?: (number | string)[];
    trackCond?: number;
    trackConds?: number[];
    position?: number;
    pop?: number;
    stat?: number;
    mood?: number;
    statusEffect?: number;
    eventName?: string;
    eventNumber?: number;
    eventOption?: number;
    eventOptions?: number[];
    eventOutcome?: number;
    charName?: number | string;
    charList?: number[];
    conditions?: EventRewards[];
}

export interface StatusEffect {
    id: number;
    name: string;
    description: string;
    nameJP: string;
    descriptionJP: string;
}
