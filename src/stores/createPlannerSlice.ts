import type { StateCreator } from "zustand";

import type { GameNoUma } from "@/types";
import {
    getCompletedMaterialKey,
    type CompletedMaterialKey,
    type CombinedPlannerSlice,
    type GamePlannerSlice,
    type PlannerSlice,
} from "./usePlannerStore";

type PlannerStateCreator<G extends GameNoUma> = StateCreator<
    CombinedPlannerSlice,
    [["zustand/persist", unknown]],
    [],
    GamePlannerSlice<G, PlannerSlice>
>;

export function createPlannerSlice<G extends GameNoUma>(
    game: G,
): PlannerStateCreator<G> {
    return (set, get) => {
        const read = <K extends keyof PlannerSlice>(
            state: CombinedPlannerSlice,
            property: K,
        ): PlannerSlice[K] => state[`${game}/${property}`] as PlannerSlice[K];

        const patch = (
            values: Partial<PlannerSlice>,
        ): Partial<CombinedPlannerSlice> =>
            Object.fromEntries(
                Object.entries(values).map(([property, value]) => [
                    `${game}/${property}`,
                    value,
                ]),
            ) as Partial<CombinedPlannerSlice>;

        const slice: PlannerSlice = {
            totalCost: {},
            items: [],
            hidden: [],
            completed: [],
            teams: [],
            activeTeamId: null,

            setItems(items) {
                set(patch({ items }));
            },

            addItem(item) {
                set((state) => {
                    const items = read(state, "items");
                    const teams = read(state, "teams");
                    const activeTeamId = read(state, "activeTeamId");

                    const exists = items.some(
                        (existing) => existing.id === item.id,
                    );

                    const updatedItems = exists ? items : [item, ...items];

                    const updatedTeams = activeTeamId
                        ? teams.map((team) =>
                              team.id === activeTeamId &&
                              !team.itemIDs.includes(item.id)
                                  ? {
                                        ...team,
                                        itemIDs: [...team.itemIDs, item.id],
                                    }
                                  : team,
                          )
                        : teams;

                    if (
                        updatedItems === items &&
                        updatedTeams.every(
                            (team, index) => team === teams[index],
                        )
                    ) {
                        return state;
                    }

                    return patch({
                        items: updatedItems,
                        teams: updatedTeams,
                    });
                });
            },

            deleteItem(id) {
                set((state) => {
                    const totalCosts = read(state, "totalCost");

                    const { [id]: _deleted, ...remainingCosts } = totalCosts;

                    const remainingMaterials = new Set<CompletedMaterialKey>();

                    for (const costs of Object.values(remainingCosts)) {
                        for (const [category, materials] of Object.entries(
                            costs,
                        )) {
                            for (const [materialID, amount] of Object.entries(
                                materials,
                            )) {
                                if (amount > 0) {
                                    remainingMaterials.add(
                                        getCompletedMaterialKey(
                                            category,
                                            materialID,
                                        ),
                                    );
                                }
                            }
                        }
                    }

                    return patch({
                        items: read(state, "items").filter(
                            (item) => item.id !== id,
                        ),
                        hidden: read(state, "hidden").filter(
                            (itemID) => itemID !== id,
                        ),
                        totalCost: remainingCosts,
                        completed: read(state, "completed").filter((key) =>
                            remainingMaterials.has(key),
                        ),
                        teams: read(state, "teams").map((team) =>
                            team.itemIDs.includes(id)
                                ? {
                                      ...team,
                                      itemIDs: team.itemIDs.filter(
                                          (itemID) => itemID !== id,
                                      ),
                                  }
                                : team,
                        ),
                    });
                });
            },

            setItemValues({ id, skillKey, values }) {
                const items = read(get(), "items");

                if (items.length === 0) return;

                const index = items.findIndex((item) => item.id === id);

                if (index === -1) {
                    throw new Error(`Could not find item with ID ${id}`);
                }

                set(
                    patch({
                        items: items.map((item) =>
                            item.id === id
                                ? {
                                      ...item,
                                      values: {
                                          ...item.values,
                                          [skillKey]: values,
                                      },
                                  }
                                : item,
                        ),
                    }),
                );
            },

            setHiddenItems(id) {
                const hidden = read(get(), "hidden");

                set(
                    patch({
                        hidden: hidden.includes(id)
                            ? hidden.filter((itemID) => itemID !== id)
                            : [...hidden, id],
                    }),
                );
            },

            updateTotalCosts(id, costs) {
                const itemIDs = new Set(
                    read(get(), "items").map((item) => item.id),
                );

                const totalCosts = Object.fromEntries(
                    Object.entries(read(get(), "totalCost")).filter(
                        ([itemID]) => itemIDs.has(Number(itemID)),
                    ),
                );

                if (id !== undefined && costs !== undefined) {
                    totalCosts[id] = costs;
                }

                set(patch({ totalCost: totalCosts }));
            },

            toggleCompleted(key) {
                const completed = read(get(), "completed");

                set(
                    patch({
                        completed: completed.includes(key)
                            ? completed.filter((value) => value !== key)
                            : [...completed, key],
                    }),
                );
            },

            createTeam(options) {
                const id = crypto.randomUUID();

                set((state) => {
                    const teams = read(state, "teams");
                    const existingNames = new Set(
                        teams.map((team) => team.name),
                    );

                    let number = 1;

                    while (existingNames.has(`Group ${number}`)) {
                        number++;
                    }

                    return patch({
                        teams: [
                            ...teams,
                            {
                                id,
                                name: `Group ${number}`,
                                itemIDs:
                                    options?.itemID !== undefined
                                        ? [options.itemID]
                                        : [],
                            },
                        ],
                        activeTeamId:
                            options?.activate === false
                                ? read(state, "activeTeamId")
                                : id,
                    });
                });
            },

            renameTeam(id, name) {
                set((state) => {
                    const trimmedName = name.trim();
                    const teams = read(state, "teams");

                    if (
                        !trimmedName ||
                        !teams.some(
                            (team) =>
                                team.id === id && team.name !== trimmedName,
                        )
                    ) {
                        return state;
                    }

                    return patch({
                        teams: teams.map((team) =>
                            team.id === id
                                ? { ...team, name: trimmedName }
                                : team,
                        ),
                    });
                });
            },

            deleteTeam(id) {
                set((state) => {
                    const teams = read(state, "teams");

                    if (!teams.some((team) => team.id === id)) {
                        return state;
                    }

                    return patch({
                        teams: teams.filter((team) => team.id !== id),
                        activeTeamId:
                            read(state, "activeTeamId") === id
                                ? null
                                : read(state, "activeTeamId"),
                    });
                });
            },

            setActiveTeam(id) {
                set((state) => {
                    const teams = read(state, "teams");
                    const currentID = read(state, "activeTeamId");

                    const nextID =
                        id === null || teams.some((team) => team.id === id)
                            ? id
                            : currentID;

                    if (nextID === currentID) return state;

                    return patch({ activeTeamId: nextID });
                });
            },

            setTeamItem(itemID, teamID, included) {
                set((state) => {
                    const teams = read(state, "teams");

                    if (
                        !read(state, "items").some((item) => item.id === itemID)
                    ) {
                        return state;
                    }

                    const team = teams.find((team) => team.id === teamID);

                    if (!team) return state;

                    const exists = team.itemIDs.includes(itemID);

                    if (exists === included) return state;

                    return patch({
                        teams: teams.map((team) =>
                            team.id === teamID
                                ? {
                                      ...team,
                                      itemIDs: included
                                          ? [...team.itemIDs, itemID]
                                          : team.itemIDs.filter(
                                                (id) => id !== itemID,
                                            ),
                                  }
                                : team,
                        ),
                    });
                });
            },

            setTeamItemOrder(teamID, itemIDs) {
                set((state) => {
                    const teams = read(state, "teams");
                    const team = teams.find((team) => team.id === teamID);

                    if (!team) return state;

                    const existingIDs = new Set(team.itemIDs);

                    if (
                        itemIDs.length !== existingIDs.size ||
                        new Set(itemIDs).size !== existingIDs.size ||
                        itemIDs.some((id) => !existingIDs.has(id))
                    ) {
                        return state;
                    }

                    if (
                        itemIDs.every((id, index) => id === team.itemIDs[index])
                    ) {
                        return state;
                    }

                    return patch({
                        teams: teams.map((team) =>
                            team.id === teamID
                                ? { ...team, itemIDs: [...itemIDs] }
                                : team,
                        ),
                    });
                });
            },
        };

        return Object.fromEntries(
            Object.entries(slice).map(([property, value]) => [
                `${game}/${property}`,
                value,
            ]),
        ) as GamePlannerSlice<G, PlannerSlice>;
    };
}
