"use client";

// Component imports
import LandingText from "@/components/LandingText";
import Websites from "@/components/Websites";

// MUI imports
import Stack from "@mui/material/Stack";

export default function HomePage() {
    return (
        <>
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
            <Stack
                spacing={6}
                sx={{
                    position: "relative",
                    mt: "96px",
                    textAlign: "center",
                    alignItems: "center",
                }}
            >
                <LandingText />
                <Websites />
            </Stack>
        </>
    );
}
