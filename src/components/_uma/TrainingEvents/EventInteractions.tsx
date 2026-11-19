import {
    createContext,
    useContext,
    useState,
    type Dispatch,
    type SetStateAction,
} from "react";

// Component imports
import ToggleButtons from "@/components/ToggleButtons";

// Helper imports
import { getOrdinal } from "@/utils";
import { optionalRaceTypes } from "@/data/uma/raceRewards";

// Type imports
import type { Event } from "@/types/uma/event";
import type { PlacementRange, RaceTypeOption } from "@/types/uma/race";

type EventInteraction =
    | {
          type: "placement";
          options: PlacementRange[];
      }
    | {
          type: "raceType";
          options: RaceTypeOption[];
      };

type EventInteractionValue = string | number;

type EventInteractionContextValue = {
    interaction: EventInteraction | null;
    value: EventInteractionValue;
    setValue: Dispatch<SetStateAction<EventInteractionValue>>;
};
const EventInteractionContext =
    createContext<EventInteractionContextValue | null>(null);

export function useEventInteraction() {
    return useContext(EventInteractionContext);
}

function getInitialInteractionValue(
    interaction: EventInteraction | null,
): EventInteractionValue {
    if (!interaction) return 1;

    switch (interaction.type) {
        case "placement":
            return interaction.options[0]?.[0] ?? 1;
        case "raceType":
            return interaction.options[0]?.value ?? "optional_g1";
    }
}

export function EventInteractionProvider({
    interaction,
    children,
}: {
    interaction: EventInteraction | null;
    children: React.ReactNode;
}) {
    const [value, setValue] = useState<EventInteractionValue>(() =>
        getInitialInteractionValue(interaction),
    );

    return (
        <EventInteractionContext.Provider
            value={{ interaction, value, setValue }}
        >
            {children}
        </EventInteractionContext.Provider>
    );
}

export default function EventInteractions() {
    const context = useEventInteraction();

    if (!context) return null;

    const { interaction, value, setValue } = context;

    if (!interaction) return null;

    const buttons =
        interaction.type === "placement"
            ? interaction.options.map((range) => ({
                  label: getPlacementLabel(range),
                  value: range[0],
              }))
            : interaction.options;

    return (
        <ToggleButtons
            buttons={buttons}
            exclusive
            value={value}
            onChange={(_, value) => {
                if (value !== null) {
                    setValue(value);
                }
            }}
            padding="4px 8px"
        />
    );
}

function getPlacementLabel([start, end]: PlacementRange): string {
    if (start === end) {
        return getOrdinal(start);
    }

    if (end === 0) {
        return `${getOrdinal(start)} or worse`;
    }

    return `${getOrdinal(start)}-${getOrdinal(end)}`;
}

function getPlacementButtons(
    placement?: number[],
    raceType?: string,
): PlacementRange[] {
    if (!placement || raceType === "goal_non_race") return [];

    const [start, end = start] = placement;

    if (placement.length === 1) {
        return [];
    }

    const groupFrom =
        raceType === "goal_debut" || raceType === "goal_g23"
            ? 3
            : raceType === "optional_g1"
              ? 6
              : 4;
    const buttons: PlacementRange[] = [];

    for (let i = start; i < groupFrom; i++) {
        if (end !== 0 && i > end) {
            break;
        }

        buttons.push([i, i]);
    }

    if (end === 0 || end >= groupFrom) {
        buttons.push([Math.max(start, groupFrom), end]);
    }

    return buttons;
}

export function getEventInteraction(event: Event): EventInteraction | null {
    const rewards = [
        ...event.options.flatMap((option) => option.rewards),
        ...(event.altOutcome ?? []).flatMap((option) => option.rewards),
    ];

    for (const reward of rewards) {
        if (!reward) return null;

        if (reward.tag !== "rr") continue;

        const { placement, raceType } = reward.props ?? {};

        if (!raceType) continue;

        if (!placement && raceType.startsWith("optional_")) {
            return {
                type: "raceType",
                options: optionalRaceTypes,
            };
        }

        const options = getPlacementButtons(placement, raceType);

        if (options.length > 0) {
            return {
                type: "placement",
                options,
            };
        }
    }

    return null;
}
