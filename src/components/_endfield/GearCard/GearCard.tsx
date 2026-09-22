import { memo } from "react";

// Component imports
import ContentBox from "@/components/ContentBox";
import FlexBox from "@/components/FlexBox";
import Image from "@/components/Image";
import NavLink from "@/components/NavLink";
import Text from "@/components/Text";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import ButtonBase from "@mui/material/ButtonBase";

// Helper imports
import { formatHref } from "@/utils";
import { useRarityColors } from "@/helpers/rarityColors";
import { gearStats } from "@/data/endfield/gearStats";
import { useFilterStore } from "@/stores";

// Type imports
import { EndfieldGear } from "@/types/endfield";
import { EndfieldGearAttributes } from "@/types/endfield/gear";

export default memo(function GearCard({ gear }: { gear: EndfieldGear }) {
    const theme = useTheme();

    const imgSize = 72;
    const imgURL = `endfield/gear/${gear.stringId}`;

    const href = `/endfield/gear/${formatHref(gear.url)}`;

    const attributes = useFilterStore(
        (state) => state["endfield/gear"].attributes,
    );

    const backgroundColor = useRarityColors()["endfield"](gear.rarity);

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
                                    border: `1px solid ${backgroundColor}`,
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
                        <Stack spacing={0.5} sx={{ py: 1 }}>
                            {gear.stats.map((row, index) => (
                                <StatRow
                                    key={`${gear.stringId}-${index}`}
                                    {...row}
                                    selected={attributes.includes(row.stat)}
                                />
                            ))}
                        </Stack>
                    </Grid>
                </Grid>
            </ContentBox>
        </Grid>
    );
});

interface StatRowProps extends EndfieldGearAttributes {
    selected: boolean;
}

function StatRow({ stat, values, selected }: StatRowProps) {
    const theme = useTheme();

    const textStyles = {
        color: selected ? theme.text.header : theme.text.primary,
    };

    const { title, icon } = gearStats[stat];

    return (
        <FlexBox sx={{ justifyContent: "space-between", pr: 1.5 }}>
            <FlexBox spacing={1} sx={{ justifyContent: "space-between" }}>
                <Image src={`endfield/icons/stat-icons/${icon}`} size={24} />
                <Text variant="subtitle2" weight="highlight" sx={textStyles}>
                    {title}
                </Text>
            </FlexBox>
            <Text variant="subtitle2" weight="highlight" sx={textStyles}>
                {values[0] != null ? `+${values[0]}` : "???"}
            </Text>
        </FlexBox>
    );
}
