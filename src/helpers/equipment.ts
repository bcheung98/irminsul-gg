import { Equipment } from "@/types/equipment";

export function filterEquipment(
    items: Equipment[],
    searchValue: string,
    type?: string
) {
    let res = [...items];
    if (type && type !== "all") {
        res = res.filter((item) =>
            item.pieces.map((piece) => piece.type).includes(type)
        );
    }
    if (searchValue !== "") {
        res = res.filter(
            (item) =>
                item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
                item.displayName
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())
        );
    }
    return res;
}
