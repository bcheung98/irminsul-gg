import { useEffect, useRef, useState } from "react";
import domtoimage from "dom-to-image-more";

// Component imports
import UmaShowcaseImage from "./UmaShowcaseImage";
import FlexBox from "@/components/FlexBox";
import Text from "@/components/Text";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import DownloadIcon from "@mui/icons-material/Download";
import ReplayIcon from "@mui/icons-material/Replay";

// Helper imports
import { useRatingCalculatorStore } from "@/stores";
import { calculateRank, getScore } from "@/helpers/uma/calculator";
import { useTEHelperData } from "../TEHelper/TEHelper.utils";

const IMAGE_CACHE_ENABLED = process.env.NODE_ENV === "production";
const IMAGE_CACHE_LIMIT = 10;
const IMAGE_WIDTH = 600; // px

const imageCache = new Map<string, Blob>();

function getCachedImage(key: string): Blob | undefined {
    if (!IMAGE_CACHE_ENABLED) return undefined;

    const blob = imageCache.get(key);
    if (!blob) {
        return undefined;
    }

    // Move the entry to the end so it becomes the most recently used.
    imageCache.delete(key);
    imageCache.set(key, blob);

    return blob;
}

function setCachedImage(key: string, blob: Blob) {
    if (!IMAGE_CACHE_ENABLED) return;

    // Remove first so an existing entry is moved to the end.
    imageCache.delete(key);
    imageCache.set(key, blob);

    // Remove the least recently used entry.
    if (imageCache.size > IMAGE_CACHE_LIMIT) {
        const oldestKey = imageCache.keys().next().value;
        if (oldestKey !== undefined) {
            imageCache.delete(oldestKey);
        }
    }
}

async function generateImageBlob(element: HTMLElement): Promise<Blob> {
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            reject(new Error("Image generation timed out"));
        }, 10_000);
        domtoimage
            .toBlob(element, { pixelRatio: 2 })
            .then(resolve)
            .catch(reject)
            .finally(() => {
                clearTimeout(timeout);
            });
    });
}

export default function UmaShowcase() {
    const theme = useTheme();

    const { characters } = useTEHelperData();

    const {
        character: charID,
        aptitude,
        stats,
        skills,
        hiddenSkills,
    } = useRatingCalculatorStore();

    const character = characters.find((c) => c.id === charID)!;

    const imageKey = JSON.stringify({
        character,
        stats,
        aptitude,
        skills: skills.map((skill) => skill.id),
        hiddenSkills,
    });

    const { statsScore, uniqueScore, skillScore } = getScore({
        aptitude,
        stats,
        skills,
        hiddenSkills,
    });

    const rating = [statsScore, uniqueScore, skillScore]
        .flat()
        .reduce((a, c) => a + c);

    const { rank } = calculateRank(rating);

    const [imageURL, setImageURL] = useState<string | null>(null);
    const [imageError, setImageError] = useState(false);
    const [generating, setGenerating] = useState(false);
    const [downloading, setDownloading] = useState(false);

    const ref = useRef<HTMLDivElement>(null);

    async function generateImage() {
        if (!ref.current) return;

        setImageError(false);
        setGenerating(true);

        const cachedBlob = getCachedImage(imageKey);
        if (cachedBlob) {
            const url = URL.createObjectURL(cachedBlob);
            setImageURL(url);
            setGenerating(false);
            return;
        }

        try {
            const blob = await generateImageBlob(ref.current);
            setCachedImage(imageKey, blob);
            const url = URL.createObjectURL(blob);
            setImageURL(url);
        } catch (error) {
            setImageError(true);
            console.error("Failed to generate image:", error);
        } finally {
            setGenerating(false);
        }
    }

    function downloadImage() {
        if (!imageURL) return;

        setDownloading(true);

        const link = document.createElement("a");
        link.href = imageURL;
        link.download = `${imageURL.split("/").slice(-1)[0]}.png`;

        document.body.appendChild(link);
        link.click();
        link.remove();

        setDownloading(false);
    }

    useEffect(() => {
        generateImage();
    }, [
        character,
        JSON.stringify(aptitude),
        JSON.stringify(stats),
        JSON.stringify(skills),
        JSON.stringify(hiddenSkills),
    ]);

    useEffect(() => {
        return () => {
            if (imageURL) {
                URL.revokeObjectURL(imageURL);
            }
        };
    }, [imageURL]);

    return (
        <Stack spacing={3}>
            <FlexBox sx={{ justifyContent: "center" }}>
                <Button
                    color={imageError ? "error" : "info"}
                    variant="contained"
                    size="small"
                    onClick={imageError ? generateImage : downloadImage}
                    disabled={generating}
                    startIcon={
                        downloading ? (
                            <CircularProgress
                                size={theme.font.sizes.h6.sm}
                                sx={{ color: theme.text.primary }}
                            />
                        ) : imageError ? (
                            <ReplayIcon />
                        ) : (
                            <DownloadIcon />
                        )
                    }
                    sx={{
                        "&.Mui-disabled": {
                            backgroundColor: theme.palette.info.main,
                            color: theme.text.primary,
                            opacity: 0.5,
                            cursor: "not-allowed",
                        },
                    }}
                >
                    {imageError ? "Retry" : "Download"}
                </Button>
            </FlexBox>
            <FlexBox sx={{ justifyContent: "center", width: "100%" }}>
                {imageURL ? (
                    <img
                        src={imageURL}
                        alt={`${character.name} showcase`}
                        style={{
                            width: "100%",
                            maxWidth: `${IMAGE_WIDTH}px`,
                            borderRadius: "8px",
                        }}
                    />
                ) : imageError ? (
                    <Text weight="highlight">
                        Failed to generate image. Please try again.
                    </Text>
                ) : (
                    <CircularProgress color="info" />
                )}
            </FlexBox>
            <Box
                sx={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: `${IMAGE_WIDTH}px`,
                    height: "100%",
                    opacity: 0,
                    pointerEvents: "none",
                }}
            >
                <UmaShowcaseImage
                    ref={ref}
                    character={character}
                    aptitude={aptitude}
                    stats={stats}
                    skills={skills}
                    hiddenSkills={hiddenSkills}
                    rating={rating}
                    rank={rank}
                />
            </Box>
        </Stack>
    );
}
