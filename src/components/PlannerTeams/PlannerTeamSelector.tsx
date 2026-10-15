import { useMemo } from "react";

// Component imports
import SelectWithArrows from "@/components/SelectWithArrows";
import MenuItem from "@/components/MenuItem";
import TextLabel from "@/components/TextLabel";

// MUI imports
import { useTheme } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";

// Helper imports
import { useGameTag } from "@/context";
import { usePlannerStore } from "@/stores";

// Type imports
import type { GameNoUma } from "@/types";
import type { SelectChangeEvent } from "@mui/material/Select";
import type { PlannerTeam } from "@/types/planner";

interface PlannerTeamSelectorProps {
    teams: PlannerTeam[];
    activeTeamId: string | null;
    setActiveTeam: (id: string | null) => void;
}

export default function PlannerTeamSelector({
    teams,
    activeTeamId,
    setActiveTeam,
}: PlannerTeamSelectorProps) {
    const theme = useTheme();

    const game = useGameTag() as GameNoUma;

    const createTeam = usePlannerStore((state) => state[`${game}/createTeam`]);

    const options = useMemo(
        () => [{ id: null, name: "All Items" }, ...teams],
        [teams],
    );

    const index = Math.max(
        0,
        options.findIndex((option) => option.id === activeTeamId),
    );

    const handleIndexChange = (event: SelectChangeEvent) => {
        const value = event.target.value;

        if (value === "add-team") {
            createTeam();
            return;
        }

        const nextIndex = Number(value);
        setActiveTeam(options[nextIndex].id);
    };

    const handleIndexChangeLeft = () => {
        if (index > 0) {
            setActiveTeam(options[index - 1].id);
        }
    };

    const handleIndexChangeRight = () => {
        if (index < options.length - 1) {
            setActiveTeam(options[index + 1].id);
        }
    };

    const selectProps = {
        index,
        data: options,
        handleIndexChange,
        handleIndexChangeLeft,
        handleIndexChangeRight,
        disabledLeft: index === 0,
        disabledRight: index === options.length - 1,
    };

    return (
        <>
            <SelectWithArrows {...selectProps} width="100%">
                {options.map((option, optionIndex) => (
                    <MenuItem
                        key={option.id ?? "all"}
                        value={optionIndex}
                        sx={{ minHeight: "32px" }}
                    >
                        <TextLabel
                            title={option.name}
                            titleProps={{
                                variant: "subtitle1",
                            }}
                        />
                    </MenuItem>
                ))}
                <MenuItem
                    value="add-team"
                    sx={{
                        borderTop: `1px solid ${theme.border.color.highlight}`,
                        minHeight: "32px",
                    }}
                >
                    <TextLabel
                        icon={<AddIcon fontSize="small" />}
                        title="Add New Group"
                        titleProps={{
                            variant: "subtitle1",
                        }}
                    />
                </MenuItem>
            </SelectWithArrows>
        </>
    );
}
