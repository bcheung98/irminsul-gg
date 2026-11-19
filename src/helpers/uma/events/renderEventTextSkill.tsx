// Component imports
import {
    SkillHint,
    SkillText,
    SkillTextRandom,
} from "@/components/_uma/TrainingEvents";

// Type imports
import type { EventRewards } from "@/types/uma/event";

type SkillRenderer = (event: EventRewards) => React.ReactNode;

export const renderEventTextSkill = {
    sk: (event) => <SkillHint event={event} isHint />,

    sg: (event) => <SkillHint event={event} isHint={false} />,

    sre: (event) => <SkillHint event={event} isHint={false} lose />,

    hp: (event) => <SkillHint event={event} isHint={false} heal />,

    skill: (event) => <SkillText event={event} />,

    sr: (event) => <SkillTextRandom eventHints={event.props?.eventHints} />,

    ps_h: (event) => <SkillText event={event} text="※ <> was healed" />,

    ps_nh: (event) => <SkillText event={event} text="※ <> was not healed" />,
} satisfies Record<string, SkillRenderer>;
