// Component imports
import FlexBox from "@/components/FlexBox";
import PlannerTeamSelector from "./PlannerTeamSelector";
import PlannerTeamRename from "./PlannerTeamRename";
import PlannerTeamDelete from "./PlannerTeamDelete";

// Helper imports
import { useGameTag } from "@/context";
import { usePlannerStore } from "@/stores";

// Type imports
import type { GameNoUma } from "@/types";

export default function PlannerTeams() {
    const game = useGameTag() as GameNoUma;

    const teams = usePlannerStore((state) => state[`${game}/teams`]);
    const activeTeamId = usePlannerStore(
        (state) => state[`${game}/activeTeamId`],
    );
    const setActiveTeam = usePlannerStore(
        (state) => state[`${game}/setActiveTeam`],
    );

    const activeTeam = teams.find((team) => team.id === activeTeamId);

    return (
        <FlexBox spacing={1}>
            <PlannerTeamSelector
                teams={teams}
                activeTeamId={activeTeamId}
                setActiveTeam={setActiveTeam}
            />
            {activeTeam && (
                <>
                    <PlannerTeamRename
                        key={`rename-${activeTeam.id}`}
                        team={activeTeam}
                    />
                    <PlannerTeamDelete
                        key={`delete-${activeTeam.id}`}
                        team={activeTeam}
                    />
                </>
            )}
        </FlexBox>
    );
}
