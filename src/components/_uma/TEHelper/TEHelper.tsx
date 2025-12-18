"use client";

// Component imports
import TEHHeader from "./TEHHeader";
import TEHContent from "./TEHContent";
import Text from "@/components/Text";

// MUI imports
import Stack from "@mui/material/Stack";

// Helper imports
import { TEHelperDataContext } from "./TEHelper.utils";

// Type imports
import { UmaCharacter, UmaSupport } from "@/types/uma";
import { EventList } from "@/types/uma/event";
import { UmaSkill } from "@/types/uma/skill";
import { UmaCharacterProfile } from "@/types/uma/character";
import { UmaContext } from "@/context";

export default function TEHelper({
    characters,
    supports,
    profiles,
    skills,
    events,
}: {
    characters: UmaCharacter[];
    supports: UmaSupport[];
    profiles: UmaCharacterProfile[];
    skills: UmaSkill[];
    events: EventList;
}) {
    return (
        <UmaContext value={{ skills, events, profiles }}>
            <TEHelperDataContext value={{ characters, supports }}>
                <Stack spacing={2} sx={{ p: 1 }}>
                    <Text variant="h5" weight="highlight">
                        Training Event Helper
                    </Text>
                    <TEHHeader />
                    <TEHContent />
                </Stack>
            </TEHelperDataContext>
        </UmaContext>
    );
}
