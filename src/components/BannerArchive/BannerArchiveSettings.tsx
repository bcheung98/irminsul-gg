// Component imports
import BannerArchiveHeader from "./BannerArchiveHeader";
import BannerArchiveFilters from "./BannerArchiveFilters";
import BannerArchiveYearSelector from "./BannerArchiveYearSelector";

// MUI imports
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Collapse from "@mui/material/Collapse";

// Type imports
import { BannerArchiveSettingsProps } from "./BannerArchive.types";

export default function BannerArchiveSettings({
    matchAll,
    handleMatchAllChange,
    filterCharacter,
    handleCharacterChange,
    filterWeapon,
    handleWeaponChange,
    options,
    values,
    setValues,
    years,
    selectedYears,
    setYears,
    bannerType,
    sortDirection,
    handleViewChange,
    handleDirectionChange,
    dropdownOpen,
    toggleDropdown,
}: BannerArchiveSettingsProps) {
    return (
        <Card
            sx={(theme) => ({
                p: 2,
                borderRadius: theme.contentBox.border.radius,
            })}
        >
            <Stack spacing={1}>
                <BannerArchiveHeader
                    bannerType={bannerType}
                    sortDirection={sortDirection}
                    handleViewChange={handleViewChange}
                    handleDirectionChange={handleDirectionChange}
                    dropdownOpen={dropdownOpen}
                    toggleDropdown={toggleDropdown}
                />
                <Collapse in={dropdownOpen} timeout="auto">
                    <Grid container spacing={2} sx={{ pt: 1 }}>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <BannerArchiveFilters
                                options={options}
                                values={values}
                                setValues={setValues}
                                matchAll={matchAll}
                                handleMatchAllChange={handleMatchAllChange}
                                filterCharacter={filterCharacter}
                                handleCharacterChange={handleCharacterChange}
                                filterWeapon={filterWeapon}
                                handleWeaponChange={handleWeaponChange}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <BannerArchiveYearSelector
                                years={years}
                                selectedYears={selectedYears}
                                setYears={setYears}
                            />
                        </Grid>
                    </Grid>
                </Collapse>
            </Stack>
        </Card>
    );
}
