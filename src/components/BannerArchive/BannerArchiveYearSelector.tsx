// Component imports
import Text from "@/components/Text";
import ToggleButtons from "@/components/ToggleButtons";

// MUI imports
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";

// Type imports
import { BannerArchiveYearSelectorProps } from "./BannerArchive.types";

export default function BannerArchiveYearSelector({
    years,
    selectedYears,
    setYears,
}: BannerArchiveYearSelectorProps) {
    const buttons = years.map((year) => ({
        value: year,
        label: year,
    }));

    return (
        <Card
            sx={(theme) => ({
                px: 1.5,
                py: 1,
                borderRadius: theme.contentBox.border.radius,
                backgroundColor: theme.background(0),
                overflowX: "auto",
                scrollbarWidth: "thin",
            })}
        >
            <Stack spacing={1}>
                <Text variant="subtitle1" weight="highlight">
                    Filter by Year
                </Text>
                <ToggleButtons
                    buttons={buttons}
                    value={selectedYears}
                    onChange={(
                        _: React.BaseSyntheticEvent,
                        newValue: number[],
                    ) => {
                        if (newValue !== null) {
                            setYears(newValue);
                        }
                    }}
                    spacing={4}
                    padding="6px 16px"
                    highlightOnHover={false}
                    noWrap
                />
            </Stack>
        </Card>
    );
}
