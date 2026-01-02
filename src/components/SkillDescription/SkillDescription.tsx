import parse, {
    HTMLReactParserOptions,
    Element as DOMElement,
    domToReact,
    DOMNode,
} from "html-react-parser";

// Component imports
import Image from "@/components/Image";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// Helper imports
import { useTextColor } from "@/helpers/styles";
import { toTitleCase } from "@/utils";

// Type imports
import { AttributeData, Game } from "@/types";

export default function SkillDescription({
    game,
    description,
    attributes,
    targetClassName = "text-value",
    newClassName,
    onClick,
    disableLink = false,
    index = 0,
}: {
    game?: Game;
    description: string;
    attributes?: AttributeData;
    targetClassName?: string;
    newClassName?: string;
    onClick?: (event: React.BaseSyntheticEvent) => void;
    disableLink?: boolean;
    index?: number;
}) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("sm"));

    const textColor = useTextColor(theme.text);

    function getClassName(className: string) {
        if (
            game === "zzz" &&
            className.startsWith("text-value") &&
            newClassName !== "character-potential-value"
        )
            return `character-skill-value-${index}`;
        return className === targetClassName ? newClassName : className;
    }

    const options: HTMLReactParserOptions = {
        replace: (domNode) => {
            if (domNode instanceof DOMElement && domNode.attribs.class) {
                const className = domNode.attribs.class;
                if (className.split("-")[0].startsWith("text")) {
                    const tag = className.split("-")[1];
                    return (
                        <span
                            className={getClassName(className)}
                            data-index={domNode.attribs["data-index"]}
                            style={{
                                color:
                                    textColor(game, tag) || theme.text.primary,
                                fontWeight:
                                    tag === "highlight"
                                        ? theme.font.weight.highlight
                                        : theme.font.weight.element,
                            }}
                        >
                            {domToReact(domNode.children as DOMNode[], options)}
                        </span>
                    );
                } else if (className.split("-")[0].startsWith("tooltip")) {
                    const tag = className.split("-")[1];
                    return (
                        <span
                            className={className}
                            data-tag={domNode.attribs["data-tag"]}
                            style={{
                                color:
                                    textColor(game, tag) || theme.text.primary,
                                fontWeight: theme.font.weight.highlight,
                                textDecoration: !disableLink
                                    ? "underline"
                                    : "none",
                                cursor: !disableLink ? "pointer" : "text",
                            }}
                            onClick={onClick}
                        >
                            {domToReact(domNode.children as DOMNode[], options)}
                        </span>
                    );
                } else if (className.split(" ")[0].startsWith("icon")) {
                    const skill = className.split(" ")[1];
                    return (
                        <Image
                            src={
                                game === "genshin"
                                    ? `genshin/tcg/icons/${getGenshinIcon(
                                          skill
                                      )}`
                                    : iconSkillKeys[skill]
                            }
                            style={{
                                verticalAlign: "middle",
                                width: "auto",
                                height: matches
                                    ? `calc(${theme.typography.subtitle1.fontSize} + 0.5rem)`
                                    : `calc(${theme.typography.subtitle1.fontSize} + 0.1rem)`,
                                marginBottom: "1.5px",
                                userSelect: "auto",
                                pointerEvents: "none",
                            }}
                        />
                    );
                }
            }
        },
    };

    let text = description;

    if (game === "genshin") {
        text = description
            .replaceAll(`Icon_PyroDice `, `<span class="icon pyroDice"></span>`)
            .replaceAll(
                `Icon_HydroDice `,
                `<span class="icon hydroDice"></span>`
            )
            .replaceAll(
                `Icon_ElectroDice `,
                `<span class="icon electroDice"></span>`
            )
            .replaceAll(`Icon_CryoDice `, `<span class="icon cryoDice"></span>`)
            .replaceAll(
                `Icon_AnemoDice `,
                `<span class="icon anemoDice"></span>`
            )
            .replaceAll(`Icon_GeoDice `, `<span class="icon geoDice"></span>`)
            .replaceAll(
                `Icon_DendroDice `,
                `<span class="icon dendroDice"></span>`
            )
            .replaceAll(`Icon_OmniDice `, `<span class="icon omniDice"></span>`)
            .replaceAll(
                `Icon_UnalignedDice `,
                `<span class="icon unalignedDice"></span>`
            )
            .replaceAll(`Icon_Energy `, `<span class="icon energy"></span>`)

            .replaceAll(`Icon_Physical `, `<span class="icon physical"></span>`)
            .replaceAll(`Icon_Pyro `, `<span class="icon pyro"></span>`)
            .replaceAll(`Icon_Hydro `, `<span class="icon hydro"></span>`)
            .replaceAll(`Icon_Electro `, `<span class="icon electro"></span>`)
            .replaceAll(`Icon_Cryo `, `<span class="icon cryo"></span>`)
            .replaceAll(`Icon_Anemo `, `<span class="icon anemo"></span>`)
            .replaceAll(`Icon_Geo `, `<span class="icon geo"></span>`)
            .replaceAll(`Icon_Dendro `, `<span class="icon dendro"></span>`)

            .replaceAll(`Icon_Sword `, `<span class="icon sword"></span>`)
            .replaceAll(`Icon_Claymore `, `<span class="icon claymore"></span>`)
            .replaceAll(`Icon_Polearm `, `<span class="icon polearm"></span>`)
            .replaceAll(`Icon_Bow `, `<span class="icon bow"></span>`)
            .replaceAll(`Icon_Catalyst `, `<span class="icon catalyst"></span>`)

            .replaceAll(
                `Icon_ConsecratedBeast `,
                `<span class="icon consecrated_beast"></span>`
            )
            .replaceAll(`Icon_Eremite `, `<span class="icon eremite"></span>`)
            .replaceAll(`Icon_Fatui `, `<span class="icon fatui"></span>`)
            .replaceAll(`Icon_Fontaine `, `<span class="icon fontaine"></span>`)
            .replaceAll(
                `Icon_Hilichurl `,
                `<span class="icon hilichurl"></span>`
            )
            .replaceAll(`Icon_Inazuma `, `<span class="icon inazuma"></span>`)
            .replaceAll(`Icon_Liyue `, `<span class="icon liyue"></span>`)
            .replaceAll(
                `Icon_Mondstadt `,
                `<span class="icon mondstadt"></span>`
            )
            .replaceAll(`Icon_Monster `, `<span class="icon monster"></span>`)
            .replaceAll(`Icon_Natlan `, `<span class="icon natlan"></span>`)
            .replaceAll(`Icon_Sumeru `, `<span class="icon sumeru"></span>`)

            .replaceAll(`Icon_Ousia `, `<span class="icon ousia"></span>`)
            .replaceAll(`Icon_Pneuma `, `<span class="icon pneuma"></span>`)

            .replaceAll(`Icon_Heal `, `<span class="icon heal"></span>`)
            .replaceAll(`Icon_Shield `, `<span class="icon shield"></span>`)

            .replaceAll(
                `Icon_ArcaneLegend `,
                `<span class="icon arcane_legend"></span>`
            )
            .replaceAll(`Icon_Artifact `, `<span class="icon artifact"></span>`)
            .replaceAll(
                `Icon_Companion `,
                `<span class="icon companion"></span>`
            )
            .replaceAll(`Icon_Food `, `<span class="icon food"></span>`)
            .replaceAll(
                `Icon_ElementalResonance `,
                `<span class="icon elemental_resonance"></span>`
            )
            .replaceAll(`Icon_Item `, `<span class="icon item"></span>`)
            .replaceAll(`Icon_Location `, `<span class="icon location"></span>`)
            .replaceAll(`Icon_Talent `, `<span class="icon talent"></span>`)
            .replaceAll(
                `Icon_Technique `,
                `<span class="icon technique"></span>`
            )
            .replaceAll(`Icon_Weapon `, `<span class="icon weapon"></span>`);
    }
    if (game === "wuwa") {
        text = description
            .replaceAll(`Icon_LMB`, `<span class="icon lmb"></span>`)
            .replaceAll(`Icon_RMB`, `<span class="icon rmb"></span>`)
            .replaceAll(`Icon_E`, `<span class="icon e"></span>`)
            .replaceAll(`Icon_R`, `<span class="icon r"></span>`);
    }
    if (game === "zzz") {
        text = description
            .replaceAll(`Icon_Basic`, `<span class="icon attack"></span>`)
            .replaceAll(`Icon_Dodge`, `<span class="icon dodge"></span>`)
            .replaceAll(`Icon_Assist`, `<span class="icon assist"></span>`)
            .replaceAll(`Icon_Special`, `<span class="icon special"></span>`)
            .replaceAll(
                `Icon_EXSpecial`,
                `<span class="icon ex-${
                    attributes?.weaponType === "Rupture"
                        ? "special2"
                        : "special"
                }"></span>`
            )
            .replaceAll(`Icon_Ultimate`, `<span class="icon ultimate"></span>`)
            .replaceAll(`Icon_Core`, `<span class="icon core"></span>`);
    }

    return parse(text, options);
}

