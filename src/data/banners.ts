import { ToggleButtonProps } from "@/components/ToggleButtons/ToggleButtons.types";
import { GameData } from "@/types";

export const banners: GameData<ToggleButtonProps[]> = {
    genshin: [
        {
            value: "all",
            label: "All",
        },
        {
            value: "character",
            label: "Character",
        },
        {
            value: "weapon",
            label: "Weapon",
        },
        {
            value: "chronicled",
            label: "Chronicled",
        },
    ],
    hsr: [
        {
            value: "character",
            label: "Character",
        },
        {
            value: "weapon",
            label: "Light Cone",
        },
    ],
    wuwa: [
        {
            value: "character",
            label: "Resonator",
        },
        {
            value: "weapon",
            label: "Weapon",
        },
    ],
    zzz: [
        {
            value: "character",
            label: "Agent",
        },
        {
            value: "weapon",
            label: "W-Engine",
        },
    ],
    uma: [
        {
            value: "character",
            label: "Character",
        },
        {
            value: "weapon",
            label: "Support Card",
        },
    ],
};
