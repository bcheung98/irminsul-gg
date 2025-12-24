// Type imports
import { Banner, BannerProps, BannerType } from "@/types/banner";
import { Game, Server } from "@/types";

export function getBannerData(
    banners: BannerProps,
    game: Game,
    server: Server
) {
    const res: BannerProps = {
        character: [],
        weapon: [],
    };
    Object.entries(banners).forEach(
        ([key, value]) =>
            (res[key as BannerType] = value.filter((banner: Banner) => {
                if (game === "uma" && server === "NA")
                    return banner.start !== "";
                else return banner;
            }))
    );
    return res;
}
