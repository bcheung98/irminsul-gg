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
    function parseSkillDescription(desc: string) {
        const str = desc.split("・");
        const tags = str
            .splice(0, str.length - 1)
            .map((s) =>
                s
                    .split("/")
                    .map((i) => formatAptitude(i))
                    .join(", "),
            )
            .join(", ");
        const text = str.splice(-1)[0];
        return parse(`${text} ${tags.length > 0 ? `(${tags})` : ""}`);
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
