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
    const [
        genshinCharacters,
        hsrCharacters,
        wuwaCharacters,
        zzzCharacters,
        umaCharacters,
        umaWeapons,
        endfieldCharacters,
        nteCharacters,
    ] = await Promise.all([
        getDataSet<Banner>("genshin/banner-characters"),
        getDataSet<Banner>("hsr/banner-characters"),
        getDataSet<Banner>("wuwa/banner-characters"),
        getDataSet<Banner>("zzz/banner-characters"),
        getDataSet<Banner>("uma/banner-characters"),
        getDataSet<Banner>("uma/banner-supports"),
        getDataSet<Banner>("endfield/banner-characters"),
        getDataSet<Banner>("nte/banner-characters"),
    ]);

    const banners = {
        "genshin/characters": genshinCharacters,
        "hsr/characters": hsrCharacters,
        "wuwa/characters": wuwaCharacters,
        "zzz/characters": zzzCharacters,
        "uma/characters": umaCharacters,
        "uma/weapons": umaWeapons,
        "endfield/characters": endfieldCharacters,
        "nte/characters": nteCharacters,
    };
    const data = await getItems({
        hideUnreleasedContent: false,
        game: undefined,
        hideUmaJPContent: false,
        pathname: "calendar",
    });

    return (
        <Suspense fallback={<Loader />}>
            <Calendar banners={banners} data={data} />
        </Suspense>
    );
}
