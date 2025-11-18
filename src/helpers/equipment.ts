import { Equipment } from "@/types/equipment";

export function filterEquipment(items: Equipment[], searchValue: string) {
    if (searchValue !== "") {
        return items.filter(
            (item) =>
                item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                item.displayName
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())
        );
    } else return items;
}
