// Component imports
import Text from "@/components/Text";
import EquipmentSetEffect from "@/components/EquipmentSetEffect";
import { EndfieldGearInfoCard } from "@/components/InfoCard";

// MUI imports
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";

// Helper imports
import { sortBy } from "@/utils";

// Type imports
import { EndfieldGear, EndfieldGearSet } from "@/types/endfield/gear";
import { Equipment } from "@/types/equipment";

export default function GearListRow({
    gear,
    set,
}: {
    gear: EndfieldGear[];
    set: EndfieldGearSet;
}) {
    const setPieces = gear
        .filter((item) => item.set === set?.id)
        .sort(
            (a, b) =>
                sortBy(a.rarity, b.rarity) ||
                sortBy(b.type, a.type) ||
                a.displayName.localeCompare(b.displayName),
        );

    if (!setPieces.length) return null;

    const equipment: Equipment = {
        ...setPieces[0],
        setEffect: {
            "3": set?.setEffect[3],
        },
    };

    return (
        <Card
            sx={(theme) => ({
                p: 2,
                borderRadius: theme.contentBox.border.radius,
            })}
        >
            <Stack spacing={2} divider={<Divider />}>
                <Stack spacing={1}>
                    <Text variant="h6" weight="highlight">
                        {`${set?.displayName ?? "Non-set"}`}
                    </Text>
                    {set?.id < 1000 && (
                        <EquipmentSetEffect
                            equipment={equipment}
                            textVariant="subtitle1"
                        />
                    )}
                </Stack>
                <Grid container spacing={2}>
                    {setPieces.map((item) => (
                        <EndfieldGearInfoCard
                            key={item.id}
                            gear={item}
                            props={{ size: 100 }}
                        />
                    ))}
                </Grid>
            </Stack>
        </Card>
    );
}
