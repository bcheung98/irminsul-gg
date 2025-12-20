import { useState } from "react";

// Component imports
import FlexBox from "@/components/FlexBox";
import Tooltip from "@/components/Tooltip";
import ContentDialog from "@/components/ContentDialog";
import TextLabel from "@/components/TextLabel";
import Text from "@/components/Text";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
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
    const matches = useMediaQuery(theme.breakpoints.up("sm"));

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    if (!combatRoles) return <></>;

    function CombatRole({
        role,
        label = false,
    }: {
        role: string;
        label?: boolean;
    }) {
        const tag = tags.find((tag) => tag.name === role);
        if (!tag) return null;

        return (
            <TextLabel
                icon={tag.icon}
                iconProps={{
                    size: label ? 40 : 32,
                    styles: {
                        border: `2px solid ${tag.color}`,
                        borderRadius: "4px",
                        backgroundColor: theme.iconBackground.primary,
                        padding: "4px",
                    },
                    tooltip: !label ? tag.name : "",
                }}
                title={label ? role : ""}
                subtitle={
                    label && (
                        <Text
                            variant="body2"
                            sx={{ color: theme.text.description }}
                        >
                            {tags.find((tag) => tag.name === role)
                                ?.description || ""}
                        </Text>
                    )
                }
                spacing={2}
                textSpacing={0.5}
            />
        );
    }

    return (
        <>
            <FlexBox spacing={1}>
                <Grid container spacing={1}>
                    {combatRoles.map((role) => (
                        <CombatRole key={role} role={role} />
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
                maxWidth="md"
                fullScreen={!matches}
                header="Combat Roles"
            >
                <Stack spacing={2} divider={<Divider />}>
                    {combatRoles.map((role) => (
                        <CombatRole key={role} role={role} label />
                    ))}
                </Stack>
            </ContentDialog>
        </>
    );
}
