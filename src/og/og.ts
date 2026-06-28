import { useMaterials } from "@/helpers/materials";
import { Game, GameData } from "@/types";

export const size = {
    width: 1200,
    height: 630,
};

export const contentType = "image/png";

export const fonts = [
    // {
    //     name: "Geist",
    //     data: () =>
    //         fetch(
    //             "https://fonts.gstatic.com/s/geist/v5/gyByhwUxId8gMEwcGFU.woff2",
    //         ).then((r) => r.arrayBuffer()),
    // },
    {
        name: "Rowdies",
        data: () =>
            fetch(
                "https://fonts.gstatic.com/s/rowdies/v19/ptRMTieMYPNBAK219hth1On4KA.woff2",
            ).then((r) => r.arrayBuffer()),
    },
    {
        name: "RowdiesBold",
        data: () =>
            fetch(
                "https://fonts.gstatic.com/s/rowdies/v19/ptRJTieMYPNBAK21_rBDwQ.woff2",
            ).then((r) => r.arrayBuffer()),
    },
];

export function getMaterialIcon(props: {
    game: Game;
    type: "character" | "weapon";
    material: string | number;
    category: string;
}) {
    const nums: GameData<string> = {
        genshin: "3",
        hsr: "3",
        wuwa: "4",
        zzz: "3",
        uma: "",
        endfield: "",
        nte: "3",
    };
    let materialTag = props.material;
    if (
        [
            "talent",
            "calyx",
            "forgery",
            "common",
            "skill",
            "weapon",
            "elite",
        ].includes(props.category)
    ) {
        if (props.game === "genshin" && props.category === "weapon") {
            materialTag += "4";
        } else {
            materialTag += nums[props.game];
        }
    }

    const material = useMaterials()[props.game](materialTag);

    return `${props.game}/materials/${material.id}`;
}
