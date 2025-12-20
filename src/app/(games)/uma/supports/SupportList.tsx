// Component imports
import Text from "@/components/Text";
import SortTable from "@/components/SortTable";

// Helper imports
import DateObject from "@/helpers/dates";
import { formatHref } from "@/utils";
import { useGameTag } from "@/context";
import { useStore, useServerStore } from "@/stores";
import { rarityMap } from "@/data/uma/common";

// Type imports
import { UmaSupport } from "@/types/uma/support";
import { SortTableRow } from "@/components/SortTable/SortTable.types";

export default function SupportList({
    supports,
    loading,
}: {
    supports: UmaSupport[];
    loading?: boolean;
}) {
    const game = useGameTag();
    const server = useStore(useServerStore, (state) => state[game]);

    const columns = {
        name: "Name",
        rarity: "Rarity",
        specialty: "Specialty",
        release: "Release Date",
    };

    function createRow(support: UmaSupport): SortTableRow {
        return {
            name: {
                label: {
                    title: support.name,
                    titleProps: { variant: "body1" },
                    subtitle: (
                        <Text variant="body2" weight="highlight">
                            <i>[{support.title || "???"}]</i>
                        </Text>
                    ),
                    icon: `uma/supports/${support.id}_icon`,
                    iconProps: {
                        size: 48,
                    },
                    href: `supports/${formatHref(support.url)}`,
                    textSpacing: 0.5,
                },
            },
            rarity: {
                label: {
                    icon: `uma/rarity/${rarityMap[support.rarity]}`,
                    iconProps: { size: 28 },
                },
            },
            specialty: {
                label: {
                    title: support.specialty,
                    titleProps: { variant: "subtitle1" },
                    icon: `uma/icons/specialties/${support.specialty}`,
                    iconProps: {
                        size: 28,
                    },
                    href: `supports/${formatHref(support.url)}`,
                    textSpacing: 0.5,
                },
            },
            release: {
                label: {
                    title: `Global: ${
                        support.release.global
                            ? new DateObject(support.release.global, server)
                                  .string
                            : "---"
                    }`,
                    subtitle: (
                        <Text variant="body2">
                            {`Japan: ${
                                new DateObject(support.release.jp, server)
                                    .string
                            }`}
                        </Text>
                    ),
                },
            },
        };
    }

    return (
        <SortTable
            columns={columns}
            items={supports}
            createRow={createRow}
            title="Support Card"
            defaultSortBy="release"
            loading={loading}
        />
    );
}
