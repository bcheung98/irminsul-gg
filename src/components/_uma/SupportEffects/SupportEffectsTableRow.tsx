// Component imports
import * as Table from "@/components/Table";
import Text from "@/components/Text";
import Tooltip from "@/components/Tooltip";

// Helper imports
import { supportEffects } from "@/data/uma/supportEffects";
import { formatSupportEffectValue } from "./SupportEffects.utils";

export default function SupportEffectsTableRow(props: {
    effect: string;
    value: string | number;
    index: number;
    showDetails?: boolean;
}) {
    const getEffect = (tag: string) =>
        supportEffects.find((effect) => effect.name === tag);

    const effect = getEffect(props.effect);
    if (!effect) return null;

    return (
        <Table.Cell
            label={{
                title:
                    props.value === -1 ? (
                        "-"
                    ) : props.index ? (
                        formatSupportEffectValue(props.effect, props.value)
                    ) : (
                        <Tooltip
                            title={effect.description}
                            arrow
                            placement="top"
                        >
                            <Text
                                variant="body2"
                                weight="highlight"
                                sx={{
                                    cursor: "default",
                                    textDecoration: {
                                        xs: "none",
                                        md: "underline dotted",
                                    },
                                }}
                            >
                                {effect.displayName}
                            </Text>
                        </Tooltip>
                    ),
            }}
        />
    );
}
