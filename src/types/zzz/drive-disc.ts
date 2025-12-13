import { Equipment } from "../equipment";

export interface ZZZDriveDisc extends Omit<Equipment, "pieces"> {
    setEffect: Pick<Equipment["setEffect"], "2" | "4">;
}
