// MUI imports
import { useTheme } from "@mui/material/styles";

// Helper imports
import { useCharIDContext, useUmaContext } from "@/context";
import { renderEventTextPlain } from "@/helpers/uma/events/renderEventTextPlain";
import { useStore, useServerStore } from "@/stores";
import { getCharacterEventNames } from "@/helpers/uma/getEventNames";

// Type imports
import type { EventRewards } from "@/types/uma/event";

export default function EventTextPlain({ event }: { event: EventRewards }) {
    const theme = useTheme();

    const charID = useCharIDContext();
    const { profiles, events } = useUmaContext();
    const server = useStore(useServerStore, (state) => state["uma"]) || "NA";

    const eventNames = getCharacterEventNames(events);

    const highlight = ["event_chain_end", "rec_enabled"].includes(event.tag);

    const textColor = highlight ? theme.text.uma.highlight : theme.text.primary;

    const textWeight = highlight
        ? theme.font.weight.highlight
        : theme.font.weight.primary;

    return (
        <span style={{ color: textColor, fontWeight: textWeight }}>
            {renderEventTextPlain(event, {
                profiles,
                charID,
                server,
                eventNames,
            })}
        </span>
    );
}
