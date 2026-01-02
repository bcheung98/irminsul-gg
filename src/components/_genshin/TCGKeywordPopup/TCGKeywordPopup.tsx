import { useState } from "react";
import parse from "html-react-parser";

// Component imports
import FlexBox from "@/components/FlexBox";
import Text from "@/components/Text";
import TextLabel from "@/components/TextLabel";
import Tooltip from "@/components/Tooltip";
import SkillCard from "@/components/SkillCard";
import SkillIcon from "@/components/SkillIcon";
import SkillDescription from "@/components/SkillDescription";
import TCGCardDiceIcon from "../TCGCard/TCGCardDiceIcon";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Collapse from "@mui/material/Collapse";
import LinearProgress from "@mui/material/LinearProgress";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

// Helper imports
import { useTCGKeywordContext } from "@/context";

// Type imports
import { SkillKeyword } from "@/types/skill";
import { AttributeData } from "@/types";

export default function TCGKeywordPopup({
    keyword,
    attributes,
}: {
    keyword: SkillKeyword | null;
    attributes: AttributeData;
}) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));

    const keywords = useTCGKeywordContext();
    const subKeywords: SkillKeyword[] = [];

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdownState = () => {
        setDropdownOpen(!dropdownOpen);
    };

    let mainKeyword = "";

    if (keyword) {
        if (keyword.type) {
            const keywordType = parse(keyword.type);
            if (typeof keywordType === "object") {
                if (
                    "props" in keywordType &&
                    keywordType.props.className.startsWith("tooltip")
                ) {
                    const tag = keywordType.props["data-tag"];
                    const subKeyword = keywords.find(
                        (kwrd) => kwrd.tag === tag
                    );
                    if (subKeyword && !subKeywords.includes(subKeyword)) {
                        subKeywords.push(subKeyword);
                    }
                }
            }
        }
        const description = parse(keyword.description);
        if (Array.isArray(description)) {
            description.forEach((element) => {
                if (
                    element.props?.className &&
                    element.props.className.startsWith("tooltip")
                ) {
                    const tag = element.props["data-tag"];
                    const subKeyword = keywords.find(
                        (kwrd) => kwrd.tag === tag
                    );
                    if (subKeyword && !subKeywords.includes(subKeyword)) {
                        isKeywordSkill(subKeyword.type)
                            ? subKeywords.unshift(subKeyword)
                            : subKeywords.push(subKeyword);
                    }
                }
            });
        }
    }

    function KeywordDescription({
        keyword,
        isSubKeyword = false,
    }: {
        keyword: SkillKeyword;
        isSubKeyword?: boolean;
    }) {
        return (
            <SkillCard size={12}>
                <Stack spacing={isKeywordSkill(keyword.type) ? 2 : 1}>
                    <FlexBox
                        spacing={1}
                        sx={{ justifyContent: "space-between" }}
                        wrap
                    >
                        <TextLabel
                            icon={
                                keyword.icon &&
                                keyword.tag !== mainKeyword && (
                                    <SkillIcon
                                        icon={keyword.icon}
                                        attributes={attributes}
                                        size={
                                            isKeywordSkill(keyword.type)
                                                ? 48
                                                : 32
                                        }
                                        padding={
                                            isKeywordSkill(keyword.type)
                                                ? "4px"
                                                : 0
                                        }
                                        backgroundColor={
                                            isKeywordSkill(keyword.type)
                                                ? theme.appbar.backgroundColor
                                                      .main
                                                : "transparent"
                                        }
                                        borderWidth={
                                            isKeywordSkill(keyword.type)
                                                ? "2px"
                                                : 0
                                        }
                                    />
                                )
                            }
                            title={
                                <Text
                                    component="span"
                                    variant="h6"
                                    weight="highlight"
                                >
                                    <SkillDescription
                                        game={"genshin"}
                                        description={keyword.name || ""}
                                        disableLink
                                    />
                                </Text>
                            }
                            subtitle={
                                keyword.type &&
                                (!isSubKeyword ||
                                    isKeywordSkill(keyword.type)) && (
                                    <Text
                                        component="span"
                                        weight="highlight"
                                        sx={{
                                            color: theme.text.genshin.header,
                                        }}
                                    >
                                        <SkillDescription
                                            game="genshin"
                                            description={keyword.type || ""}
                                            onClick={toggleDropdownState}
                                        />
                                    </Text>
                                )
                            }
                            spacing={isKeywordSkill(keyword.type) ? 2 : 1}
                        />
                        {keyword.cost && (
                            <TCGCardDiceIcon
                                cost={keyword.cost}
                                orientation="row"
                                size={matches ? "40px" : "32px"}
                            />
                        )}
                    </FlexBox>
                    <Text
                        component="span"
                        variant="subtitle1"
                        sx={{
                            color: theme.text.description,
                        }}
                    >
                        <SkillDescription
                            game="genshin"
                            description={keyword.description}
                            onClick={
                                !isSubKeyword ? toggleDropdownState : undefined
                            }
                            disableLink={isSubKeyword}
                        />
                    </Text>
                </Stack>
            </SkillCard>
        );
    }

    return (
        <>
            {keyword ? (
                <Stack spacing={2}>
                    <KeywordDescription keyword={keyword} />
                    {subKeywords.length > 0 && (
                        <Collapse
                            in={dropdownOpen}
                            timeout="auto"
                            unmountOnExit
                        >
                            <Divider sx={{ mb: 1 }} />
                            <FlexBox
                                sx={{ py: 1, justifyContent: "space-between" }}
                            >
                                <Text
                                    weight="highlight"
                                    sx={{ px: 0.5, color: theme.text.header }}
                                >
                                    Detailed Rules
                                </Text>
                                <Tooltip title="Close" arrow placement="top">
                                    <IconButton
                                        disableRipple
                                        onClick={toggleDropdownState}
                                        sx={{
                                            p: 0.25,
                                            "&:hover": {
                                                backgroundColor:
                                                    theme.background(0),
                                            },
                                        }}
                                    >
                                        <KeyboardArrowUpIcon />
                                    </IconButton>
                                </Tooltip>
                            </FlexBox>
                            <Stack spacing={1}>
                                {subKeywords.map((keyword, index) => (
                                    <KeywordDescription
                                        key={index}
                                        keyword={keyword}
                                        isSubKeyword
                                    />
                                ))}
                            </Stack>
                        </Collapse>
                    )}
                </Stack>
            ) : (
                <LinearProgress color="info" />
            )}
        </>
    );
}

function isKeywordSkill(tag: string | undefined) {
    return (
        tag === "Normal Attack" ||
        tag === "Technique" ||
        tag?.startsWith("Elemental") ||
        tag?.startsWith("<span")
    );
}
