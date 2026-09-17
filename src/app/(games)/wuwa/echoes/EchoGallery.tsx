"use client";

// Component imports
import InfoGallery, { useInfoGallery } from "@/components/InfoGallery";
import { WuWaEchoInfoCard } from "@/components/InfoCard";
import EchoList from "./EchoList";

// Helper imports
import { categories } from "@/data/categories";

// Type imports
import { WuWaEcho } from "@/types/wuwa";

export default function EchoGallery(props: { echoes: WuWaEcho[] }) {
    const { params, gallery } = useInfoGallery({
        game: "wuwa",
        galleryKey: "wuwa/echoes", // Pathname
        filterKey: "wuwa/echoes", // Data tag
        items: props.echoes,
        views: {
            icon: (echo) => <WuWaEchoInfoCard key={echo.id} echo={echo} />,
            list: (echoes, isPending) => (
                <EchoList echoes={echoes} loading={isPending} />
            ),
        },
    });

    return (
        <InfoGallery
            title={categories["wuwa/equipment"]}
            buttonKeys={["icon", "list"]}
            {...params}
        >
            {gallery}
        </InfoGallery>
    );
}
