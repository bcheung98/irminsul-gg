import { getMaterialIcon } from "./og";
import { range, toTitleCase } from "@/utils";
import { getSupportCardRarityColor } from "@/helpers/uma/rarityColors";
import { rarityMap } from "@/data/uma/common";
import { supportEffects } from "@/data/uma/supportEffects";
import { AttributeData, Game } from "@/types";
import { Materials } from "@/types/materials";
import { UmaSpecialty } from "@/types/uma";
import { UmaCharacterAptitude, UmaCharacterStats } from "@/types/uma/character";
import { SupportEffect, SupportPerks } from "@/types/uma/support";
import {
    TCharacterStats,
    TWeaponStats,
} from "@/components/StatsDisplay/StatsDisplay.types";
import { getStats } from "@/components/StatsDisplay/StatsDisplay.utils";

export function Root({
    children,
    gap = 8,
    gridTemplateColumns = "40% auto",
}: {
    children?: React.ReactNode;
    gap?: number;
    gridTemplateColumns?: React.CSSProperties["gridTemplateColumns"];
}) {
    return (
        <div tw="flex h-full w-full text-sky-50 bg-[url(https://assets.irminsul.gg/v2/_common/images/Irminsul.png)] bg-position-[20%]">
            <div tw="absolute bottom-0 w-full h-24 bg-sky-950 rounded-sm blur-3xl" />
            <div tw="h-full w-full relative overflow-hidden">
                <div
                    tw={`grid gap-${gap} h-full font-[300] font-[Rowdies]`}
                    style={{ gridTemplateColumns }}
                >
                    {children}
                </div>
            </div>
            <div tw="flex gap-2 absolute bottom-2 right-5 items-center">
                <img
                    src="https://assets.irminsul.gg/v2/_common/logo/logo_red.png"
                    tw="size-[48px]"
                />
                <h6 tw="m-0 text-3xl text-white tracking-[0.1rem] font-[400] font-[RowdiesBold]">
                    IRMINSUL.GG
                </h6>
            </div>
        </div>
    );
}

interface TitleProps {
    title?: string;
}

export function Title({ title = "" }: TitleProps) {
    const textSize = title.length > 13 ? "4xl" : "5xl";
    return (
        <h1
            tw={`text-${textSize} font-[300] mb-0 text-white whitespace-pre-wrap`}
        >
            {title}
        </h1>
    );
}

export function Subtitle({ title = "" }: TitleProps) {
    return (
        <h2 tw="text-2xl font-[300] mb-0 text-white whitespace-pre-wrap">
            {title}
        </h2>
    );
}

interface SplashProps {
    game: Game;
    img: string;
    size?: number;
}

export function Splash({ game, img, size = 630 }: SplashProps) {
    const url = () => {
        switch (game) {
            case "wuwa":
                return `https://assets.irminsul.gg/v2/${img}_card.png`;
            case "uma":
                return `https://assets.irminsul.gg/v2/${img}.png`;
            case "genshin":
            case "hsr":
            case "zzz":
            case "endfield":
            case "nte":
            default:
                return `https://assets.irminsul.gg/v2/${img}_splash.png`;
        }
    };

    return (
        <div>
            <img
                src={url()}
                style={{
                    width: "100%",
                    height: `${size}px`,
                    objectFit: "cover",
                    overflowClipMargin: "unset",
                }}
            />
        </div>
    );
}

export function SplashMini({ game, img, size = 256 }: SplashProps) {
    const url = () => {
        switch (game) {
            case "hsr":
                return `https://assets.irminsul.gg/v2/${img}_card.png`;
            case "genshin":
            case "wuwa":
            case "zzz":
            case "uma":
            case "endfield":
            case "nte":
            default:
                return `https://assets.irminsul.gg/v2/${img}.png`;
        }
    };

    return (
        <div tw="pl-12 pt-12">
            <img
                src={url()}
                style={{
                    width: `${size}px`,
                    height: "auto",
                }}
            />
        </div>
    );
}

