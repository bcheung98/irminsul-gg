// Component imports
import Text from "@/components/Text";
import BannerItems from "@/components/BannerItems";

// MUI imports
import Stack from "@mui/material/Stack";

// Helper imports
import { useServerStore } from "@/stores";
import {
    BannerDataContext,
    getBannerLabel,
    isFutureBanner,
} from "../BannerArchive/BannerArchive.utils";

// Type imports
import { EventObjectExtendedProps } from "@/types/calendar";
import { BannerOption } from "@/types/banner";
import { SearchResult } from "../SiteSearch";

export default function CalendarEventPopup(props: {
    eventProps: EventObjectExtendedProps;
    characters: SearchResult[];
    weapons: SearchResult[];
}) {
    const { game, isCurrent } = props.eventProps;
    const characters = props.characters
        .filter((item) => item.category.startsWith(game))
        .map((item) => ({
            ...item,
            category: "characters",
            url: `${item.id}`,
        })) as BannerOption[];
    const weapons = props.weapons
        .filter((item) => item.category.startsWith(game))
        .map((item) => ({
            ...item,
            category: "weapons",
            url: `${item.id}`,
        })) as BannerOption[];
    const server = useServerStore()[game];
    const isFuture = isFutureBanner(props.eventProps, server);

    return (
        <BannerDataContext value={{ characters, weapons, server }}>
            <Stack spacing={1}>
                <Text weight="highlight">
                    {getBannerLabel(props.eventProps, server, "date")}
                </Text>
                <BannerItems
                    banner={props.eventProps}
                    showCountdown={isCurrent || isFuture}
                    game={game}
                />
            </Stack>
        </BannerDataContext>
    );
}
