// Component imports
import EventCharacter from "../TrainingEvents/EventCharacter";
import ContentBox from "@/components/ContentBox";

// Type imports
import { UmaCharacter } from "@/types/uma";

export default function CharacterEvents({
    character,
}: {
    character: UmaCharacter;
}) {
    return (
        <ContentBox header="Training Events">
            <EventCharacter character={character} />
        </ContentBox>
    );
}
