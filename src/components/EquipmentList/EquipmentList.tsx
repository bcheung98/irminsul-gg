// Component imports
import TextLabel from "@/components/TextLabel";
import EquipmentSetEffect from "@/components/EquipmentSetEffect";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Helper imports
import { formatHref } from "@/utils";
import { useGameTag } from "@/context";
import { equipmentTags } from "@/data/equipment";

// Type imports
import { Equipment } from "@/types/equipment";
import { Game, GameData } from "@/types";

export default function EquipmentList({
    equipment,
}: {
    equipment: Equipment[];
    loading?: boolean;
}) {
    const theme = useTheme();

    const game = useGameTag();

    return (
        <Card>
            {equipment.map((item, index) => (
                <Grid
                    container
                    key={item.id}
                    spacing={{ xs: 1, md: 4 }}
                    sx={{
                        p: "8px 16px",
                        flexWrap: "wrap",
                        alignItems: "center",
                        backgroundColor:
                            index % 2 === 0
                                ? theme.background(1)
                                : theme.background(0, "dark"),
                    }}
                >
                    <Grid size={{ xs: 12, md: 3 }}>
                        <TextLabel
                            icon={textLabelIcon(game, item)}
                            iconProps={{ size: game === "zzz" ? 48 : 72 }}
                            title={item.displayName}
                            href={`${equipmentTags[game]}/${formatHref(
                                item.url,
                            )}`}
                            spacing={2}
                        />
                    </Grid>
                    <Grid size="grow">
                        <EquipmentSetEffect equipment={item} />
                    </Grid>
                </Grid>
            ))}
        </Card>
    );
}

export function textLabelIcon(game: Game, equipment: Equipment) {
    const items: GameData<string> = {
        genshin: `genshin/artifacts/${equipment.id}${
            equipment.pieces && equipment.pieces.length > 1 ? "_1" : "_5"
        }`,
        hsr: `hsr/relics/${equipment.id}`,
        wuwa: "",
        zzz: `zzz/drive-discs/${equipment.id}`,
        uma: "",
        endfield: "",
    };
    return items[game];
}
