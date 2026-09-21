import { useCallback, useState } from "react";

const RESULTS_PER_BATCH = 25;
const LOAD_MORE_THRESHOLD = 350;

interface UseProgressiveResultsProps {
    resultCount: number;
    batchSize?: number;
    loadMoreThreshold?: number;
}

export function useProgressiveResults({
    resultCount,
    batchSize = RESULTS_PER_BATCH,
    loadMoreThreshold = LOAD_MORE_THRESHOLD,
}: UseProgressiveResultsProps) {
    const [visibleResultCount, setVisibleResultCount] = useState(batchSize);

    const resetVisibleResults = useCallback(() => {
        setVisibleResultCount(batchSize);
    }, [batchSize]);

    const showResult = useCallback(
        (index: number) => {
            setVisibleResultCount((count) => {
                if (index < count || index >= resultCount) {
                    return count;
                }

                return Math.min(
                    Math.ceil((index + 1) / batchSize) * batchSize,
                    resultCount,
                );
            });
        },
        [resultCount, batchSize],
    );

    const handleContentScroll = useCallback(
        (event: React.UIEvent<HTMLDivElement>) => {
            const element = event.currentTarget;
            const distanceFromBottom =
                element.scrollHeight - element.scrollTop - element.clientHeight;

            if (distanceFromBottom <= loadMoreThreshold) {
                setVisibleResultCount((count) => {
                    if (count >= resultCount) {
                        return count;
                    }

                    return Math.min(count + batchSize, resultCount);
                });
            }
        },
        [resultCount, batchSize, loadMoreThreshold],
    );

    return {
        visibleResultCount,
        resetVisibleResults,
        showResult,
        handleContentScroll,
    };
}
