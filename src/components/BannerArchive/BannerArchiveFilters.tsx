// Component imports
import BannerArchiveSelector from "./BannerArchiveSelector";
import FlexBox from "@/components/FlexBox";
import Text from "@/components/Text";
import Tooltip from "@/components/Tooltip";
import Switch from "@/components/Switch";
import Checkbox from "@/components/Checkbox";

// MUI imports
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";

// Helper imports
import { useGameTag } from "@/context";
import { bannerLabels } from "@/data/banners";

// Type imports
import { BannerArchiveFilterProps } from "./BannerArchive.types";

export default function BannerArchiveFilters({
    options,
    values,
    setValues,
    matchAll,
    handleMatchAllChange,
    filterCharacter,
    handleCharacterChange,
    filterWeapon,
    handleWeaponChange,
}: BannerArchiveFilterProps) {
    const game = useGameTag();

    const characterLabel = bannerLabels[game].find(
        (item) => item.value === "character",
    )?.label;
    const weaponLabel = bannerLabels[game].find(
        (item) => item.value === "weapon",
    )?.label;

    return (
        <Card
            sx={(theme) => ({
                px: 1.5,
                py: 1,
                borderRadius: theme.contentBox.border.radius,
                backgroundColor: theme.background(0),
            })}
        >
            <Stack>
                <Text variant="subtitle1" weight="highlight">
                    {`Filter by ${characterLabel}/${weaponLabel}`}
                </Text>
                <Stack spacing={2}>
                    <Stack spacing={1}>
                        <FlexBox spacing={1}>
                            <Switch
                                checked={matchAll}
                                onChange={handleMatchAllChange}
                                size="small"
                                sx={{ mt: 0.5 }}
                            />
                            <Tooltip
                                title="If toggled, will filter banners that only contain all selected items."
                                placement="top"
                            >
                                <Text
                                    variant="body2"
                                    weight="highlight"
                                    sx={{
                                        mt: 0.5,
                                        cursor: "help",
                                        textDecoration: "dotted underline",
                                    }}
                                >
                                    Match All
                                </Text>
                            </Tooltip>
                        </FlexBox>
                        <FlexBox spacing={1}>
                            <Text variant="body2" weight="highlight">
                                Limit Search:
                            </Text>
                            <FlexBox spacing={2}>
                                <FlexBox spacing={1}>
                                    <Text variant="body2">
                                        {`${characterLabel}s`}
                                    </Text>
                                    <Checkbox
                                        checked={filterCharacter}
                                        onChange={handleCharacterChange}
                                    />
                                </FlexBox>
                                <FlexBox spacing={1}>
                                    <Text variant="body2">
                                        {`${weaponLabel}s`}
                                    </Text>
                                    <Checkbox
                                        checked={filterWeapon}
                                        onChange={handleWeaponChange}
                                    />
                                </FlexBox>
                            </FlexBox>
                        </FlexBox>
                    </Stack>
                    <BannerArchiveSelector
                        options={options}
                        values={values}
                        setValues={setValues}
                    />
                </Stack>
            </Stack>
        </Card>
    );
}
