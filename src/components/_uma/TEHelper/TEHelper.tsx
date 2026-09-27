"use client";

// Component imports
import TEHHeader from "./TEHHeader";
import TEHContent from "./TEHContent";
import Text from "@/components/Text";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";

// Helper imports
import { UmaContext } from "@/context";
import { TEHelperDataContext } from "./TEHelper.utils";

// Type imports
import type { UmaCharacter, UmaSupport } from "@/types/uma";
import type { EventList } from "@/types/uma/event";
import type { UmaSkill } from "@/types/uma/skill";
import type { UmaCharacterProfile } from "@/types/uma/character";

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
    const theme = useTheme();

    return (
        <UmaContext value={{ skills, events, profiles }}>
            <TEHelperDataContext value={{ characters, supports }}>
                <Stack spacing={2} sx={{ px: 1, py: { xs: 1, sm: 2, lg: 1 } }}>
                    <Text
                        variant="h5"
                        weight="highlight"
                        sx={{ color: theme.text.page }}
                    >
                        Training Event Helper
                    </Text>
                    <TEHHeader />
                    <TEHContent />
                </Stack>
            </TEHelperDataContext>
        </UmaContext>
    );
}
