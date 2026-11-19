// Component imports
import { StatusEffect } from "@/components/_uma/TrainingEvents";

// Type imports
import type { EventRewards } from "@/types/uma/event";

type StatusRenderer = (event: EventRewards) => React.ReactNode;

const renderHealStatus: StatusRenderer = ({ data }) =>
    data ? (
        <StatusEffect effectID={data} text="Heal" />
    ) : (
        "Heal a negative status effect"
    );

export const renderEventTextStatus = {
    se: ({ data }) => <StatusEffect effectID={data} text="Obtain" />,

    se_r: renderHealStatus,
    he: renderHealStatus,

    cond: ({ data }) => (
        <StatusEffect effectID={data} text="Get the <> status effect" />
    ),

    cond_e: ({ data, count }) => (
        <StatusEffect
            effectID={data}
            text="Have the <> status effect at the end of training"
            count={count}
        />
    ),

    cond_get_fulfill: ({ data }) => (
        <StatusEffect
            effectID={data}
            text="Get the <> status effect and fulfill its conditions"
        />
    ),

    se_h: ({ data }) => <StatusEffect effectID={data} text="※ <> was healed" />,

    se_nh: ({ data }) => (
        <StatusEffect effectID={data} text="※ <> was not healed" />
    ),

    se_has: ({ data }) => <StatusEffect effectID={data} text="※ has <>" />,
} satisfies Record<string, StatusRenderer>;
