import { Server } from "@/types";

export const history = [
    "pre_aoharu",
    "pre_first_anni",
    "pre_mant",
    "pre_gl",
    "pre_nar",
    "pre_2nd_anni",
    "pre_2_5th_anni",
    "pre_3rd_anni",
    "pre_gff",
    "pre_2024_wedding",
    "pre_mecha",
    "pre_tl",
    "pre_dyi",
    "pre_sp_removal",
    "pre_yhs",
    "pre_santa_anita",
    "pre_breeders",
    "present",
];

export const currentPeriod: Record<Server, string> = {
    NA: "pre_2_5th_anni",
    EU: "",
    Asia: "present",
};

export const didNotExist = (server: Server, period?: string) => {
    if (period) {
        return history.indexOf(currentPeriod[server]) > history.indexOf(period);
    }
    return true;
};
