// Component imports
import TextLabel from "@/components/TextLabel";
import CurrentBannersContent from "@/components/CurrentBanners/CurrentBannersContent";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import ButtonBase from "@mui/material/ButtonBase";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// Helper imports
import { useServerStore } from "@/stores";
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

    return (
        <BannerDataContext value={{ characters, weapons, server }}>
            <Card
                sx={{
                    p: 2,
                    backgroundColor: theme.background(0),
                    borderRadius: theme.contentBox.border.radius,
                }}
            >
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
                        href={`/${game.tag}`}
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
                                backgroundColor: theme.palette.info.main,
                                "&:hover": {
                                    backgroundColor: theme.palette.info.dark,
                                },
                                transition: "background-color 0.15s",
                            }}
                        >
                            <TextLabel
                                icon={
                                    <ChevronRightIcon
                                        sx={{
                                            color: theme.text.primary,
                                            fontSize: "18px",
                                        }}
                                    />
                                }
                                title={`View all ${game.name} Banners`}
                                titleProps={{ variant: "body2" }}
                                spacing={0.5}
                                reverse
                            />
                        </ButtonBase>
                    </Stack>
                </Stack>
            </Card>
        </BannerDataContext>
    );
}
