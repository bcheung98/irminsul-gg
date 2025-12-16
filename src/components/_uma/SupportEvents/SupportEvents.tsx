// Component imports
import EventSupport from "../TrainingEvents/EventSupport";
import ContentBox from "@/components/ContentBox";

// Type imports
import { UmaSupport } from "@/types/uma";

export default function SupportEvents({ support }: { support: UmaSupport }) {
    return (
        <ContentBox header="Training Events">
            <EventSupport support={support} />
        </ContentBox>
    );
}