function getGenshinIcon(icon: string) {
    switch (icon) {
        case "physical":
        case "pyro":
        case "hydro":
        case "electro":
        case "cryo":
        case "anemo":
        case "geo":
        case "dendro":
            return `elements/${toTitleCase(icon)}`;
        case "pyroDice":
        case "hydroDice":
        case "electroDice":
        case "cryoDice":
        case "anemoDice":
        case "geoDice":
        case "dendroDice":
        case "omniDice":
        case "unalignedDice":
            return `dice_alt/${icon[0].toUpperCase()}`;
        case "energy":
            return `dice_alt/N`;
        case "sword":
        case "claymore":
        case "polearm":
        case "bow":
        case "catalyst":
            return `weapons/${toTitleCase(icon)}`;
        case "consecrated_beast":
        case "eremite":
        case "fatui":
        case "fontaine":
        case "hilichurl":
        case "inazuma":
        case "liyue":
        case "mondstadt":
        case "monster":
        case "natlan":
        case "sumeru":
            return `factions/${toTitleCase(icon)}`;
        case "ousia":
        case "pneuma":
            return `elements/arkhe/${toTitleCase(icon)}`;
        case "heal":
            return `Heal`;
        case "shield":
            return `Shield`;
        case "arcane_legend":
        case "artifact":
        case "companion":
        case "food":
        case "item":
        case "location":
        case "talent":
        case "technique":
        case "weapon":
            return `subtypes/${toTitleCase(icon)}`;
        default:
            return "";
    }
}

const iconSkillKeys: Record<string, string> = {
    lmb: "wuwa/icons/inputs/LMB",
    rmb: "wuwa/icons/inputs/RMB",
    e: "wuwa/icons/inputs/E",
    r: "wuwa/icons/inputs/R",
    attack: "zzz/skills/Attack",
    dodge: "zzz/skills/Dodge",
    assist: "zzz/skills/Assist",
    special: "zzz/skills/Special",
    "ex-special": "zzz/skills/SpecialEX",
    "ex-special2": "zzz/skills/SpecialEX2",
    ultimate: "zzz/skills/Ultimate",
    core: "zzz/skills/Core",
};
