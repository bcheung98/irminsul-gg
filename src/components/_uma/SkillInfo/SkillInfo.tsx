import { useState } from "react";

// Component imports
import FlexBox from "@/components/FlexBox";
import Text from "@/components/Text";
import Image from "@/components/Image";
import ContentDialog from "@/components/ContentDialog";
import UmaSkillDescription from "@/components/_uma/SkillDescription";
import SkillPopup from "@/components/_uma/SkillPopup";
import NavLink from "@/components/NavLink";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";

// Helper imports
import { useUmaContext } from "@/context";
import { getUmaSkillRarityColor } from "@/helpers/uma/rarityColors";

export default function SkillInfo({
    skillID,
    backgroundColor,
    expand = false,
    disablePopup = false,
    handleClick,
}: {
    skillID: number;
    backgroundColor?: string;
    expand?: boolean;
    disablePopup?: boolean;
    handleClick?: (arg?: any) => void;
}) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));

    const { skills } = useUmaContext();
    const skill = skills.find((skill) => skill.id === skillID);

    if (!skill) {
        console.warn(`Could not find skill with ID ${skillID}`);
        return null;
    }

    const [open, setOpen] = useState(false);
    const handleClickOpen = handleClick
        ? () => handleClick(skill)
        : () => {
              !disablePopup && setOpen(true);
          };

    const textColor =
        skill.rarity >= 2 ? "rgb(121, 64, 22)" : theme.text.primary;
    const textStyle = {
        color: textColor,
        cursor: "pointer",
    };

    const skillUnlock = skill.rarity === 4 && <Text>(3★)</Text>;
    const skillName = skill.name.global || skill.name.jp;
    const skillDesc = (
        <UmaSkillDescription
            description={skill.description.global || skill.description.jp}
            color={disablePopup ? theme.text.primary : theme.text.description}
        />
    );

    const textContainerStyle = {
        p: "4px 8px",
        borderRadius: "4px",
        backgroundImage: getUmaSkillRarityColor(skill.rarity),
        backgroundColor: theme.background(0),
        cursor: "pointer",
        "&:hover": {
            outline: `2px solid ${
                skill.rarity >= 2
                    ? theme.text.primary
                    : theme.border.color.primary
            }`,
        },
    };

    const textContainerStyleExpanded = {
        p: skill.rarity >= 2 ? "2px 8px" : "0px",
        borderRadius: skill.rarity >= 2 ? "4px" : 0,
        backgroundImage: getUmaSkillRarityColor(skill.rarity),
    };

    function SkillInfoExpanded() {
        return (
            <Card
                sx={{
                    px: 2,
                    py: 1,
                    backgroundColor: backgroundColor || theme.background(0),
                    borderRadius: theme.contentBox.border.radius,
                    cursor: "pointer",
                    "&:hover": !disablePopup
                        ? {
                              outline: `2px solid ${theme.border.color.primary}`,
                          }
                        : {},
                }}
                onClick={handleClickOpen}
            >
                <FlexBox
                    spacing={2}
                    sx={{
                        mb: { xs: "8px", lg: 0 },
                        alignItems: { xs: "center", md: "flex-start" },
                    }}
                >
                    <Stack
                        spacing={0.5}
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Image src={`uma/skills/${skill?.icon}`} size={48} />
                        {matches && skillUnlock}
                    </Stack>
                    <Box sx={{ width: { xs: "75%", sm: "50%" } }}>
                        <FlexBox
                            wrap
                            spacing={1}
                            sx={textContainerStyleExpanded}
                        >
                            <Text weight="highlight" sx={textStyle}>
                                {skillName}
                            </Text>
                        </FlexBox>
                        <Box sx={{ width: "150%", mt: "4px" }}>
                            {matches ? skillDesc : skillUnlock}
                        </Box>
                    </Box>
                </FlexBox>
                {!matches && skillDesc}
            </Card>
        );
    }

    function SkillInfoSmall() {
        return disablePopup ? (
            <NavLink href={`/uma/skills/${skillID}`}>
                <SkillInfoRoot />
            </NavLink>
        ) : (
            <SkillInfoRoot />
        );
    }

    function SkillInfoRoot() {
        return (
            <Stack
                spacing={1.5}
                direction="row"
                alignItems="center"
                sx={textContainerStyle}
                onClick={handleClickOpen}
            >
                <Image src={`uma/skills/${skill?.icon}`} size={28} />
                <Text variant="body2" weight="highlight" sx={textStyle}>
                    {skillName}
                </Text>
            </Stack>
        );
    }

    return (
        <>
            {expand ? <SkillInfoExpanded /> : <SkillInfoSmall />}
            <ContentDialog
                open={open}
                setOpen={setOpen}
                header="Skill Details"
                fullScreen={!matches}
                sx={{
                    ".MuiDialog-paper": {
                        maxWidth: "900px",
                        maxHeight: { md: "600px" },
                    },
                }}
            >
                <SkillPopup skill={skill} showSources />
            </ContentDialog>
        </>
    );
}
