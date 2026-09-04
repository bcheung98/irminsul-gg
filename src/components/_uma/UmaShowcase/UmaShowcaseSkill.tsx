// Component imports
import FlexBox from "@/components/FlexBox";
import Text from "@/components/Text";
import Image from "@/components/Image";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";

// Helper imports
import { useRatingCalculatorStore } from "@/stores";
import {
    getUmaSkillBorderColor,
    getUmaSkillRarityColor,
} from "@/helpers/uma/rarityColors";

// Type imports
import { UmaSkillOption } from "@/types/uma/calculator";

export default function UmaShowcaseSkill({
    skill,
    unique,
}: {
    skill: UmaSkillOption;
    unique?: boolean;
}) {
    const theme = useTheme();

    const { stats } = useRatingCalculatorStore();

    const skillName = skill.name || skill.nameJP || skill.nameJPNative;
    let rarity = skill.rarity;
    const isInheritedUnique = !unique && [3, 4, 5].includes(skill.rarity);
    if (isInheritedUnique) {
        rarity = 1;
    }

    const textStyle = {
        color: "rgb(121, 64, 22)",
        textShadow: `-0.5px -0.5px 0 rgb(250, 250, 250), 0.5px -0.5px 0 rgb(250, 250, 250), -0.5px 0.5px 0 rgb(250, 250, 250), 0.5px 0.5px 0 rgb(250, 250, 250), -0.5px 0px 0 rgb(250, 250, 250), 0.5px 0px 0 rgb(250, 250, 250), 0px -0.5px 0 rgb(250, 250, 250), 0px 0.5px 0 rgb(250, 250, 250)`,
        lineHeight: 1.1,
    };

    return (
        <Card
            sx={{
                p: "1px",
                borderRadius: "8px",
                backgroundImage: getUmaSkillBorderColor(rarity),
            }}
        >
            <FlexBox
                sx={{
                    p: "4px 4px 4px 2px",
                    justifyContent: "space-between",
                    borderRadius: "8px",
                    backgroundColor: theme.background(0),
                    backgroundImage:
                        rarity === 1
                            ? "linear-gradient(to right, rgb(255, 243, 245), rgb(223, 222, 242) 50%, rgb(179, 178, 201) 100%)"
                            : getUmaSkillRarityColor(rarity),
                }}
                spacing={[1, 0.75]}
            >
                <Stack
                    spacing={1.5}
                    direction="row"
                    alignItems="center"
                    sx={{ textWrap: "pretty" }}
                >
                    <Image
                        src={`uma/skills/${skill.icon}`}
                        alt={skill.name}
                        size={28}
                    />
                    <Text variant="subtitle2" sx={textStyle}>
                        {skillName}
                    </Text>
                </Stack>
                {unique && (
                    <FlexBox sx={{ width: "40px" }}>
                        <Text variant="body2" sx={textStyle}>
                            {`Lvl ${stats[6]}`}
                        </Text>
                    </FlexBox>
                )}
            </FlexBox>
        </Card>
    );
}
