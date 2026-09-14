import CalendarLayout from "@/layouts/CalendarLayout";
import { getMetadata } from "@/helpers/metadata";

export const metadata = getMetadata({
    overrides: {
        title: {
            default: "Gacha Calendar",
            template: "%s - Gacha Calendar",
        },
        description:
            "Keep track of banner schedules across various gacha games in one convenient calendar, with banner dates, featured items, and countdowns for each banner.",
        twitter: {
            card: "summary_large_image",
            images: [
                "https://raw.githubusercontent.com/bcheung98/irminsul-gg/refs/heads/main/.docs/calendar-v2-img1.png",
            ],
        },
        canonical: "/calendar",
    },
});

export default function Layout({ children }: { children: React.ReactNode }) {
    return <CalendarLayout>{children}</CalendarLayout>;
}
