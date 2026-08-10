import { useState } from "react";

// Component imports
import FlexBox from "@/components/FlexBox";
import Text from "@/components/Text";
import Image from "@/components/Image";
import Tooltip from "@/components/Tooltip";
import ContentDialog from "@/components/ContentDialog";
import SkillPopup from "../SkillPopup";
import RatingCalculatorSkillSelector from "./RatingCalculatorSkillSelector";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Popover from "@mui/material/Popover";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import EditIcon from "@mui/icons-material/Edit";
import { SvgIconProps } from "@mui/material/SvgIcon";

// Helper imports
import { useUmaContext } from "@/context";
import { useRatingCalculatorStore } from "@/stores";
import { calculateSkillScore } from "@/helpers/uma/calculator";
import { getUmaSkillRarityColor } from "@/helpers/uma/rarityColors";

// Type imports
import { UmaSkillOption } from "@/types/uma/calculator";

export default function RatingCalculatorSkill({
    skill,
    character,
    options,
    values,
    handleChange,
}: {
    skill: UmaSkillOption;
    character: number | null;
    options: UmaSkillOption[];
    values: UmaSkillOption[];
    handleChange: (newValue: UmaSkillOption[] | null) => void;
}) {
    const theme = useTheme();

    const { skills: skillData } = useUmaContext();
    const currentSkillData = skillData.find((s) => s.id === skill.id);

    const [skillPopupOpen, setSkillPopupOpen] = useState(false);
    const handleSkillPopupClickOpen = () => {
        currentSkillData && setSkillPopupOpen(true);
    };

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const handleClickOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);

    const { aptitude, skills, hiddenSkills, setSkills, setHiddenSkills } =
        useRatingCalculatorStore();

    const [hidden, setHidden] = useState(hiddenSkills.includes(skill.id));
    const handleHiddenChange = () => {
        setHidden(!hidden);
        setHiddenSkills(skill.id);
    };

    const handleDelete = () => {
        if (hidden) setHiddenSkills(skill.id);
        const newValues = skills.filter((i) => skill.id !== i.id);
        setSkills(newValues);
    };

    const iconButtonProps: IconButtonProps = {
        sx: {
            p: 0.5,
            color: theme.contentBox.color.header,
            borderRadius: "4px",
            border: `1px solid ${theme.border.color.primary}`,
            backgroundColor: theme.contentBox.backgroundColor.headerHover,
            "&:hover": {
                backgroundColor:
                    theme.contentBox.backgroundColor.headerSelectedHover,
            },
        },
    };

    const iconProps: SvgIconProps = {
        sx: {
            fontSize: {
                xs: "16px",
                sm: "18px",
            },
        },
    };

    const opacity = hidden ? 0.35 : 1;

    const skillName = skill.name || skill.nameJP || skill.nameJPNative;
    const score = calculateSkillScore(aptitude, skill);

    return (
        <>
            <FlexBox
                key={skill.id}
                sx={{
                    p: "4px 8px",
                    justifyContent: "space-between",
                    borderRadius: theme.contentBox.border.radius,
                    backgroundColor: theme.background(0),
                    backgroundImage: hidden
                        ? "transparent"
                        : getUmaSkillRarityColor(skill.rarity),
                }}
                spacing={[1, 0]}
                wrap
            >
                <Stack
                    spacing={1.5}
                    direction="row"
                    alignItems="center"
                    sx={{ opacity }}
                >
                    <Image
                        src={`uma/skills/${skill?.icon}`}
                        alt={skill.id.toString()}
                        size={28}
                        style={{ cursor: "pointer" }}
                        onClick={handleSkillPopupClickOpen}
                    />
                    <Text
                        variant={skillName.length > 25 ? "body3" : "body2"}
                        weight="highlight"
                        sx={{
                            color:
                                !hidden && skill.rarity >= 2
                                    ? "rgb(121, 64, 22)"
                                    : theme.text.primary,
                            cursor: "pointer",
                            "&:hover": {
                                textDecoration: "dotted underline",
                            },
                        }}
                        onClick={handleSkillPopupClickOpen}
                    >
                        {skillName}
                    </Text>
                </Stack>
                <FlexBox spacing={1}>
                    <Box
                        sx={{
                            py: 0.5,
                            borderRadius: "4px",
                            border: `1px solid ${theme.border.color.primary}`,
                            backgroundColor:
                                theme.contentBox.backgroundColor.headerHover,
                            maxHeight: "28px",
                            width: "52px",
                        }}
                    >
                        <Text
                            variant="subtitle2"
                            weight="highlight"
                            sx={{
                                textAlign: "center",
                                opacity,
                            }}
                        >
                            {`${score >= 0 ? "+" : ""}${score}`}
                        </Text>
                    </Box>
                    {/* <Tooltip title="Edit" placement="top">
                        <IconButton
                            onClick={handleClickOpen}
                            {...iconButtonProps}
                        >
                            <EditIcon {...iconProps} />
                        </IconButton>
                    </Tooltip> */}
                    <Tooltip title="Toggle" placement="top">
                        <IconButton
                            onClick={handleHiddenChange}
                            {...iconButtonProps}
                        >
                            {hidden ? (
                                <VisibilityIcon {...iconProps} />
                            ) : (
                                <VisibilityOffIcon {...iconProps} />
                            )}
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Remove" placement="top">
                        <IconButton onClick={handleDelete} {...iconButtonProps}>
                            <DeleteIcon {...iconProps} />
                        </IconButton>
                    </Tooltip>
                </FlexBox>
            </FlexBox>
            <ContentDialog
                open={skillPopupOpen}
                setOpen={setSkillPopupOpen}
                header="Skill Details"
                sx={{
                    ".MuiDialog-paper": {
                        maxWidth: "900px",
                        maxHeight: { md: "600px" },
                    },
                }}
            >
                {currentSkillData && <SkillPopup skill={currentSkillData} />}
            </ContentDialog>
            {/* <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: -80,
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
            >
                <Card
                    sx={{
                        backgroundColor: theme.background(2),
                        border: `1px solid ${theme.border.color.primary}`,
                        borderRadius: "8px",
                        p: 1,
                        width: { xs: "90vw", md: "50vw", xl: "25vw" },
                    }}
                >
                    <RatingCalculatorSkillSelector
                        character={character}
                        options={options}
                        values={values}
                        activeSkill={skill}
                        placeholder="Edit Skill"
                        handleChange={handleChange}
                    />
                </Card>
            </Popover> */}
        </>
    );
}
