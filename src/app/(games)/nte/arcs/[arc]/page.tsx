import { Suspense } from "react";

// Component imports
import WeaponPage from "./WeaponPage";
import Loader from "@/components/Loader";
import Page404 from "@/components/Page404";

// Helper imports
import { getData } from "@/lib/fetchData";
import { formatHref } from "@/utils";
import { getMetadata } from "@/helpers/metadata";

// Type imports
import type { Metadata } from "next";
import { NTEWeapon } from "@/types/nte/weapon";

interface Props {
    params: Promise<{ arc: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { arc } = await params;
    const weaponData = await getData<NTEWeapon>(
        "nte/arcs",
        (wep) => formatHref(wep.url) === formatHref(arc),
    );

    return weaponData
        ? getMetadata({
              game: "nte",
              tag: "weapons",
              attributes: {
                  id: weaponData.id,
                  name: weaponData.name,
                  displayName: weaponData.displayName,
                  rarity: weaponData.rarity,
                  weaponType: weaponData.weaponType,
                  description: weaponData.description,
              },
          })
        : {};
}

export default async function Page({ params }: Props) {
    const { arc } = await params;
    const weaponData = await getData<NTEWeapon>(
        "nte/arcs",
        (wep) => formatHref(wep.url) === formatHref(arc),
    );

    if (!weaponData) {
        return <Page404 />;
    }

    return (
        <Suspense fallback={<Loader />}>
            <WeaponPage weapon={weaponData} />
        </Suspense>
    );
}
