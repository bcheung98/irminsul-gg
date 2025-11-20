"use client";

import { useEffect } from "react";

// Component imports
import LandingText from "@/components/LandingText";
import Websites from "@/components/Websites";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";

export default function HomePage() {
    const theme = useTheme();

    function playVideo(e: HTMLVideoElement) {
        e.play();
        e.classList.remove("fading");
        setTimeout(() => {
            e.classList.add("fading");
        }, (e.duration / e.playbackRate - 1) * 1000);
    }

    useEffect(() => {
        const video = document.getElementsByClassName(
            "background-video"
        )[0] as HTMLVideoElement;
        playVideo(video);
    }, []);

    return (
        <>
            <video
                id="background-image"
                className="background-video fading"
                playsInline
                autoPlay
                muted
                poster={theme.backgroundImage.imgURL}
                onCanPlay={(e) => playVideo(e.currentTarget)}
                onEnded={(e) => playVideo(e.currentTarget)}
                style={{ filter: theme.backgroundImage.filter }}
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
