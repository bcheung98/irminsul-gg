import { useShallow } from "zustand/react/shallow";

// Component imports
import ContentBox from "@/components/ContentBox";
import Image from "@/components/Image";
import NavLink from "@/components/NavLink";
import Text from "@/components/Text";
import * as Table from "@/components/Table";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import ButtonBase from "@mui/material/ButtonBase";

// Helper imports
import { formatHref } from "@/utils";
import { useRarityColors } from "@/helpers/rarityColors";
import { gearStats } from "@/data/endfield/gearStats";
import { useFilterStore } from "@/stores";

// Type imports
import { EndfieldGear } from "@/types/endfield";
import { EndfieldGearAttributes } from "@/types/endfield/gear";
import { TitleProps } from "@/components/TextLabel/TextLabel.types";

export default function GearCard({ gear }: { gear: EndfieldGear }) {
    const theme = useTheme();

    const imgSize = 72;
    const imgURL = `endfield/gear/${gear.stringId}`;

    const href = `/endfield/gear/${formatHref(gear.url)}`;

    return (
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <ContentBox
                header={
                    <Text
                        weight="highlight"
                        sx={{
                            "&:hover": {
                                color: theme.text.selected,
                                textDecoration: "underline",
                                cursor: "pointer",
                            },
                        }}
                    >
                        <NavLink href={href}>{gear.displayName}</NavLink>
                    </Text>
                }
                headerProps={{ padding: "0px 16px" }}
                contentProps={{ padding: 0 }}
            >
                <Grid container sx={{ minHeight: "136px" }}>
                    <Grid sx={{ p: 1.5 }}>
                        <ButtonBase href={href} LinkComponent={NavLink}>
                            <Image
                                src={imgURL}
                                id={`${gear.stringId}-card`}
                                size={imgSize}
                                responsive
                                responsiveSize={0.25}
                                style={{
                                    border: `1px solid ${useRarityColors()["endfield"](gear.rarity)}`,
                                    borderRadius:
                                        theme.contentBox.border.radius * 4,
                                    backgroundColor: theme.background(2),
                                    backgroundImage:
                                        theme.materialCard.backgroundImage(
                                            gear.rarity,
                                        ),
                                    backgroundSize: "contain",
                                    backgroundRepeat: "repeat",
                                }}
                            />
                        </ButtonBase>
                    </Grid>
                    <Grid size="grow">
                        <Table.Container sx={{ px: 0.25, py: 1 }}>
                            <Table.Root size="small">
                                <Table.Body>
                                    {gear.stats.map((row, index) => (
                                        <StatRow
                                            key={`${gear.stringId}-${index}`}
                                            {...row}
                                        />
                                    ))}
                                </Table.Body>
                            </Table.Root>
                        </Table.Container>
                    </Grid>
                </Grid>
            </ContentBox>
        </Grid>
    );
}

function StatRow({ stat, values }: EndfieldGearAttributes) {
    const theme = useTheme();

    const filters = useFilterStore(
        useShallow((state) => state["endfield/gear"]),
    );

    const cellProps = {
        borderColor: "transparent",
        padding: "2px 16px 2px 0px",
    };

    const titleProps: TitleProps = (function () {
        let color = theme.text.primary;
        const variant = "subtitle2";
        if (filters.attributes.includes(stat)) {
            color = theme.text.header;
        }
        return { color, variant };
    })();

    const { title, icon } = gearStats[stat];

    return (
        <Table.Row color="secondary">
            <Table.Cell
                align="left"
                label={{
                    title: `${title}|endfield/icons/stat-icons/${icon}`,
                    titleProps,
                }}
                {...cellProps}
            />
            <Table.Cell
                align="right"
                label={{
                    title: `+${values[0]}` || "???",
                    titleProps,
                }}
                {...cellProps}
            />
        </Table.Row>
    );
}
