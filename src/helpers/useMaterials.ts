import genshinMaterials, {
    GenshinMaterialProps,
} from "@/helpers/genshin/getMaterials";
import { Material } from "@/types/materials";

export function useMaterials(showUnreleasedContent = true): {
    [game: string]: ({
        id,
        category,
        string,
    }: GenshinMaterialProps) => (Material | undefined)[];
} {
    return {
        genshin: genshinMaterials(showUnreleasedContent),
    };
}
