import { forwardRef } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Component imports
import PlannerCardHeader from "@/components/PlannerCardRoot/PlannerCardHeader";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";

// Type imports
import { PlannerCardHeaderProps } from "../PlannerCardRoot/PlannerCardRoot.types";

type PlannerSorterItemProps = PlannerCardHeaderProps &
    React.HTMLAttributes<HTMLDivElement>;

type ItemProps = {
    isOpacityEnabled?: boolean;
    isDragging?: boolean;
} & PlannerSorterItemProps;

const Item = forwardRef<HTMLDivElement, ItemProps>(
    ({ item, isOpacityEnabled, isDragging, style, ...props }, ref) => {
        const theme = useTheme();

        const styles = {
            cursor: isDragging ? "grabbing" : "grab",
            backgroundColor: theme.background(0, isDragging ? "dark" : "main"),
            borderRadius: "4px",
            touchAction: "manipulation",
            ...style,
        };

        return (
            <div ref={ref} style={styles} {...props}>
                <Box
                    sx={{
                        p: 1,
                        borderRadius: "4px",
                        "&:hover": {
                            backgroundColor: theme.background(
                                0,
                                isDragging ? "dark" : "light"
                            ),
                        },
                    }}
                >
                    <PlannerCardHeader
                        item={item}
                        type={"element" in item ? "characters" : "weapons"}
                    />
                </Box>
            </div>
        );
    }
);

export default function PlannerSorterItem({
    item,
    ...props
}: PlannerSorterItemProps) {
    const {
        attributes,
        isDragging,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({
        id: item.id,
    });

    const styles = {
        transform: CSS.Transform.toString(transform),
        transition: transition || undefined,
        touchAction: "manipulation",
    };

    return (
        <Item
            item={item}
            ref={setNodeRef}
            style={styles}
            isDragging={isDragging}
            {...props}
            {...attributes}
            {...listeners}
        />
    );
}
