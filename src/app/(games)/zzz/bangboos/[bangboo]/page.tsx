import { Suspense } from "react";

// Component imports
import BangbooPage from "./BangbooPage";
import Loader from "@/components/Loader";

// Helper imports
import { getData } from "@/lib/fetchData";
import { formatHref } from "@/utils";
import { getMetadata } from "@/helpers/metadata";

// Type imports
import type { Metadata } from "next";
import { ZZZBangboo } from "@/types/zzz";

interface Props {
    params: Promise<{ bangboo: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { bangboo } = await params;
    const bangbooData = await getData<ZZZBangboo>(
        "zzz/bangboos",
        (boo) => formatHref(boo.url) === formatHref(bangboo)
    );

    return getMetadata({
        game: "zzz",
        tag: "bangboos",
        attributes: {
            id: bangbooData.id,
            name: bangbooData.name,
            displayName: bangbooData.displayName,
        },
    });
}

export default async function Page({ params }: Props) {
    const { bangboo } = await params;
    const bangbooData = await getData<ZZZBangboo>(
        "zzz/bangboos",
        (boo) => formatHref(boo.url) === formatHref(bangboo)
    );

    return (
        <Suspense fallback={<Loader />}>
            <BangbooPage bangboo={bangbooData} />
        </Suspense>
    );
}
