import parse from "html-react-parser";

// Component imports
import EquipmentSetEffect from "@/components/EquipmentSetEffect";
import { default as Tabs } from "@/components/Tabs";
import SkillCard from "@/components/SkillCard";
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
import { objectKeys } from "@/utils";
import { equipmentPieceType, equipmentTags } from "@/data/equipment";

// Type imports
import type {
    EquipmentInfo,
    EquipmentTabImageProps,
    EquipmentTabProps,
    EquipmentTabsListProps,
} from "./EquipmentInfo.types";

export function EquipmentTabsList({
    pieces,
    tabValue,
    handleTabChange,
}: EquipmentTabsListProps) {
    const game = useGameTag();

    return (
        <Tabs.List value={tabValue} onChange={handleTabChange}>
            {pieces.map((piece, index) => (
                <Tabs.Selector
                    key={piece.type}
                    icon={
                        <SkillIcon
                            icon={`${game}/icons/${equipmentTags[game]}/${piece.type}`}
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

export function EquipmentTabSolo({ equipment }: EquipmentInfo) {
    const game = useGameTag();

    const imageUrl = `${game}/${equipmentTags[game]}/${equipment.id}_icon`;

    return (
        <Stack spacing={2} divider={<Divider />} sx={{ p: "16px 24px" }}>
            <Grid container spacing={3}>
                <Grid size="auto">
                    <EquipmentTabImage
                        imageUrl={imageUrl}
                        equipment={equipment}
                        padding="4px"
                    />
                </Grid>
                <SkillCard size={{ sm: "grow", lg: 6 }}>
                    <EquipmentSetEffect
                        equipment={equipment}
                        textVariant="subtitle1"
                    />
                </SkillCard>
            </Grid>
            <Text variant="body2">{parse(equipment.description ?? "")}</Text>
        </Stack>
    );
}

export function EquipmentTabMulti({
    equipment,
    piece,
    tabValue,
    index,
}: EquipmentTabProps) {
    const theme = useTheme();

    const game = useGameTag();

    const imageUrl = `${game}/${equipmentTags[game]}/${equipment.id}_${
        objectKeys(equipmentPieceType[game]).findIndex(
            (p) => p === piece.type,
        ) + 1
    }`;

    const title = (
        <Stack spacing={1}>
            <Text weight="highlight" sx={{ color: theme.text.header }}>
                {equipmentPieceType[game][piece.type]}
            </Text>
            <Text variant="h6" weight="highlight">
                {piece.name}
            </Text>
        </Stack>
    );

    return (
        <Tabs.Panel
            index={index}
            value={tabValue}
            padding={"8px 24px 16px"}
            timeout={0}
        >
            <Stack spacing={2} divider={<Divider />}>
                <Grid container spacing={2}>
                    <Grid
                        size={12}
                        sx={{ display: { xs: "none", sm: "block" } }}
                    >
                        {title}
                    </Grid>
                    <Grid size="auto">
                        <EquipmentTabImage
                            imageUrl={imageUrl}
                            equipment={equipment}
                        />
                    </Grid>
                    <Grid
                        size={12}
                        sx={{ display: { xs: "block", sm: "none" } }}
                    >
                        {title}
                    </Grid>
                    <SkillCard size={{ xs: 12, sm: "grow", lg: 6 }}>
                        <EquipmentSetEffect
                            equipment={equipment}
                            textVariant="subtitle1"
                        />
                    </SkillCard>
                </Grid>
                <Text variant="body2">{parse(piece.description ?? "")}</Text>
            </Stack>
        </Tabs.Panel>
    );
}

function EquipmentTabImage({
    equipment,
    imageUrl,
    padding,
}: EquipmentTabImageProps) {
    return (
        <Image
            src={imageUrl}
            size={128}
            style={{
                borderRadius: "16px",
                backgroundImage: `url(https://assets.irminsul.gg/v2/_common/rarity-background/${equipment.rarity}.png)`,
                backgroundSize: "contain",
                padding: padding,
            }}
            responsive
            responsiveSize={0.25}
            fadeOnLoad
        />
    );
}
