import {
    ChipRow,
    MaterialGrid,
    Root,
    Splash,
    SplashMini,
    Subtitle,
    Title,
    UmaCharAptitude,
    UmaCharStats,
    UmaSupportEffects,
    UmaSupportImage,
    UmaSupportPerks,
    Stats,
} from "./components";
import { range } from "@/utils";
import { urls } from "@/api";
import { getDataIconURL } from "@/helpers/dataIcon";
import { AttributeData, Game } from "@/types";
import { Materials } from "@/types/materials";
import { UmaCharacterAptitude, UmaCharacterStats } from "@/types/uma/character";
import { SupportEffect, SupportPerks } from "@/types/uma/support";
import { UmaSpecialty } from "@/types/uma";
import {
    TCharacterStats,
    TWeaponStats,
} from "@/components/StatsDisplay/StatsDisplay.types";

export function Default() {
    return (
        <div
            tw="flex h-full w-full flex-col justify-center p-10"
            style={{
                backgroundImage:
                    "url(https://assets.irminsul.gg/v2/_common/images/Irminsul.png)",
                backgroundPosition: "20%",
            }}
        >
            <div tw="flex gap-2">
                <img
                    src="https://assets.irminsul.gg/v2/_common/logo/logo_red.png"
                    style={{ width: "140px", height: "140px" }}
                />
                <div tw="flex flex-col">
                    <h1 tw="m-0 text-8xl font-[400] text-white filter drop-shadow-md">
                        IRMINSUL.GG
                    </h1>
                    <h1 tw="m-0 mt-2 text-4xl font-[300] text-[#002b7c] filter drop-shadow-md">
                        Gacha Game Database and Tools
                    </h1>
                </div>
            </div>
        </div>
    );
}

interface Props {
    tag: keyof typeof urls;
    attributes: AttributeData;
    materials: Materials;
}

interface CharacterProps extends Props {
    stats: TCharacterStats;
}

export function Character({
    tag,
    stats,
    attributes,
    materials,
}: CharacterProps) {
    const game = tag.split("/")[0] as Game;

    const chips = [
        {
            title: range(attributes.rarity || 3)
                .map((_) => "⭐")
                .join(""),
        },
        {
            img: getDataIconURL({
                game,
                key: "element",
                value: attributes.element,
            }).src,
            title: attributes.element,
        },
        game === "endfield"
            ? {
                  img: getDataIconURL({
                      game,
                      key: "specialty",
                      value: attributes.specialty,
                  }).src,
                  title: attributes.specialty,
              }
            : {
                  img: getDataIconURL({
                      game,
                      key: "weaponType",
                      value: attributes.weaponType,
                  }).src,
                  title: attributes.weaponType,
              },
    ];

    if (game === "zzz") {
        materials = {
            ...{
                characterLevel: `Character${attributes.weaponType}3`,
                characterSkill: `${attributes.element}3`,
            },
            ...materials,
        };
    }

    return (
        <Root>
            <Splash game={game} img={`${tag}/${attributes.id}`} />
            <div tw="flex flex-col gap-6">
                <div tw="flex flex-col">
                    <Title title={attributes.displayName} />
                    {attributes.title && (
                        <i tw="-mt-4">
                            <Subtitle title={attributes.title} />
                        </i>
                    )}
                </div>
                <ChipRow chips={chips} />
                <div tw="grid grid-cols-2 gap-6">
                    <div tw="col-span-1">
                        <Stats
                            game={game}
                            stats={stats}
                            attributes={attributes}
                        />
                    </div>
                    <div tw="col-span-1 w-9/10">
                        <MaterialGrid
                            game={game}
                            materials={materials}
                            type="character"
                        />
                    </div>
                </div>
            </div>
        </Root>
    );
}

interface WeaponProps extends Props {
    stats: TWeaponStats;
}

export function Weapon({ tag, stats, attributes, materials }: WeaponProps) {
    const game = tag.split("/")[0] as Game;

    if (game === "zzz") {
        materials = {
            ...{
                weaponLevel: `Weapon${attributes.weaponType}3`,
            },
            ...materials,
        };
    }

    return (
        <Root gap={2} gridTemplateColumns="30% auto">
            <SplashMini game={game} img={`${tag}/${attributes.id}`} />
            <div tw="flex flex-col gap-6">
                <div tw="flex flex-col">
                    <Title title={attributes.displayName} />
                </div>
                <ChipRow
                    chips={[
                        {
                            title: range(attributes.rarity || 3)
                                .map((_) => "⭐")
                                .join(""),
                        },
                        {
                            img: getDataIconURL({
                                game,
                                key: "weaponType",
                                value: attributes.weaponType,
                            }).src,
                            title: attributes.weaponType,
                        },
                    ]}
                />
                <div tw="w-1/2">
                    <Stats game={game} stats={stats} attributes={attributes} />
                </div>
                {/* <MaterialGrid game={game} materials={materials} type="weapon" /> */}
            </div>
        </Root>
    );
}

type UmaCharacterProps = Omit<Props, "materials"> & {
    stats: UmaCharacterStats;
    aptitude: UmaCharacterAptitude;
};

type UmaSupportProps = Omit<Props, "materials"> & {
    perks: SupportPerks;
    supportEffects: SupportEffect[];
};

export function UmaCharacter({
    tag,
    attributes,
    stats,
    aptitude,
}: UmaCharacterProps) {
    const game = tag.split("/")[0] as Game;

    const chips = [
        {
            title: range(attributes.rarity || 3)
                .map((_) => "⭐")
                .join(""),
        },
    ];

    return (
        <Root>
            <Splash game={game} img={`${tag}/${attributes.id}`} size={512} />
            <div tw="flex flex-col gap-6">
                <div tw="flex flex-col">
                    <Subtitle title={`[${attributes.title}]`} />
                    <span tw="-mt-8">
                        <Title title={attributes.name} />
                    </span>
                </div>
                <ChipRow chips={chips} />
                <UmaCharStats stats={stats} attributes={attributes} />
                <UmaCharAptitude aptitude={aptitude} />
            </div>
        </Root>
    );
}

export function UmaSupport({
    attributes,
    perks,
    supportEffects,
}: UmaSupportProps) {
    return (
        <Root gridTemplateColumns="300px auto">
            <UmaSupportImage
                id={attributes.id}
                rarity={attributes.rarity}
                specialty={attributes.specialty as UmaSpecialty}
            />
            <div tw="flex flex-col gap-4">
                <div tw="flex flex-col">
                    <Subtitle title={`[${attributes.title}]`} />
                    <span tw="-mt-8">
                        <Title title={attributes.name} />
                    </span>
                </div>
                <div>
                    <UmaSupportPerks perks={perks} />
                    <UmaSupportEffects
                        effects={supportEffects}
                        attributes={attributes}
                    />
                </div>
            </div>
        </Root>
    );
}
