// Component imports
import EquipmentSetEffect from "@/components/EquipmentSetEffect";
import FlexBox from "@/components/FlexBox";
import Image from "@/components/Image";
import Text from "@/components/Text";
import SkillCard from "@/components/SkillCard";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

// Helper imports
import { drives } from "@/data/nte/drives";

// Type imports
import { NTECartridge } from "@/types/nte";

export default function CartridgeCard({
    cartridge,
}: {
    cartridge: NTECartridge;
}) {
    const theme = useTheme();

    const { id, displayName, rarity, geometry } = cartridge;

    return (
        <SkillCard
            size={{ xs: 12, md: 6 }}
            backgroundColor={theme.background(1)}
        >
            <Stack spacing={2} divider={<Divider />}>
                <Text variant="h6" weight="highlight">
                    {displayName}
                </Text>
                <Grid container spacing={3}>
                    <Grid size="auto">
                        <Image
                            src={`nte/cartridges/${id}`}
                            size={128}
                            responsive
                            responsiveSize={0.25}
                            style={{
                                borderRadius: "16px",
                                backgroundImage: `url(https://assets.irminsul.gg/v2/_common/rarity-background/${rarity}.png)`,
                                backgroundSize: "contain",
                                padding: "4px",
                            }}
                        />
                    </Grid>
                    <SkillCard size={{ xs: 12, md: "grow" }}>
                        <EquipmentSetEffect
                            equipment={cartridge}
                            textVariant="body1"
                        />
                    </SkillCard>
                </Grid>
                <Stack spacing={2}>
                    <Text weight="highlight">Compatible Modules</Text>
                    <FlexBox spacing={2}>
                        {geometry &&
                            geometry.map((piece) => (
                                <Image
                                    key={piece}
                                    src={`nte/icons/drives/${piece}`}
                                    size={32}
                                    tooltip={
                                        drives.find(
                                            (drive) => drive.tag === piece,
                                        )?.displayName || ""
                                    }
                                />
                            ))}
                    </FlexBox>
                </Stack>
            </Stack>
        </SkillCard>
    );
}
