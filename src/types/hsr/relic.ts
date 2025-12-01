import { Equipment } from "../equipment";

export interface HSRRelic extends Equipment {
    setEffect: Pick<Equipment["setEffect"], "2" | "4">;
}
