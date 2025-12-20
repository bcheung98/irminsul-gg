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
    game: Game;
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
        if (game === "zzz" && className.startsWith("text-value"))
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
                            src={iconSkillKeys[skill]}
                            style={{
                                verticalAlign: "middle",
                                width: "auto",
                                height: matches
                                    ? `calc(${theme.typography.subtitle1.fontSize} + 0.5rem)`
                                    : `calc(${theme.typography.subtitle1.fontSize} + 0.1rem)`,
                                marginBottom: "1.5px",
                            }}
                        />
                    );
                }
            }
        },
    };

    let text = description;

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
