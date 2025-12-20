// Component imports
import FlexBox from "@/components/FlexBox";
import Text from "@/components/Text";
import Tooltip from "@/components/Tooltip";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import LockIcon from "@mui/icons-material/Lock";

// Helper imports
import { supportEffects } from "@/data/uma/supportEffects";

// Type imports
import { SupportEffect } from "@/types/uma/support";

export default function SupportEffectRow(props: {
    effect: SupportEffect;
    levels: number[];
    sliderValue: number;
    showDetails?: boolean;
}) {
    const { levels, sliderValue, showDetails = false } = props;

    const theme = useTheme();

    const getEffect = (tag: string | number) =>
        supportEffects.find(
            (effect) => effect.id === tag || effect.name === tag
        );

    const getEffectValue = (effect: SupportEffect) => {
        const value = effect.values[sliderValue];
        let valueText = value.toString();
        if (
            [
                "Friendship Bonus",
                "Mood Effect",
                "Training Effectiveness",
                "Race Bonus",
                "Fan Bonus",
                "Hint Frequency",
                "Event Recovery",
                "Event Effectiveness",
                "Failure Protection",
                "Energy Cost Reduction",
                "All Stats Bonus",
            ].includes(effect.effect)
        ) {
            valueText += "%";
        }
        if (effect.effect === "Hint Levels") {
            valueText = `Lvl ${value}`;
        }
        return value === -1 ? (
            <FlexBox spacing={1}>
                <LockIcon
                    sx={{
                        color: theme.text.primary,
                        fontSize: { xs: "20px", sm: "24px" },
                    }}
                />
                <Text
                    variant="body2"
                    weight="highlight"
                >{`Lvl ${effect.unlock}`}</Text>
            </FlexBox>
        ) : (
            <Text variant="body2" weight="highlight">
                {valueText}
            </Text>
        );
    };

    const cardStyles = (effect: SupportEffect) => {
        return {
            p: 1,
            backgroundColor:
                levels[sliderValue] < effect.unlock
                    ? theme.background(1, "light")
                    : theme.background(0),
            borderRadius: "4px",
        };
    };

    const effect = getEffect(props.effect.effect);
    if (!effect) return null;

    return (
        <Stack spacing={1} sx={cardStyles(props.effect)}>
            <FlexBox spacing={1} wrap sx={{ justifyContent: "space-between" }}>
                <FlexBox spacing={1}>
                    <AutoAwesomeIcon
                        sx={{
                            color: theme.text.uma.star,
                            fontSize: { xs: "20px", sm: "24px" },
                        }}
                    />
                    <Tooltip title={effect.description} arrow placement="top">
                        <Text
                            variant="body2"
                            weight="highlight"
                            sx={{
                                cursor: "default",
                                textDecoration: showDetails
                                    ? "none"
                                    : "underline dotted",
                            }}
                        >
                            {effect.displayName}
                        </Text>
                    </Tooltip>
                </FlexBox>
                {getEffectValue(props.effect)}
            </FlexBox>
            {showDetails && <Text variant="body2">{effect.description}</Text>}
        </Stack>
    );
}
