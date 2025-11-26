import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Ascension Planner",
    description: "Tool for calculating level-up costs",
};

export default function AscensionPlannerPageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <section>{children}</section>;
}
