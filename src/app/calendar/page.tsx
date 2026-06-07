import { Suspense } from "react";

// Component imports
import Calendar from "@/components/Calendar";
import Loader from "@/components/Loader";

// Helper imports
import { getDataSet } from "@/api";
import { getItems } from "@/components/SiteSearch/SiteSearch.utils";

// Type imports
import { Banner } from "@/types/banner";

export default async function CalendarPage() {
    const banners = {
        "genshin/characters": await getDataSet<Banner>(
            "genshin/banner-characters",
        ),
        "hsr/characters": await getDataSet<Banner>("hsr/banner-characters"),
        "wuwa/characters": await getDataSet<Banner>("wuwa/banner-characters"),
        "zzz/characters": await getDataSet<Banner>("zzz/banner-characters"),
        "uma/characters": await getDataSet<Banner>("uma/banner-characters"),
        "uma/weapons": await getDataSet<Banner>("uma/banner-supports"),
        "endfield/characters": await getDataSet<Banner>(
            "endfield/banner-characters",
        ),
        "nte/characters": await getDataSet<Banner>("nte/banner-characters"),
    };
    const data = await getItems(false, undefined, false, "calendar");

    return (
        <Suspense fallback={<Loader />}>
            <Calendar banners={banners} data={data} />
        </Suspense>
    );
}
