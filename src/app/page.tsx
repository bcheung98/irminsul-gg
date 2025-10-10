import { Suspense } from "react";

// Component imports
import LandingText from "./_components/LandingText";
import Websites from "./_components/Websites";
import Loader from "@/components/Loader";

export default function Home() {
    return (
        <Suspense fallback={<Loader />}>
            <LandingText />
            <Websites />
        </Suspense>
    );
}
