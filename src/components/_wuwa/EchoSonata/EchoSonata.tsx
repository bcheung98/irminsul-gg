// Component imports
import SkillCard from "@/components/SkillCard";
import TextLabel from "@/components/TextLabel";
import Text from "@/components/Text";
import EquipmentSetEffect from "@/components/EquipmentSetEffect";

// MUI imports
import Stack from "@mui/material/Stack";

// Helper imports
import { sonataEffects } from "@/data/wuwa/sonataEffects";
import { isUnreleasedContent } from "@/helpers/isUnreleasedContent";

// Type imports
import { Equipment } from "@/types/equipment";

export default function EchoSonata({ sonataIDs }: { sonataIDs: number[] }) {
    return (
        <Stack spacing={1}>
            <Text variant="h6" weight="highlight">
                Sonata Effect
            </Text>
            {sonataIDs.map((id) => {
                const sonata = sonataEffects
                    .filter((sonata) =>
                        isUnreleasedContent(sonata.release.version, "wuwa")
                    )
                    .find((effect) => effect.id === id);
                if (!sonata) return null;
                return (
                    <SkillCard key={id} size={12}>
                        <Stack spacing={1}>
                            <TextLabel
                                icon={`wuwa/sonata/${id}`}
                                iconProps={{ size: 40 }}
                                title={sonata.displayName}
                                titleProps={{ variant: "h6" }}
                                spacing={2}
                            />
                            <EquipmentSetEffect
                                equipment={sonata as Equipment}
                                textVariant="subtitle1"
                            />
                        </Stack>
                    </SkillCard>
                );
            })}
        </Stack>
    );
}
