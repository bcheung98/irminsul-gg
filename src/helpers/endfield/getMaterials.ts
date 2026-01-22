import { isUnreleasedContent } from "@/helpers/isUnreleasedContent";
import { endfieldMaterials } from "@/data/endfield/materials";
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
    let materials = endfieldMaterials;
    if (hideUnreleasedContent) {
        materials = materials.filter((material) =>
            isUnreleasedContent(material.release.version, "endfield")
        );
    }
    return materials;
}

export function getEndfieldMaterial(hideUnreleasedContent = false) {
    let materials = getMaterials(hideUnreleasedContent);
    return (material: string | number) => {
        if (`${material}`.includes("_")) {
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

export function getEndfieldMaterialCategory(hideUnreleasedContent = false) {
    let materials = getMaterials(hideUnreleasedContent);
    return (category: string) => {
        return materials.filter((material) => material.category === category);
    };
}
