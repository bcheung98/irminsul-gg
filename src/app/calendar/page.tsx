import { Suspense } from "react";

// Component imports
import Calendar from "@/components/Calendar";
import Loader from "@/components/Loader";

// Helper imports
import { getDataSet } from "@/lib/fetchData";
import { getItems } from "@/components/SiteSearch/SiteSearch.utils";

// Type imports
import { Banner } from "@/types/banner";

export default async function CalendarPage() {
    const banners = {
        "genshin/characters": await getDataSet<Banner>(
            "genshin/banner-characters"
        ),
        // "genshin/weapons": await getDataSet<Banner>("genshin/banner-weapons"),
    };
    const data = await getItems(false);

    return (
        <Suspense fallback={<Loader />}>
            <Calendar banners={banners} data={data} />
        </Suspense>
    );
}
