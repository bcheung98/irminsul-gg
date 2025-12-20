// Component imports
import SelectInput from "@/components/SelectInput";
import MenuItem from "@/components/MenuItem";
import Text from "@/components/Text";

// MUI imports
import Select from "@mui/material/Select";

// Type imports
import type { CharacterBuffs } from "@/types/character";

export default function CharacterBuffs({
    versions,
    value,
    onChange,
}: CharacterBuffs) {
    return versions && versions?.length > 1 ? (
        <Select value={value} onChange={onChange} input={<SelectInput />}>
            {versions.map((version) => (
                <MenuItem key={version.value} value={version.value}>
                    <Text variant="subtitle1">{version.label}</Text>
                </MenuItem>
            ))}
        </Select>
    ) : null;
}
