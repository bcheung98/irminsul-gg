// Component imports
import Text from "@/components/Text";

// MUI imports
import Card from "@mui/material/Card";

// Helper imports
import { useGameTag } from "@/context";
import { isUreleasedContent } from "@/helpers/isUnreleasedContent";

export default function BetaTag({ version }: { version: string }) {
    const game = useGameTag();

    const text =
        game === "uma"
            ? "This content is only available on the JP server!"
            : "Viewing beta content, all content is subject to change!";

    if (!isUreleasedContent(version, game)) {
        return (
            <Card
                sx={(theme) => ({
                    p: 2,
                    backgroundColor: theme.palette.error.dark,
                })}
            >
                <Text>{text}</Text>
            </Card>
        );
    } else return null;
}
