import { useMemo, useState } from "react";
import {
    DndContext,
    closestCenter,
    useSensor,
    useSensors,
    TouchSensor,
    MouseSensor,
    type DragEndEvent,
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
import PlannerSorterItem from "./PlannerSorterItem";
import ContentDialog from "@/components/ContentDialog";
import InfoButton from "@/components/InfoButton";

// MUI imports
import Stack from "@mui/material/Stack";
import MoveUpIcon from "@mui/icons-material/MoveUp";

// Helper imports
import { useGameTag } from "@/context";
import { usePlannerStore } from "@/stores";

// Type imports
import type { GameNoUma } from "@/types";
import type { PlannerItemData } from "@/types/planner";

export default function PlannerSorter() {
    const game = useGameTag() as GameNoUma;

    const items = usePlannerStore((state) => state[`${game}/items`]);
    const setItems = usePlannerStore((state) => state[`${game}/setItems`]);

    const teams = usePlannerStore((state) => state[`${game}/teams`]);
    const activeTeamId = usePlannerStore(
        (state) => state[`${game}/activeTeamId`],
    );
    const setTeamItemOrder = usePlannerStore(
        (state) => state[`${game}/setTeamItemOrder`],
    );

    const displayedItems = useMemo(() => {
        if (activeTeamId === null) return items;

        const activeTeam = teams.find((team) => team.id === activeTeamId);

        if (!activeTeam) return [];

        const itemsById = new Map(items.map((item) => [item.id, item]));

        return activeTeam.itemIDs
            .map((id) => itemsById.get(id))
            .filter((item): item is PlannerItemData => item !== undefined);
    }, [items, teams, activeTeamId]);

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setList(displayedItems);
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [list, setList] = useState<PlannerItemData[]>([]);

    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over || active.id === over.id) return;

        const activeIndex = list.findIndex((item) => item.id === active.id);
        const overIndex = list.findIndex((item) => item.id === over.id);

        if (activeIndex === -1 || overIndex === -1) return;

        const reordered = arrayMove(list, activeIndex, overIndex);

        setList(reordered);

        if (activeTeamId === null) {
            setItems(reordered);
        } else {
            setTeamItemOrder(
                activeTeamId,
                reordered.map((item) => item.id),
            );
        }
    };

    return (
        <>
            {displayedItems.length > 1 && (
                <InfoButton
                    game
                    title="Adjust Order"
                    icons={{ start: MoveUpIcon }}
                    onClick={handleClickOpen}
                />
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
                        <Stack spacing={1}>
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
