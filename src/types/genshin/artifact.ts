import { Equipment } from "../equipment";

export interface GenshinArtifact extends Equipment {
    setEffect: Pick<Equipment["setEffect"], "1" | "2" | "4">;
}
