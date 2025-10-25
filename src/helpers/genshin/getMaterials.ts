import { isUnreleasedContent } from "@/helpers/isUnreleasedContent";
import { genshinMaterials } from "@/data/genshin/materials";
import { GenshinMaterialCategory } from "@/types/genshin/materials";
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
    let materials = genshinMaterials;
    if (hideUnreleasedContent) {
        materials = materials.filter((material) =>
            isUnreleasedContent(material.release.version, "genshin")
        );
    }
    return materials;
}

export function getGenshinMaterial(hideUnreleasedContent = false) {
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

export function getGenshinMaterialCategory(hideUnreleasedContent = false) {
    let materials = getMaterials(hideUnreleasedContent);
    return (category: GenshinMaterialCategory) => {
        return materials.filter((material) => material.category === category);
    };
}
