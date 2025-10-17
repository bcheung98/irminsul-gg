import { isUreleasedContent } from "@/helpers/isUnreleasedContent";
import { genshinMaterials } from "@/data/genshin/materials";
import { Material } from "@/types/materials";
import { GenshinMaterialCategory } from "@/types/genshin/materials";

export interface GenshinMaterialProps {
    id?: number;
    category?: GenshinMaterialCategory;
    string?: string;
}

export default function getMaterials(showUnreleasedContent = true) {
    let materials = genshinMaterials;
    if (!showUnreleasedContent) {
        materials = materials.filter((material) =>
            isUreleasedContent(material.release.version, "genshin")
        );
    }
    return ({
        id,
        category,
        string,
    }: GenshinMaterialProps): (Material | undefined)[] => {
        if (id) {
            return materials.filter((material) => material.id === id);
        } else if (category) {
            return materials.filter(
                (material) => material.category === category
            );
        } else {
            return materials.filter(
                (material) =>
                    material.name === string || material.tag === string
            );
        }
    };
}
