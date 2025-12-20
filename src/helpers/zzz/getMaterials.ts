import { isUnreleasedContent } from "@/helpers/isUnreleasedContent";
import { zzzMaterials } from "@/data/zzz/materials";
import { Material } from "@/types/materials";

const defaultMaterial: Material = {
    id: 0,
    name: "?",
    category: "",
    rarity: 3,
    release: {
        version: "1.0",
    },
};

function getMaterials(hideUnreleasedContent: boolean) {
    let materials = zzzMaterials;
    if (hideUnreleasedContent) {
        materials = materials.filter((material) =>
            isUnreleasedContent(material.release.version, "zzz")
        );
    }
    return materials;
}

export function getZZZMaterial(hideUnreleasedContent = false) {
    let materials = getMaterials(hideUnreleasedContent);
    return (material: string | number) => {
        if (typeof material === "number") {
            return (
                materials.find((mat) => mat.id === material) || defaultMaterial
            );
        } else {
            return (
                materials.find(
                    (mat) => mat.name === material || mat.tag === material
                ) || defaultMaterial
            );
        }
    };
}

export function getZZZMaterialCategory(hideUnreleasedContent = false) {
    let materials = getMaterials(hideUnreleasedContent);
    return (category: string) => {
        return materials.filter((material) => material.category === category);
    };
}
