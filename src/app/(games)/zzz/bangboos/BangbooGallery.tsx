"use client";

// Component imports
import InfoGallery, { useInfoGallery } from "@/components/InfoGallery";
import { ZZZBangbooInfoCard } from "@/components/InfoCard";

// Helper imports
import { categories } from "@/data/categories";
import sortItems from "@/helpers/_sort/zzz";

// Type imports
import { ZZZBangboo } from "@/types/zzz";

export default function BangbooGallery(props: { bangboo: ZZZBangboo[] }) {
    const { params, gallery } = useInfoGallery({
        game: "zzz",
        galleryKey: "zzz/bangboos", // Pathname
        items: props.bangboo,
        views: {
            icon: (bangboo) => (
                <ZZZBangbooInfoCard key={bangboo.id} bangboo={bangboo} />
            ),
        },
        transformItems: (items, { searchValue }) =>
            filterBangboo(
                sortItems({
                    items,
                    value: "version",
                    reverse: false,
                }),
                searchValue,
            ),
    });

    return (
        <InfoGallery
            title={categories["zzz/bangboos"]}
            buttonKeys={[]}
            hideFilters
            {...params}
        >
            {gallery}
        </InfoGallery>
    );
}

function filterBangboo(bangboo: ZZZBangboo[], searchValue: string) {
    let res = [...bangboo];
    if (searchValue !== "") {
        res = res.filter(
            (item) =>
                item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                item.displayName
                    .toLowerCase()
                    .includes(searchValue.toLowerCase()),
        );
    }
    return res;
}
