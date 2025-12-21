"use client";

import { useEffect, useState } from "react";

// Component imports
import LandingText from "@/components/LandingText";
import Websites from "@/components/Websites";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";

// Helper imports
import { useGameList } from "@/context";

export default function HomePage() {
    const theme = useTheme();

    function playVideo(e: HTMLVideoElement) {
        e.play();
        e.classList.remove("inactive");
        setTimeout(() => {
            e.classList.add("inactive");
        }, (e.duration / e.playbackRate - 1) * 1000);
    }

    useEffect(() => {
        const video = document.getElementsByClassName(
            "background-image background-video"
        )[0] as HTMLVideoElement;
        playVideo(video);
    }, []);

    const [index, setIndex] = useState([-1, -1]);
    const handleIndexChange = (newIndex: number) => {
        setIndex((state) => [state[1], newIndex]);
    };

    const [prev, current] = index;

    const games = useGameList().sort((a, b) => a.name.localeCompare(b.name));
    const images = games.map((game, i) => (
        <img
            key={`background-image-${i}`}
            id={`background-image-${i}`}
            className="background-image inactive"
            src={`https://assets.irminsul.gg/v2/${game.tag}/_common/Background.png`}
            style={{ filter: theme.backgroundImage.filterGame }}
        />
    ));

    useEffect(() => {
        const video = document.getElementsByClassName(
            "background-image background-video"
        )[0] as HTMLVideoElement;
        if (current !== -1) {
            video.classList.add("inactive");
            video.pause();
            const prevImage = document.getElementById(
                `background-image-${prev}`
            );
            prevImage?.classList.remove("active");
            prevImage?.classList.add("inactive");
            const newImage = document.getElementById(
                `background-image-${current}`
            );
            newImage?.classList.remove("inactive");
            newImage?.classList.add("active");
        }
    }, [prev, current]);

    return (
        <>
            <video
                id="background-video--1"
                className="background-image background-video inactive"
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
                <source
                    src="https://assets.irminsul.gg/v2/_common/IRMINSUL.mp4"
                    type="video/mp4"
                />
            </video>
            {images}
            <Stack
                spacing={6}
                sx={{
                    position: "relative",
                    mt: 12,
                    textAlign: "center",
                    alignItems: "center",
                    userSelect: "none",
                }}
            >
                <LandingText />
                <Websites action={handleIndexChange} />
            </Stack>
        </>
    );
}
