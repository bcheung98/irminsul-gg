import { useState } from "react";

// Component imports
import EquipmentSetEffect from "@/components/EquipmentSetEffect";
import ContentBox from "@/components/ContentBox";
import { default as Tabs } from "@/components/Tabs";
import SkillIcon from "@/components/SkillIcon";
import Text from "@/components/Text";
import Image from "@/components/Image";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";

// Helper imports
import { useGameTag } from "@/context";
import { splitJoin } from "@/utils";
import { equipmentPieceType, equipmentTags } from "@/data/equipment";

// Type imports
import { Equipment } from "@/types/equipment";

export default function EquipmentInfo({ equipment }: { equipment: Equipment }) {
    const theme = useTheme();

    const { name, displayName, rarity, pieces } = equipment;

    const game = useGameTag();

    const [tabValue, setTabValue] = useState(0);
    const handleTabChange = (_: React.BaseSyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    function EquipmentTabsList() {
        return (
            <Tabs.List value={tabValue} onChange={handleTabChange}>
                {pieces.map((piece, index) => (
                    <Tabs.Selector
                        key={piece.type}
                        icon={
                            <SkillIcon
                                icon={`${game}/${equipmentTags[game]}/icons/${piece.type}`}
                                selected={index === tabValue}
                                borderRadius="8px"
                                size={40}
                            />
                        }
                    />
                ))}
            </Tabs.List>
        );
    }

    return (
        <ContentBox
            header={<Text variant="h5">{displayName}</Text>}
            headerProps={{ dense: false, padding: "12px 16px" }}
            contentProps={{ padding: 0 }}
        >
            <EquipmentTabsList />
            {pieces.map((piece, index) => (
                <Tabs.Panel
                    key={piece.type}
                    index={index}
                    value={tabValue}
                    padding={"8px 24px 16px"}
                    timeout={0}
                >
                    <Stack spacing={2} divider={<Divider />}>
                        <Stack spacing={2}>
                            <Stack spacing={1}>
                                <Text sx={{ color: theme.text.header }}>
                                    {equipmentPieceType[game][piece.type]}
                                </Text>
                                <Text variant="h6">{piece.name}</Text>
                            </Stack>
                            <Grid container spacing={3}>
                                <Grid size="auto">
                                    <Image
                                        src={`${game}/${
                                            equipmentTags[game]
                                        }/sets/${splitJoin(name)}/${
                                            piece.type
                                        }`}
                                        size={128}
                                        style={{
                                            borderRadius: "16px",
                                            backgroundImage: `url(https://assets.irminsul.gg/wuwa/backgrounds/Background_${rarity}_Star.png)`,
                                            backgroundSize: "contain",
                                        }}
                                    />
                                </Grid>
                                <Grid size={{ sm: "grow", lg: 6 }}>
                                    <EquipmentSetEffect
                                        equipment={equipment}
                                        textVariant="body1"
                                    />
                                </Grid>
                            </Grid>
                        </Stack>
                        <Text variant="body2">{piece.description}</Text>
                    </Stack>
                </Tabs.Panel>
            ))}
        </ContentBox>
    );
}
