import { Suspense } from "react";

// Component imports
import LandingText from "../components/LandingText";
import Websites from "../components/Websites";
import Loader from "@/components/Loader";

export default function Home() {
    return (
        <Suspense fallback={<Loader />}>
            <LandingText />
            <Websites />
        </Suspense>
    );
}
