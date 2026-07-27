import { CharacterSkillsList } from "@/types/skill";

interface ChangelogEntry {
    changed: string[];
    added: string[];
}

export function buildChangelog(
    skills: CharacterSkillsList | undefined,
    targetVersion = "v2",
) {
    if (!skills) return {};

    const changelog: Record<string, ChangelogEntry> = {};

    for (const [category, categoryItems] of Object.entries(skills)) {
        const v1 = new Map(
            categoryItems
                ?.filter((item) => item.version == undefined)
                .map((item) => [item.name, item]),
        );
        const v2 = new Map(
            categoryItems
                ?.filter((item) => item.version?.value === targetVersion)
                .map((item) => [item.name, item]),
        );

        const entry: ChangelogEntry = {
            changed: [],
            added: [],
        };

        for (const [name, current] of v2) {
            const previous = v1.get(name);
            if (!previous) {
                entry.added.push(name);
                continue;
            }
            const { version: _, ...currentWithoutVersion } = current;
            if (
                JSON.stringify(previous) !==
                JSON.stringify(currentWithoutVersion)
            ) {
                entry.changed.push(name);
            }
        }

        if (entry.changed.length > 0 || entry.added.length > 0) {
            changelog[category] = entry;
        }
    }

    return changelog;
}
