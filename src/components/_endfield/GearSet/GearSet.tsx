// Component imports
import EquipmentSetEffect from "@/components/EquipmentSetEffect";
import SkillCard from "@/components/SkillCard";
import Text from "@/components/Text";

// MUI imports
import Stack from "@mui/material/Stack";

// Helper imports
import { gearSets } from "@/data/endfield/gearSets";

// Type imports
import { EndfieldGear } from "@/types/endfield";
import { Equipment } from "@/types/equipment";

export default function GearSet({ gear }: { gear: EndfieldGear }) {
    const gearSet = gearSets.find((set) => set.id === gear.set);

    const equipment: Equipment = {
        ...gear,
        setEffect: {
            "3": gearSets.find((set) => set.id === gear.set)?.setEffect[3],
        },
    };

    if (!gearSet) return null;

    return (
        <Stack spacing={1}>
            <Text variant="h6" weight="highlight">
                Set Effect
            </Text>
            <SkillCard size={12}>
                <Stack spacing={1}>
                    <Text variant="h6" weight="highlight">
                        {gearSet.displayName}
                    </Text>
                    <EquipmentSetEffect
                        equipment={equipment}
                        textVariant="subtitle1"
                    />
                </Stack>
            </SkillCard>
        </Stack>
    );
}
