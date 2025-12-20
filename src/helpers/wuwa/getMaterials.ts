import { isUnreleasedContent } from "@/helpers/isUnreleasedContent";
import { wuwaMaterials } from "@/data/wuwa/materials";
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
    let materials = wuwaMaterials;
    if (hideUnreleasedContent) {
        materials = materials.filter((material) =>
            isUnreleasedContent(material.release.version, "wuwa")
        );
    }
    return materials;
}

export function getWuWaMaterial(hideUnreleasedContent = false) {
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

export function getWuWaMaterialCategory(hideUnreleasedContent = false) {
    let materials = getMaterials(hideUnreleasedContent);
    return (category: string) => {
        return materials.filter((material) => material.category === category);
    };
}
