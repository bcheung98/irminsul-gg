import { useEffect, useState } from "react";
import {
    DndContext,
    closestCenter,
    useSensor,
    useSensors,
    DragEndEvent,
    TouchSensor,
    MouseSensor,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
    restrictToParentElement,
    restrictToVerticalAxis,
} from "@dnd-kit/modifiers";

// Component imports
import ContentDialog from "@/components/ContentDialog";
import TextLabel from "@/components/TextLabel";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import LowPriorityIcon from "@mui/icons-material/LowPriority";

// Helper imports
import { useGameTag } from "@/context";
import { usePlannerStore } from "@/stores";

// Type imports
import { Game } from "@/types";
import { PlannerItemData } from "@/types/planner";
import PlannerSorterItem from "./PlannerSorterItem";

export default function PlannerSorter() {
    const theme = useTheme();

    const game = useGameTag() as Exclude<Game, "uma">;

    const store = usePlannerStore();
    const items = store[`${game}/items`];

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [list, setList] = useState<PlannerItemData[]>([]);

    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!over) return;

        const activeItem = list.find((item) => item.id === active.id);
        const overItem = list.find((item) => item.id === over.id);

        if (!activeItem || !overItem) {
            return;
        }

        const activeIndex = list.findIndex((item) => item.id === active.id);
        const overIndex = list.findIndex((item) => item.id === over.id);

        if (activeIndex !== overIndex) {
            setList((prev) =>
                arrayMove<PlannerItemData>(prev, activeIndex, overIndex)
            );
        }
    };

    useEffect(() => {
        usePlannerStore.setState(() => ({
            [`${game}/items`]: list,
        }));
    }, [list]);

    useEffect(() => {
        setList(items);
    }, [open]);

    return (
        <>
            {items.length > 0 && (
                <Button
                    onClick={handleClickOpen}
                    variant="contained"
                    color="info"
                >
                    <TextLabel
                        icon={
                            <LowPriorityIcon
                                fontSize="small"
                                sx={{ color: theme.text.primary }}
                            />
                        }
                        title="Adjust Order"
                        titleProps={{ variant: "subtitle2" }}
                    />
                </Button>
            )}
            <ContentDialog
                open={open}
                setOpen={setOpen}
                onClose={handleClose}
                maxWidth="xs"
                fullWidth
                header="Drag to reorder items"
                headerProps={{
                    textVariant: "body1",
                    padding: "4px 16px",
                    dense: true,
                }}
            >
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                    modifiers={[
                        restrictToVerticalAxis,
                        restrictToParentElement,
                    ]}
                >
                    <SortableContext
                        items={list}
                        strategy={verticalListSortingStrategy}
                    >
                        <Stack
                            spacing={1}
                            sx={{
                                height: "50vh",
                                maxHeight: "600px",
                                overflowY: "auto",
                            }}
                        >
                            {list.map((item) => (
                                <PlannerSorterItem
                                    key={item.id}
                                    item={item}
                                    type={
                                        "element" in item
                                            ? "characters"
                                            : "weapons"
                                    }
                                />
                            ))}
                        </Stack>
                    </SortableContext>
                </DndContext>
            </ContentDialog>
        </>
    );
}
