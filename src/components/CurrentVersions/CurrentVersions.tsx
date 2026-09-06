// Component imports
import ContentBox from "@/components/ContentBox";
import TextLabel from "@/components/TextLabel";
import VersionReleaseDate from "@/components/VersionHighlights/VersionReleaseDate";

// MUI imports
import Stack from "@mui/material/Stack";

// Helper imports
import versions from "@/data/versions";
import { games as gamesList } from "@/data/games";
import { useVersionReleaseDates } from "@/components/VersionHighlights/VersionHighlights.hooks";

// Type imports
import { GameInfo } from "@/types";

export default function CurrentVersions() {
    const games = Object.values(gamesList).filter(
        (game) => game.enabled && game.tag !== "uma",
    );

    const releaseDates = useVersionReleaseDates(games);

    const sortedGames = [...games].sort((a, b) => {
        const aDate = releaseDates?.[a.tag];
        const bDate = releaseDates?.[b.tag];

        if (!aDate && !bDate) {
            return a.name.localeCompare(b.name);
        }

        if (!aDate) return 1;
        if (!bDate) return -1;

        return new Date(bDate).getTime() - new Date(aDate).getTime();
    });

    return (
        <ContentBox header="Current Game Versions">
            <Stack spacing={2}>
                {sortedGames.map((game) => (
                    <Label
                        key={game.tag}
                        game={game}
                        releaseDate={releaseDates?.[game.tag]}
                    />
                ))}
            </Stack>
        </ContentBox>
    );
}

function Label({
    game,
    releaseDate,
}: {
    game: GameInfo;
    releaseDate?: string | null;
}) {
    const { version, name } = versions[game.tag][0];

    return (
        <TextLabel
            key={game.tag}
            icon={`${game.tag}/_common/Icon`}
            iconProps={{ size: 32, tooltip: game.name }}
            title={`${version} - ${name}`}
            subtitle={
                <VersionReleaseDate
                    releaseDate={releaseDate}
                    weight="primary"
                    variant="daysAgo"
                />
            }
            spacing={2}
        />
    );
}
