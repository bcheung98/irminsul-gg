import parse from "html-react-parser";

// Component imports
import Text, { TextWeight } from "@/components/Text";

// Helper imports
import { formatAptitude } from "@/helpers/uma/formatConditions";

export default function UmaSkillDescription({
    description,
    color,
    weight = "primary",
}: {
    description: string;
    color?: string;
    weight?: TextWeight;
}) {
    function convert(desc: string) {
        return desc
            .replace("Opening Leg", "early-race")
            .replace("Middle Leg", "mid-race")
            .replace("Final Leg", "late-race")
            .replace("Last Spurt", "last spurt")
            .replace("Final Corner", "final corner")
            .replace("Final Straight", "final straight")
            .replace("Straight", "straight")
            .replace("Speed", "velocity")
            .replace("speed", "velocity")
            .replace("Stamina", "endurance")
            .replace("stamina", "endurance");
    }

    function parseSkillDescription(desc: string) {
        const str = desc.split("・");
        const tags = str
            .splice(0, str.length - 1)
            .map((s) =>
                s
                    .split("/")
                    .map((i) => formatAptitude(i))
                    .join(", ")
            )
            .join(", ");
        const text = str.splice(-1)[0];
        return parse(`${convert(text)} ${tags.length > 0 ? `(${tags})` : ""}`);
    }

    return (
        <Text
            component="span"
            variant="body2"
            weight={weight}
            sx={(theme) => ({ color: color || theme.text.description })}
        >
            {parseSkillDescription(description)}
        </Text>
    );
}
