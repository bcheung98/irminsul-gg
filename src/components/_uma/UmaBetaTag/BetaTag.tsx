// Component imports
import Text from "@/components/Text";

// MUI imports
import Card from "@mui/material/Card";

// Helper imports
import { isUnreleasedContentUma } from "@/helpers/isUnreleasedContent";
import { useStore, useServerStore } from "@/stores";

// Type imports
import { UmaVersion } from "@/types/version";

export default function UmaBetaTag({ release }: { release: UmaVersion }) {
    const server = useStore(useServerStore, (state) => state.uma);

    const text = "This content is only available on the JP server!";

    if (server === "NA" && isUnreleasedContentUma(release)) {
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
