import { adjustColor } from "@/utils/colors";
import { UmaCharacterProfile } from "@/types/uma/character";

/**
 * Add IDs of Umas that use their secondary color
 * as their main color on the stat bar (in-game)
 */
const SECONDARY_COLOR_UMAS = new Set([
    1005, 1016, 1023, 1025, 1037, 1043, 1068,
]);

const HEADER_ADJUSTMENT = 0.25;
const BORDER_ADJUSTMENT = -0.1;

interface ColorOverrides {
    header?: number;
    border?: number;
}

export function getUmaAccentColor(
    profile?: UmaCharacterProfile,
    defaultColor = "rgb(120, 216, 35)",
) {
    if (!profile) return defaultColor;
    return profile.colors[Number(SECONDARY_COLOR_UMAS.has(profile.id))];
}

export function getUmaStatColors({
    profile,
    overrides,
}: {
    profile?: UmaCharacterProfile;
    overrides?: ColorOverrides;
}) {
    const accent = getUmaAccentColor(profile);
    const headerColor =
        adjustColor(accent, overrides?.header ?? HEADER_ADJUSTMENT) ?? accent;
    const borderColor =
        adjustColor(accent, overrides?.border ?? BORDER_ADJUSTMENT) ?? accent;

    return { headerColor, borderColor };
}
