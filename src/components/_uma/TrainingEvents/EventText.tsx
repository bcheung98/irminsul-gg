// Component imports
import Text from "@/components/Text";
import EventTextRace, { isRaceTag } from "./EventTextRace";
import EventTextSkill, { isSkillTag } from "./EventTextSkill";
import EventTextStatus, { isStatusTag } from "./EventTextStatus";
import EventTextPlain from "./EventTextPlain";
import { RaceRewards } from "./EventText.components";

// MUI imports
import { useTheme } from "@mui/material/styles";

// Type imports
import type { EventRewards } from "@/types/uma/event";

export default function EventText({
    outcome,
    prefix = "",
}: {
    outcome: EventRewards;
    prefix?: string;
}) {
    const theme = useTheme();

    const { tag, props, random } = outcome;

    const content = (() => {
        if (isRaceTag(tag)) {
            return <EventTextRace event={outcome} />;
        }

        if (isSkillTag(tag)) {
            return <EventTextSkill event={outcome} />;
        }

        if (isStatusTag(tag)) {
            return <EventTextStatus event={outcome} />;
        }

        switch (tag) {
            case "nl":
                return <br />;
            case "rr":
                return (
                    <RaceRewards
                        placement={props?.placement}
                        raceType={props?.raceType}
                    />
                );

            case "sc":
                return props?.conditions?.map((con, i) => (
                    <EventText key={i} outcome={con} prefix="※" />
                ));
            case "di_s":
                return (
                    <Text
                        variant="body2"
                        weight="highlight"
                        sx={{
                            display: "block",
                            my: 1,
                            color: theme.text.uma.highlight,
                        }}
                    >
                        or
                    </Text>
                );
            default:
                return <EventTextPlain event={outcome} />;
        }
    })();

    return (
        <Text variant="body2" component="span">
            {random ? "(Random) " : prefix ? `${prefix} ` : null}
            {content}
        </Text>
    );
}
