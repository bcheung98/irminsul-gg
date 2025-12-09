import { useState } from "react";

// Component imports
import FlexBox from "@/components/FlexBox";
import Image from "@/components/Image";
import Tooltip from "@/components/Tooltip";
import ContentDialog from "@/components/ContentDialog";
import TextLabel from "@/components/TextLabel";
import Text from "@/components/Text";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

// Helper imports
import { combatRoles as tags } from "@/data/wuwa/combatRoles";

// Type imports
import { AttributeData } from "@/types";

export default function CharacterCombatRoles({ combatRoles }: AttributeData) {
    const theme = useTheme();

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    if (!combatRoles) return <></>;

    const tagImageStyle = (role: string) => ({
        border: `2px solid ${
            tags.find((tag) => tag.name === role)?.color ||
            theme.border.color.primary
        }`,
        borderRadius: "4px",
        backgroundColor: theme.iconBackground.primary,
        padding: "4px",
    });

    return (
        <>
            <FlexBox spacing={1}>
                <Grid container spacing={1}>
                    {combatRoles.map((role) => (
                        <Image
                            key={role}
                            src={`wuwa/icons/tags/${role}`}
                            size={32}
                            responsive
                            style={tagImageStyle(role)}
                            tooltip={role}
                        />
                    ))}
                </Grid>
                <Tooltip
                    title="Click to view Combat Roles"
                    arrow
                    placement="top"
                >
                    <IconButton
                        disableRipple
                        onClick={handleClickOpen}
                        sx={{ py: 0 }}
                    >
                        <InfoOutlinedIcon sx={{ fontSize: "24px" }} />
                    </IconButton>
                </Tooltip>
            </FlexBox>
            <ContentDialog
                open={open}
                setOpen={setOpen}
                maxWidth="sm"
                header="Combat Roles"
            >
                <Stack spacing={2} divider={<Divider />}>
                    {combatRoles.map((role) => (
                        <TextLabel
                            key={role}
                            icon={`wuwa/icons/tags/${role}`}
                            iconProps={{
                                size: 40,
                                styles: tagImageStyle(role),
                            }}
                            title={role}
                            subtitle={
                                <Text
                                    variant="body2"
                                    sx={{ color: theme.text.description }}
                                >
                                    {tags.find((tag) => tag.name === role)
                                        ?.description || ""}
                                </Text>
                            }
                            spacing={2}
                            textSpacing={0.5}
                        />
                    ))}
                </Stack>
            </ContentDialog>
        </>
    );
}
