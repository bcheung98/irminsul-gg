// Component imports
import Text from "@/components/Text";
import ToggleButtons from "@/components/ToggleButtons";

// MUI imports
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

// Type imports
import { BannerArchiveYearSelectorProps } from "./BannerArchive.types";

export default function BannerArchiveYearSelector({
    years,
    selectedYears,
    setYears,
}: BannerArchiveYearSelectorProps) {
    return (
        <Card
            sx={(theme) => ({
                px: 1.5,
                py: 1,
                borderRadius: theme.contentBox.border.radius,
                backgroundColor: theme.background(0),
            })}
        >
            <Stack spacing={1}>
                <Text variant="subtitle1" weight="highlight">
                    Filter by Year
                </Text>
                <Box sx={{ pb: 1, overflowX: "auto", scrollbarWidth: "thin" }}>
                    <ToggleButtons
                        buttons={years.map((year) => ({
                            value: year,
                            label: year,
                        }))}
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
                        padding="4px 8px"
                        noWrap
                    />
                </Box>
            </Stack>
        </Card>
    );
}
