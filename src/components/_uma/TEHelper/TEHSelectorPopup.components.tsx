import { memo } from "react";

// Component imports
import FlexBox from "@/components/FlexBox";
import TextLabel from "@/components/TextLabel";
import Text from "@/components/Text";

// MUI imports
import { useTheme } from "@mui/material/styles";
import ButtonBase from "@mui/material/ButtonBase";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

// Helper imports
import { toTitleCase } from "@/utils";
import { searchResultStyle, TEHInvalidTag } from "./TEHelper.utils";
import { rarityMap } from "@/data/uma/common";

// Type imports
import type { UmaCharacter, UmaSupport } from "@/types/uma";
import type { TEHItemCategory } from "@/types/uma/te-helper";

interface DeleteOptionProps {
    category: TEHItemCategory;
    onDelete: () => void;
}

export function DeleteOption({ category, onDelete }: DeleteOptionProps) {
    const theme = useTheme();

    return (
        <ButtonBase
            onClick={onDelete}
            sx={{
                display: "inline",
                "&:hover": {
                    cursor: "pointer",
                },
            }}
        >
            <FlexBox sx={searchResultStyle()} spacing={2}>
                <HighlightOffIcon
                    sx={{
                        width: "48px",
                        height: "48px",
                        p: "8px",
                        color: theme.text.primary,
                    }}
                />
                <Text weight="highlight">
                    {`Remove ${toTitleCase(`${category}`)}`}
                </Text>
            </FlexBox>
        </ButtonBase>
    );
}

interface SearchResultProps {
    item: UmaCharacter | UmaSupport;
    invalid: boolean;
    message: string;
    color: string;
    onSelect: (item: UmaCharacter | UmaSupport) => void;
}

export const SearchResult = memo(function SearchResult({
    item,
    invalid,
    message,
    color,
    onSelect,
}: SearchResultProps) {
    const isCharacter = "aptitude" in item;

    let title: string;

    if (isCharacter) {
        title = `${item.name} (${item.outfit || "Original"})`;
    } else {
        title = `${item.name} (${rarityMap[item.rarity]} ${item.specialty})`;
    }

    return (
        <ButtonBase
            onClick={!invalid ? () => onSelect(item) : undefined}
            disableRipple={invalid}
            sx={{
                display: "inline",
                "&:hover": {
                    cursor: invalid ? "not-allowed" : "pointer",
                },
            }}
        >
            <FlexBox sx={searchResultStyle(invalid)}>
                <TextLabel
                    icon={
                        isCharacter
                            ? `uma/characters/${item.id}`
                            : `uma/supports/${item.id}_icon`
                    }
                    iconProps={{ size: 48 }}
                    title={title}
                    spacing={2}
                />
            </FlexBox>
            <TEHInvalidTag invalid={invalid} message={message} color={color} />
        </ButtonBase>
    );
});
