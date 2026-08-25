import { useState } from "react";

// Component imports
import FlexBox from "@/components/FlexBox";
import Text from "@/components/Text";
import Image from "@/components/Image";
import SkillDescription from "@/components/_uma/SkillDescription";
import SkillAttributes from "@/components/_uma/SkillAttributes";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

// Helper imports
import { getUmaSkillRarityColor } from "@/helpers/uma/rarityColors";

// Type imports
import { UmaSkill } from "@/types/uma/skill";

export default function SkillPopup({
    skill,
    showSources = false,
    page = false,
    defaultInherited = false,
}: {
    skill: UmaSkill;
    showSources?: boolean;
    page?: boolean;
    defaultInherited?: boolean;
}) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));

    const [currentSkill, setCurrentSkill] = useState<UmaSkill>(skill);
    const handleClick = (e: UmaSkill) => {
        setCurrentSkill(e);
    };

    const [showInherited, setShowInherited] = useState(defaultInherited);
    const handleSwitchChange = () => {
        setShowInherited(!showInherited);
    };

    const { name, icon } = currentSkill;

    const skillName = name.global || name.jp;
    let rarity = currentSkill.rarity;
    let description =
        currentSkill.description.global || currentSkill.description.jp;
    let cost = skill.cost;

    if (showInherited) {
        rarity = 1;
        description = currentSkill.geneVersion.description.global || "";
        cost = currentSkill.geneVersion.cost;
    }

    const textColor = rarity >= 2 ? "rgb(121, 64, 22)" : theme.text.primary;
    const textStyle = {
        color: textColor,
    };

    const skillDesc = (
        <SkillDescription
            description={description}
            color={textColor}
            weight="highlight"
        />
    );

    const skillUnlock = rarity === 4 && <Text sx={textStyle}>(3★)</Text>;

    return (
        <Stack
            spacing={2}
            sx={
                page
                    ? {
                          backgroundColor: theme.background(1),
                          p: 2,
                          borderRadius: theme.contentBox.border.radius,
                      }
                    : {}
            }
        >
            <Card
                sx={{
                    p: 1,
                    backgroundColor: theme.background(0),
                    backgroundImage: getUmaSkillRarityColor(rarity),
                }}
            >
                <FlexBox spacing={2}>
                    <Stack
                        spacing={0.5}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Image
                            src={`uma/skills/${icon}`}
                            size={48}
                            responsive
                        />
                        {skillUnlock}
                    </Stack>
                    <Stack spacing={0.5} sx={{ width: "100%", pr: 1 }}>
                        <FlexBox
                            spacing={[0.5, 1]}
                            wrap
                            sx={{ justifyContent: "space-between" }}
                        >
                            <Text
                                variant={matches ? "body1" : "body2"}
                                weight="highlight"
                                sx={textStyle}
                            >
                                {skillName}
                            </Text>
                            {cost && (
                                <Box
                                    sx={{
                                        p: "1px 8px",
                                        backgroundColor:
                                            theme.appbar.backgroundColor.main,
                                        borderRadius: "16px",
                                    }}
                                >
                                    <Text
                                        variant="subtitle2"
                                        weight="highlight"
                                        sx={{
                                            color: theme.appbar.color.primary,
                                        }}
                                    >{`Skill Pts: ${cost}`}</Text>
                                </Box>
                            )}
                        </FlexBox>
                        <Divider />
                        {skillDesc}
                    </Stack>
                </FlexBox>
            </Card>
            <SkillAttributes
                skill={currentSkill}
                showSources={showSources}
                inherited={showInherited}
                handleClick={!page ? handleClick : undefined}
                handleSwitchChange={handleSwitchChange}
            />
        </Stack>
    );
}
