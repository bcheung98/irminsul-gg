// Component imports
import BannerItems from "@/components/BannerItems";
import Text from "@/components/Text";

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
    const isFuture = isFutureBanner(props.eventProps, server, game);

    let title = getBannerLabel(props.eventProps, server, "date");
    if (props.eventProps.isFuture !== undefined && props.eventProps.isFuture) {
        title += " (Tentative)";
    }

    return (
        <BannerDataContext value={{ characters, weapons, server }}>
            <Stack spacing={1}>
                <Text weight="highlight">{title}</Text>
                <BannerItems
                    banner={props.eventProps}
                    showCountdown={isCurrent || isFuture}
                    game={game}
                />
            </Stack>
        </BannerDataContext>
    );
}
