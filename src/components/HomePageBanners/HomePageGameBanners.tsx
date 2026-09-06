// Component imports
import TextLabel from "@/components/TextLabel";
import CurrentBannersContent from "@/components/CurrentBanners/CurrentBannersContent";

// MUI imports
import { alpha, useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import ButtonBase from "@mui/material/ButtonBase";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Skeleton from "@mui/material/Skeleton";

// Helper imports
import { useServerStore } from "@/stores";
import { getContrastText } from "@/utils/getContrastText";
import { BannerDataContext } from "@/components/BannerArchive/BannerArchive.utils";
import { getBannerGroups } from "@/helpers/filterBanners";

// Type imports
import { Banner, BannerOption } from "@/types/banner";
import { SearchResult } from "@/components/SiteSearch";
import { GameInfo } from "@/types";

export default function HomePageGameBanners(props: {
    game: GameInfo;
    banners: Record<string, Banner[]>;
    characters: SearchResult[];
    weapons: SearchResult[];
}) {
    const theme = useTheme();

    const game = props.game;
    const server = useServerStore()[game.tag];

    const banners = {
        character: props.banners[`${game.tag}/characters`] || [],
        weapon: props.banners[`${game.tag}/weapons`] || [],
        chronicled: props.banners[`${game.tag}/chronicled`] || [],
    };

    const {
        currentCharacterBanners,
        currentWeaponBanners,
        currentChronicledBanners,
        activeBanners,
    } = getBannerGroups(game.tag, server, banners);

    if (!activeBanners) return null;

    const characters = props.characters
        .filter((item) => item.category.startsWith(game.tag))
        .map((item) => ({
            ...item,
            category: "characters",
            url: item.url ? `${item.id}` : "",
        })) as BannerOption[];
    const weapons = props.weapons
        .filter((item) => item.category.startsWith(game.tag))
        .map((item) => ({
            ...item,
            category: "weapons",
            url: item.url ? `${item.id}` : "",
        })) as BannerOption[];

    const loaded = characters.length > 0 && weapons.length > 0;

    const textColor = getContrastText(theme.text.primary, game.color);

    return (
        <Card
            sx={{
                p: loaded ? 2 : 0,
                backgroundColor: theme.background(0),
                borderRadius: theme.contentBox.border.radius,
            }}
        >
            {loaded ? (
                <BannerDataContext value={{ characters, weapons, server }}>
                    <Stack
                        spacing={1}
                        divider={<Divider />}
                        sx={{ textAlign: "left" }}
                    >
                        <TextLabel
                            icon={`${game.tag}/_common/Icon`}
                            iconProps={{ size: 32 }}
                            title={game.name}
                            spacing={2}
                        />
                        <Stack spacing={2}>
                            <CurrentBannersContent
                                game={game.tag}
                                character={currentCharacterBanners}
                                weapon={currentWeaponBanners}
                                chronicled={currentChronicledBanners}
                            />
                            <ButtonBase
                                href={`/${game.tag}/banners`}
                                sx={{
                                    width: "max-content",
                                    height: "28px",
                                    px: 2,
                                    borderRadius: "4px",
                                    backgroundColor: game.color,
                                    "&:hover": {
                                        backgroundColor: alpha(
                                            game.color,
                                            0.75,
                                        ),
                                    },
                                    transition: "background-color 0.15s",
                                }}
                            >
                                <TextLabel
                                    icon={
                                        <ChevronRightIcon
                                            sx={{
                                                color: textColor,
                                                fontSize: "18px",
                                            }}
                                        />
                                    }
                                    title={`View all ${game.shortName} Banners`}
                                    titleProps={{
                                        variant: "body2",
                                        color: textColor,
                                    }}
                                    spacing={0.5}
                                    reverse
                                />
                            </ButtonBase>
                        </Stack>
                    </Stack>
                </BannerDataContext>
            ) : (
                <Skeleton
                    variant="rounded"
                    height={246}
                    sx={{ backgroundColor: theme.background(1, "light") }}
                />
            )}
        </Card>
    );
}
