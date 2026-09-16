"use client";

// Component imports
import InfoGallery, { useInfoGallery } from "@/components/InfoGallery";
import { UmaSupportInfoCard } from "@/components/InfoCard";
import SupportList from "./SupportList";

// Helper imports
import { categories } from "@/data/categories";

// Type imports
import { UmaSupport } from "@/types/uma";

export default function SupportGallery(props: { supports: UmaSupport[] }) {
    const { params, gallery } = useInfoGallery({
        game: "uma",
        galleryKey: "uma/supports", // Pathname
        filterKey: "uma/supports", // Data tag
        items: props.supports,
        views: {
            icon: (support) => (
                <UmaSupportInfoCard key={support.id} support={support} />
            ),
            list: (supports, isPending) => (
                <SupportList supports={supports} loading={isPending} />
            ),
        },
    });

    return (
        <InfoGallery
            title={categories["uma/supports"]}
            buttonKeys={["icon", "list"]}
            {...params}
        >
            {gallery}
        </InfoGallery>
    );
}
