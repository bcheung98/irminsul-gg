import { GalleryState, useGalleryStore } from "@/stores/useGalleryStore";
import type { GalleryView } from "@/types";

export function useView(key: keyof GalleryState) {
    const setGalleryState = useGalleryStore((state) => state.setGalleryState);
    const handleView = (_: React.BaseSyntheticEvent, view: GalleryView) => {
        if (view !== null) {
            setGalleryState(key, "view", view);
        }
    };
    return handleView;
}
