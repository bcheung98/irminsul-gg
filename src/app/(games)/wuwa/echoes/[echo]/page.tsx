import { Suspense } from "react";

// Component imports
import EchoPage from "./EchoPage";
import Loader from "@/components/Loader";

// Helper imports
import { getData } from "@/lib/fetchData";
import { formatHref } from "@/utils";

// Type imports
import type { Metadata } from "next";
import { WuWaEcho } from "@/types/wuwa";

interface Props {
    params: Promise<{ echo: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { echo } = await params;
    const echoData = await getData<WuWaEcho>(
        "wuwa/echoes",
        (e) => formatHref(e.url) === formatHref(echo)
    );

    return {
        title: echoData?.displayName,
        description: echoData?.description,
        keywords: [echoData.displayName, echoData.name],
    };
}

export default async function Page({ params }: Props) {
    const { echo } = await params;
    const echoData = await getData<WuWaEcho>(
        "wuwa/echoes",
        (e) => formatHref(e.url) === formatHref(echo)
    );

    return (
        <Suspense fallback={<Loader />}>
            <EchoPage echo={echoData} />
        </Suspense>
    );
}
