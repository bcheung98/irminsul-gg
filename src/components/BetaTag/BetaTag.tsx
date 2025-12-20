// Component imports
import Text from "@/components/Text";

// MUI imports
import Card from "@mui/material/Card";

// Helper imports
import { useGameTag } from "@/context";
import { isUnreleasedContent } from "@/helpers/isUnreleasedContent";

// Type imports
import { GameNoUma } from "@/types";

export default function BetaTag({ version }: { version: string }) {
    const game = useGameTag() as GameNoUma;

    const text = "Viewing beta content, all content is subject to change!";

    if (!isUnreleasedContent(version, game)) {
        return (
            <Card
                sx={(theme) => ({
                    p: 2,
                    backgroundColor: theme.palette.error.dark,
                })}
            >
                <Text weight="highlight">{text}</Text>
            </Card>
        );
    } else return null;
}
