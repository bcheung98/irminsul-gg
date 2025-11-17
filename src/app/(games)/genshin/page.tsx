import { Suspense } from "react";

// Component imports
import GenshinHome from "./Home";
import Loader from "@/components/Loader";

// Helper imports
import { getDataSet } from "@/lib/fetchData";

// Type imports
import { GenshinCharacter } from "@/types/genshin/character";
import { GenshinWeapon } from "@/types/genshin/weapon";

export default async function Page() {
    const characters = await getDataSet<GenshinCharacter>("genshin/characters");
    const weapons = await getDataSet<GenshinWeapon>("genshin/weapons");

    return (
        <Suspense fallback={<Loader />}>
            <GenshinHome characters={characters} weapons={weapons} />
        </Suspense>
    );
}