interface ChipProps {
    img?: string;
    title?: string;
}

export function ChipRow({ chips }: { chips: ChipProps[] }) {
    return (
        <div tw="flex items-center gap-4 -mt-4">
            {chips.map((chip, index) => (
                <Chip key={index} {...chip} />
            ))}
        </div>
    );
}

export function Chip({ img, title }: ChipProps) {
    return (
        <div tw="flex items-center justify-center bg-black px-5 py-1 h-12 rounded-full border border-zinc-500/20 gap-4">
            {img && (
                <img
                    src={`https://assets.irminsul.gg/v2/${img}.png`}
                    alt={title}
                    tw="w-8 h-8"
                />
            )}
            <span tw="text-white text-2xl font-[300]">{title}</span>
        </div>
    );
}

export function Stats({
    game,
    stats,
    attributes,
}: {
    game: Game;
    stats: TCharacterStats | TWeaponStats;
    attributes: AttributeData;
}) {
    const { data } = getStats({ game, stats, attributes });
    const rows = data.filter((row) => row[0] !== "Level");

    return (
        <div tw="flex flex-col gap-2 bg-[#0a2a52] px-4 py-2 rounded-lg">
            <div>
                <span tw="text-white text-xl font-[300]">Stats</span>
                <div tw="border border-[#a89369] w-full my-1" />
            </div>
            <div tw="flex flex-col gap-2">
                {rows.map((row, i) => (
                    <div
                        key={i}
                        tw="flex gap-1 flex-wrap w-full w-max-[400px] items-center justify-between px-2 py-1 rounded-md bg-[#203860]"
                    >
                        <div tw="flex gap-1 items-center">
                            <img
                                src={`https://assets.irminsul.gg/v2/${`${row[0]}`.split("|")[1]}.png`}
                                alt={`${row[0]}`.split("|")[1]}
                                tw="size-[24px]"
                            />
                            <span tw="text-white text-xl font-[300]">
                                {`${row[0]}`.split("|")[0]}
                            </span>
                        </div>
                        <span tw="text-white text-xl font-[300]">
                            {row.slice(-1)[0]}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function MaterialGrid({
    game,
    materials,
    type,
}: {
    game: Game;
    materials: Materials;
    type: "character" | "weapon";
}) {
    let imgs = Object.entries(materials).map(([category, material]) =>
        getMaterialIcon({ game, type, material, category }),
    );
    return (
        <div tw="flex flex-col gap-2 bg-[#0a2a52] px-4 py-2 rounded-lg">
            <div>
                <span tw="text-white text-xl font-[300]">
                    Ascension Materials
                </span>
                <div tw="border border-[#a89369] w-full my-1" />
            </div>
            <div tw={`grid grid-cols-3 gap-x-0 gap-y-4`}>
                {imgs.map((material, index) => (
                    <img
                        key={index}
                        src={`https://assets.irminsul.gg/v2/${material}.png`}
                        alt={material}
                        tw="size-[64px] p-1 rounded-lg border border-[#a89369] bg-[#203860]"
                    />
                ))}
            </div>
        </div>
    );
}

export function UmaCharStats({
    stats,
    attributes,
}: {
    stats: UmaCharacterStats;
    attributes: AttributeData;
}) {
    const { rarity = 3 } = attributes;
    const levels = range(rarity, 5).map((i) => i);

    const title = (stat: keyof UmaCharacterStats) => {
        let res = toTitleCase(stat);
        return `${res}|uma/icons/specialties/${toTitleCase(stat)}`;
    };

    const data = Object.entries(stats).map(([stat, values]) => [
        title(stat as keyof UmaCharacterStats),
        ...levels.map((_, index) => values[index]),
    ]);

    function TableCell({ label }: { label: string }) {
        const [title, icon] = label.split("|");
        return (
            <th
                scope="col"
                tw="inline-flex w-30 h-12 p-2 align-center justify-center"
            >
                {icon && (
                    <div>
                        <img
                            src={`https://assets.irminsul.gg/v2/${icon}.png`}
                            alt={title}
                            tw="w-7 h-7"
                        />
                    </div>
                )}
                <div>
                    <span tw="block text-lg font-[300] ml-2">{title}</span>
                </div>
            </th>
        );
    }

    function TableHead({ data }: { data: (string | number)[] }) {
        return (
            <thead>
                <tr tw="inline-block bg-slate-950/90 rounded-tl-lg rounded-tr-lg">
                    {data.map((column, index) => (
                        <TableCell key={index} label={`${column}`} />
                    ))}
                </tr>
            </thead>
        );
    }

    return (
        <div tw="w-500">
            <table tw="inline-flex flex-col">
                <TableHead data={data.map((stat) => stat[0])} />
                <tbody>
                    <tr tw="inline-block bg-[#0a2a52] border-y-1 border-b-zinc-500">
                        {data.map((stat, index) => (
                            <td
                                key={index}
                                tw="inline-flex w-30 py-1 justify-center"
                            >
                                <span tw="block text-3xl font-[300]">{`${stat[1]}`}</span>
                            </td>
                        ))}
                    </tr>
                </tbody>
                <tfoot>
                    <tr tw="inline-block bg-[#0a2a52] rounded-bl-lg rounded-br-lg">
                        {Object.entries(stats).map(([stat, values]) => (
                            <td
                                key={stat}
                                tw="inline-flex w-30 py-2 justify-center"
                            >
                                <span tw="block text-md font-[300]">{`${values.slice(-1)[0]}%`}</span>
                            </td>
                        ))}
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}

export function UmaCharAptitude({
    aptitude,
}: {
    aptitude: UmaCharacterAptitude;
}) {
    return (
        <div tw="flex flex-col gap-2 p-2 w-[600px] bg-[#0a2a52] rounded-lg">
            {Object.entries(aptitude).map(([category, values]) => (
                <div tw="grid grid-cols-12 gap-1 items-center">
                    <div tw="col-span-3 text-md font-[300] text-center">
                        {formatTitle(category)}
                    </div>
                    <div tw="col-span-9">
                        <div tw="flex gap-2">
                            {Object.entries(values).map(([apt, rank]) => (
                                <div
                                    key={apt}
                                    tw="p-1 bg-[#203860] w-[96px] rounded-sm"
                                >
                                    <div tw="flex gap-1 items-center justify-around">
                                        <span tw="text-md font-[300]">
                                            {formatTitle(apt)}
                                        </span>
                                        <img
                                            src={`https://assets.irminsul.gg/v2/uma/ranks/${rank}.png`}
                                            alt={apt}
                                            tw="w-5 h-5"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export function UmaSupportImage({
    id = 10001,
    rarity = 1,
    specialty = "Guts",
}: {
    id?: number;
    rarity?: number;
    specialty?: UmaSpecialty;
}) {
    const supportImageStyle = (rarity: number) => ({
        display: "flex",
        overflow: "clip",
        borderRadius: "16px",
        width: "auto",
        backgroundColor: "transparent",
        border: "6px solid transparent",
        backgroundImage: `linear-gradient(transparent, transparent), ${getSupportCardRarityColor(
            rarity,
        )}`,
    });

    return (
        <div tw="relative overflow-visible p-4">
            <div style={supportImageStyle(rarity)}>
                <img
                    src={`https://assets.irminsul.gg/v2/uma/supports/${id}.png`}
                    alt={`${id}`}
                    tw="w-full"
                />
            </div>
            <div tw="absolute z-5 top-4 left-7 w-1/5">
                <img
                    src={`https://assets.irminsul.gg/v2/uma/rarity/${rarityMap[rarity]}.png`}
                    alt={rarityMap[rarity]}
                    tw="w-full"
                />
            </div>
            <div tw="absolute flex z-5 top-4 right-5 justify-right w-1/5">
                <img
                    src={`https://assets.irminsul.gg/v2/uma/icons/specialties/${specialty}.png`}
                    alt={rarityMap[rarity]}
                    tw="w-full rounded-lg"
                />
            </div>
        </div>
    );
}

export function UmaSupportPerks({ perks }: { perks: SupportPerks }) {
    const uniqueEffects = perks.description
        ? perks.description.map((desc) => desc).join(" and ")
        : perks.effects.map((effect) => effect.effect).join(" and ");

    if (uniqueEffects.length > 0) {
        return (
            <div tw="flex flex-col gap-2 w-full max-w-[500px] mb-4">
                <div tw="flex gap-x-0 gap-y-1 flex-wrap justify-between">
                    <div tw="flex flex-col bg-slate-950/90 px-5 rounded-xl border border-zinc-500/20 py-2">
                        <span tw="text-white text-xl font-[300]">
                            Unique Perk
                        </span>
                        <div tw="border border-[#a89369] w-full my-2" />
                        <span tw="text-white text-md font-[300]">
                            {uniqueEffects}
                        </span>
                    </div>
                </div>
            </div>
        );
    } else return <></>;
}

export function UmaSupportEffects({
    effects,
    attributes,
}: {
    effects: SupportEffect[];
    attributes: AttributeData;
}) {
    const maxLevel: Record<number, string> = {
        5: "50",
        4: "45",
        3: "40",
    };

    return (
        <div tw="flex flex-col bg-[#0a2a52] px-5 rounded-xl border border-zinc-500/20 py-2 w-95/100">
            <span tw="text-white text-xl font-[300]">
                {`Support Effects (Lvl ${maxLevel[attributes.rarity || 3]})`}
            </span>
            <div tw="border border-[#a89369] w-full my-2" />
            <div tw="grid grid-cols-3 gap-2">
                {effects.map((effect, index) => (
                    <UmaSupportEffect key={index} effect={effect} />
                ))}
            </div>
        </div>
    );
}

function UmaSupportEffect(props: { effect: SupportEffect }) {
    const getEffect = (tag: string | number) =>
        supportEffects.find(
            (effect) => effect.id === tag || effect.name === tag,
        );

    const getEffectValue = (effect: SupportEffect) => {
        const value = effect.values.slice(-1)[0];
        let valueText = value.toString();
        if (
            [
                "Friendship Bonus",
                "Mood Effect",
                "Training Effectiveness",
                "Race Bonus",
                "Fan Bonus",
                "Hint Frequency",
                "Event Recovery",
                "Event Effectiveness",
                "Failure Protection",
                "Energy Cost Reduction",
                "All Stats Bonus",
            ].includes(effect.effect)
        ) {
            valueText += "%";
        }
        if (effect.effect === "Hint Levels") {
            valueText = `Lvl ${value}`;
        }
        return <span tw="text-white text-md font-[300]">{valueText}</span>;
    };

    const effect = getEffect(props.effect.effect);
    if (!effect) return null;

    return (
        <div tw="flex gap-1 flex-wrap w-full w-max-[400px] items-center justify-between p-1 rounded-md bg-[#203860]">
            <div tw="flex gap-1">
                <svg
                    focusable="false"
                    style={{
                        color: "#ffee9d",
                        fill: "currentColor",
                        width: "18px",
                        height: "18px",
                    }}
                >
                    <path d="m19 9 1.25-2.75L23 5l-2.75-1.25L19 1l-1.25 2.75L15 5l2.75 1.25zm-7.5.5L9 4 6.5 9.5 1 12l5.5 2.5L9 20l2.5-5.5L17 12zM19 15l-1.25 2.75L15 19l2.75 1.25L19 23l1.25-2.75L23 19l-2.75-1.25z"></path>
                </svg>
                <span tw="text-white text-md font-[300]">
                    {effect.displayName}
                </span>
            </div>
            {getEffectValue(props.effect)}
        </div>
    );
}

function formatTitle(apt: string) {
    switch (apt) {
        case "short":
            return "Sprint";
        case "surface":
            return "Track";
        case "distance":
            return "Distance";
        case "strategy":
            return "Style";
        default:
            return toTitleCase(apt);
    }
}
