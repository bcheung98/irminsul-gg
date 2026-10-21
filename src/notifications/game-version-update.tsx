// Component imports
import { DescriptionSmall, SubHeader } from "@/components/Blog";
import TextLabel from "@/components/TextLabel";
import Image from "@/components/Image";
import { SearchLoader } from "@/components/SearchDialog";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Helper imports
import { formatHref } from "@/utils";
import {
    parseVersionTag,
    useGameVersionData,
    versionDataKeys,
} from "@/components/Notifications/Notifications.utils";
import { useVersionContent } from "@/components/VersionHighlights/VersionHighlights.hooks";
import { games } from "@/data/games";
import { categories, categoryImgURLs, categoryURLs } from "@/data/categories";
import { getImageURL } from "@/components/InfoCard/InfoCard.utils";
import { getRarityColors } from "@/helpers/rarityColors";
import { useSettingsStore } from "@/stores";
import versions from "@/data/versions";
import Color from "@/utils/colors";

// Type imports
import type { NotificationContentProps } from "@/notifications";
import type { Game } from "@/types";
import type {
    VersionCategory,
    VersionHighlightsProps,
    VersionItemData,
} from "@/components/VersionHighlights";

export default function GameVersionUpdateNotification({
    tag,
}: NotificationContentProps) {
    const parsed = parseVersionTag(tag);

    if (!parsed) return null;

    return (
        <GameVersionUpdateContent game={parsed.game} version={parsed.version} />
    );
}

function GameVersionUpdateContent({
    game,
    version,
}: {
    game: keyof typeof versionDataKeys;
    version: string;
}) {
    const { characters, weapons, equipment, isLoading, error } =
        useGameVersionData(game);

    const versionContent = useVersionContent(
        game,
        {
            characters,
            weapons,
            equipment,
        },
        version,
    );

    if (isLoading) return <SearchLoader />;
    if (error || !characters || !weapons) return null;

    return (
        <VersionUpdateDetails
            game={game}
            version={version}
            {...versionContent}
        />
    );
}

interface VersionUpdateDetailsProps extends VersionHighlightsProps {
    game: Game;
    version: string;
}

function VersionUpdateDetails({
    game,
    version,
    characters,
    weapons,
    equipment,
    bangboos,
}: VersionUpdateDetailsProps) {
    const theme = useTheme();

    const categories = [
        { category: "characters", items: characters },
        { category: "weapons", items: weapons },
        { category: "equipment", items: equipment },
        { category: "bangboos", items: bangboos ?? [] },
    ] satisfies {
        category: VersionCategory;
        items: VersionItemData[];
    }[];

    const versionInfo = versions[game].find((info) => info.version === version);
    const gameInfo = games[game];

    const gameColor = new Color(gameInfo.color);

    return (
        <Stack spacing={2}>
            <DescriptionSmall>
                {`The ${gameInfo.name} site has been updated for Version ${version}`}{" "}
                - <i>{`${versionInfo?.name}`}</i>.
            </DescriptionSmall>
            <Card
                sx={{
                    display: "flex",
                    backgroundColor: theme.background(2),
                    border: `1px solid ${theme.border.color.primary}`,
                    borderRadius: theme.contentBox.border.radius,
                }}
            >
                <Image
                    src={`${game}/_common/wallpapers/${gameInfo.shortName}_${version}`}
                    fallbackSrc={`${game}/_common/wallpapers/${gameInfo.shortName}`}
                    style={{
                        width: "100%",
                        height: "auto",
                        aspectRatio: 16 / 9,
                    }}
                    fadeOnLoad
                />
            </Card>
            <Card
                sx={{
                    px: 2,
                    pt: 1,
                    pb: 2,
                    borderRadius: theme.contentBox.border.radius,
                    border: `1px solid ${gameColor.darken(0.5).toString()}`,
                    backgroundColor: gameColor
                        .alpha(0.5)
                        .darken(0.75)
                        .toString(),
                }}
            >
                <Stack
                    spacing={1}
                    divider={
                        <Divider
                            sx={{
                                borderColor: gameColor.darken(0.5).toString(),
                            }}
                        />
                    }
                >
                    <SubHeader>New Content</SubHeader>
                    <Stack spacing={2}>
                        {categories.map(({ category, items }) => (
                            <VersionUpdateCategory
                                key={category}
                                game={game}
                                category={category}
                                items={items}
                            />
                        ))}
                    </Stack>
                </Stack>
            </Card>
        </Stack>
    );
}

function VersionUpdateCategory({
    game,
    category,
    items,
}: {
    game: Game;
    category: VersionCategory;
    items: VersionItemData[];
}) {
    const theme = useTheme();

    const gender = useSettingsStore((state) => state.gender);

    if (!items.length) return null;

    const resolvedImageURL = (item: VersionItemData) => {
        if (category === "equipment") {
            return categoryImgURLs[`${game}/equipment`](
                game === "endfield" ? item.stringId : item.id,
                item.name,
            );
        } else {
            let url = getImageURL({
                game,
                tag: categoryURLs[`${game}/${category}`],
                id: item.id,
                gender,
            });
            if (game === "zzz" && category === "weapons") {
                url += "_large";
            }
            return url;
        }
    };

    return (
        <Stack spacing={1}>
            <TextLabel
                title={categories[`${game}/${category}`]}
                titleProps={{ variant: "subtitle1" }}
            />
            <Grid container spacing={2}>
                {items.map((item) => (
                    <Grid key={item.id} size={{ xs: 12, sm: 6 }}>
                        <TextLabel
                            icon={resolvedImageURL(item)}
                            iconProps={{
                                size: 28,
                                styles: {
                                    outline: `1px solid ${getRarityColors(game, item.rarity)}`,
                                    backgroundColor: theme.background(2),
                                },
                            }}
                            title={item.displayName}
                            titleProps={{
                                variant: "body2",
                            }}
                            href={
                                item.url
                                    ? `${categoryURLs[`${game}/${category}`]}/${formatHref(item.url)}`
                                    : ""
                            }
                        />
                    </Grid>
                ))}
            </Grid>
        </Stack>
    );
}
