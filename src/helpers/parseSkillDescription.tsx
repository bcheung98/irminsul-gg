import { BaseSyntheticEvent } from "react";
import parse, {
    HTMLReactParserOptions,
    Element as DOMElement,
    domToReact,
    DOMNode,
} from "html-react-parser";
import { useTheme, TypographyProps } from "@mui/material";
import { useTextColor } from "./useTextColor";

export function parseSkillDescription({
    game,
    description,
    targetClassName = "text-value",
    newClassName,
    onClick,
    disableLink = false,
}: {
    game: string;
    description: string;
    textVariant?: TypographyProps["variant"];
    targetClassName?: string;
    newClassName?: string;
    onClick?: (event: BaseSyntheticEvent) => void;
    disableLink?: boolean;
}) {
    const theme = useTheme();

    const textColor = useTextColor(theme.text);

    const options: HTMLReactParserOptions = {
        replace: (domNode) => {
            if (domNode instanceof DOMElement && domNode.attribs.class) {
                const className = domNode.attribs.class;
                if (className.split("-")[0].startsWith("text")) {
                    const tag = className.split("-")[1];
                    return (
                        <span
                            className={
                                className === targetClassName
                                    ? newClassName
                                    : className
                            }
                            style={{
                                color: textColor(game, tag),
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
                    return (
                        <span
                            className={className}
                            style={{
                                color: textColor(game, getTextColor(className)),
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
                }
            }
        },
    };

    return parse(description, options);
}

function getTextColor(className: string) {
    if (className.startsWith("tooltipHighlight-")) {
        return "highlight";
    } else {
        return "primary";
    }
}
