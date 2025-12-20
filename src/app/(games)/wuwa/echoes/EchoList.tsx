// Component imports
import SortTable from "@/components/SortTable";
import Image from "@/components/Image";
import FlexBox from "@/components/FlexBox";

// Helper imports
import { formatHref } from "@/utils";
import { echoClass } from "@/data/wuwa/common";
import { sonataEffects } from "@/data/wuwa/sonataEffects";

// Type imports
import { WuWaEcho } from "@/types/wuwa";
import { SortTableRow } from "@/components/SortTable/SortTable.types";

export default function EchoList({
    echoes,
    loading,
}: {
    echoes: WuWaEcho[];
    loading?: boolean;
}) {
    const columns = {
        name: "Name",
        code: "Code",
        rarity: "Class",
        cost: "Cost",
        sonata: "Sonata Effect",
        version: "Release",
    };

    function createRow(echo: WuWaEcho): SortTableRow {
        return {
            name: {
                label: {
                    title: echo.displayName,
                    titleProps: { variant: "body1" },
                    icon: `wuwa/echoes/${echo.id}`,
                    iconProps: {
                        size: 48,
                        borderRadius: "4px",
                    },
                    href: `echoes/${formatHref(echo.url)}`,
                },
            },
            code: {
                label: {
                    title: echo.code,
                },
            },
            rarity: {
                label: {
                    title: echoClass[echo.rarity],
                },
            },
            cost: {
                label: {
                    title: echo.cost,
                },
            },
            sonata: {
                label: {
                    icon: (
                        <FlexBox spacing={1}>
                            {echo.sonata.map((sonata) => (
                                <Image
                                    key={sonata}
                                    src={`wuwa/sonata/${sonata}`}
                                    size={32}
                                    tooltip={
                                        sonataEffects.find(
                                            (effect) => effect.id === sonata
                                        )?.displayName || ""
                                    }
                                />
                            ))}
                        </FlexBox>
                    ),
                },
            },
            version: {
                label: {
                    title: `${echo.release.version}`,
                },
            },
        };
    }

    return (
        <SortTable
            columns={columns}
            items={echoes}
            createRow={createRow}
            title="Echo"
            defaultSortBy="version"
            loading={loading}
        />
    );
}
