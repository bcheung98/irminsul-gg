import Image from "@/components/Image";
import { Filters } from "@/types";

export function createFilterButtons<T extends string>(
    items: readonly T[],
    url: string
) {
    return items.map((item) => ({
        value: item,
        icon: url && (
            <Image
                src={`${url}/${item}`}
                alt={`${item}`}
                style={{ width: "32px", padding: "4px", borderRadius: "4px" }}
                tooltip={item}
            />
        ),
    }));
}

export function filterItems<T extends Record<string, any>>(
    items: T[],
    filters?: Filters,
    searchValue = ""
) {
    if (!filters) return items;
    if (filters.element.length > 0) {
        items = items.filter((item) => filters.element.includes(item.element));
    }
    if (searchValue) {
        items = items.filter(
            (item) =>
                item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                item.displayName
                    .toLowerCase()
                    .includes(searchValue.toLowerCase()) ||
                item.fullName.toLowerCase().includes(searchValue.toLowerCase())
        );
    }
    
    return items;
}
