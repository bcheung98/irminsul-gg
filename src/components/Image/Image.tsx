import { useRef, useState } from "react";
import styles from "./styles.module.css";

// Component imports
import Tooltip from "@/components/Tooltip";

// Helper imports
import {
    DEFAULT_FALLBACK_URL,
    EMPTY_IMAGE,
    resolveFallbackImages,
    resolveImageUrl,
    toCssLength,
} from "./Image.utils";

// Type imports
import type { ImageLoadStatus, ImageProps } from "./Image.types";

export default function Image({
    src,
    fallbackSrc,
    size,
    alt = "",
    id = src,
    loading = "lazy",
    fadeOnLoad = false,
    style,
    tooltip = "",
    tooltipArrow = "top",
    zoomOnHover = false,
    responsive = false,
    responsiveSize = 0.125,
    onClick,
    supressLoadImageWarning = false,
    format = "png",
}: ImageProps) {
    const [width, height] = Array.isArray(size) ? size : [size, size];

    const resolvedWidth = style?.width ?? width ?? "auto";
    const resolvedHeight = style?.height ?? height ?? "auto";

    const imgStyle = {
        ...style,
        width: responsive ? undefined : resolvedWidth,
        height: responsive ? undefined : resolvedHeight,
        ...(responsive && {
            "--image-width": toCssLength(resolvedWidth),
            "--image-height": toCssLength(resolvedHeight),
            "--responsive-scale": 1 - responsiveSize,
        }),
    } as React.CSSProperties;

    const imageUrl = resolveImageUrl(src, format);

    const [loadState, setLoadState] = useState<{
        src: string;
        status: ImageLoadStatus;
    }>({
        src: imageUrl,
        status: "loading",
    });

    const currentStatus =
        loadState.src === imageUrl ? loadState.status : "loading";

    const imageLoaded =
        !fadeOnLoad || currentStatus === "loaded" || currentStatus === "failed";

    function onLoad(event: React.SyntheticEvent<HTMLImageElement>) {
        const loadedUrl = event.currentTarget.src;

        if (loadedUrl === EMPTY_IMAGE) return;

        if (
            !supressLoadImageWarning &&
            loadedUrl === DEFAULT_FALLBACK_URL &&
            imageUrl !== DEFAULT_FALLBACK_URL
        ) {
            console.warn(`Failed to load image ${imageUrl}`);
        }

        if (fadeOnLoad) {
            setLoadState({
                src: imageUrl,
                status: "loaded",
            });
        }
    }

    const fallbacks = resolveFallbackImages(imageUrl, fallbackSrc);

    const fallbackRef = useRef({
        src: imageUrl,
        index: 0,
    });

    if (fallbackRef.current.src !== imageUrl) {
        fallbackRef.current = {
            src: imageUrl,
            index: 0,
        };
    }

    // Set fallback images in sequence
    function onError(event: React.SyntheticEvent<HTMLImageElement>) {
        const image = event.currentTarget;
        const nextFallback = fallbacks[fallbackRef.current.index];

        if (!nextFallback) {
            if (!supressLoadImageWarning) {
                console.warn(`Failed to load image ${imageUrl}`);
            }

            image.src = EMPTY_IMAGE;

            setLoadState({
                src: imageUrl,
                status: "failed",
            });

            return;
        }

        fallbackRef.current.index++;
        image.src = nextFallback;
    }

    const tooltipOpenRef = useRef(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [mountTooltip, setMountTooltip] = useState(false);

    const handleHover = (entering: boolean) => {
        tooltipOpenRef.current = entering;

        // Only mount tooltip when hovering over the image.
        // This prevents expensive component teardowns when
        // there are 500+ tooltips on a page.
        if (entering) {
            setMountTooltip(true);
        }

        setShowTooltip(entering);
    };

    const imageRef = useRef<HTMLImageElement>(null);

    const image = (
        <img
            ref={imageRef}
            id={id}
            src={imageUrl}
            alt={alt}
            className={[
                responsive && styles.responsive,
                zoomOnHover && styles.zoomOnHover,
                fadeOnLoad && styles.fadeOnLoad,
                fadeOnLoad && imageLoaded && styles.loaded,
            ]
                .filter(Boolean)
                .join(" ")}
            style={imgStyle}
            onLoad={onLoad}
            onError={onError}
            onClick={onClick}
            onMouseEnter={tooltip ? () => handleHover(true) : undefined}
            onMouseLeave={tooltip ? () => handleHover(false) : undefined}
            loading={loading}
        />
    );

    return (
        <>
            {image}
            {tooltip && mountTooltip && (
                <Tooltip
                    title={tooltip}
                    placement={tooltipArrow}
                    open={showTooltip}
                    disableHoverListener
                    disableFocusListener
                    disableTouchListener
                    slotProps={{
                        popper: {
                            anchorEl: imageRef.current,
                        },
                        transition: {
                            onExited: () => {
                                if (!tooltipOpenRef.current) {
                                    setMountTooltip(false);
                                }
                            },
                        },
                    }}
                >
                    <span
                        style={{
                            position: "absolute",
                            width: 0,
                            height: 0,
                            pointerEvents: "none",
                        }}
                    />
                </Tooltip>
            )}
        </>
    );
}
