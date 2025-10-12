import { Suspense } from "react";

// Component imports
import LandingText from "../components/LandingText";
import Websites from "../components/Websites";
import Loader from "@/components/Loader";

export default function Home() {
    return (
        <Suspense fallback={<Loader />}>
            <video
                playsInline
                autoPlay
                muted
                loop
                poster="https://assets.irminsul.gg/main/images/Irminsul.png"
                id="background-image"
            >
                {/* 
                    Background video courtesy of /u/lunimater on Reddit
                    https://redd.it/1bombpo
                */}
                <source src="/IRMINSUL.mp4" type="video/mp4" />
            </video>
            <LandingText />
            <Websites />
        </Suspense>
    );
}
