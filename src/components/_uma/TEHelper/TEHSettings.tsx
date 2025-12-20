import { useState } from "react";

// Component imports
import NavButton from "@/components/NavButton";
import ContentDialog from "@/components/ContentDialog";
import Switch from "@/components/Switch";
import SettingsItem, {
    SettingsItemProps,
} from "@/components/Settings/SettingsItem";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import SettingsIcon from "@mui/icons-material/Settings";

// Helper imports
import { useTEHelperStore } from "@/stores";

export default function TEHSettings() {
    const theme = useTheme();

    const { settings, setExpanded, setShowAll } = useTEHelperStore();

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const settingsList: SettingsItemProps[] = [
        {
            label: "Show all characters/supports at once",
            input: (
                <Switch
                    checked={settings.showAll}
                    size="small"
                    onChange={(event) => setShowAll(event.target.checked)}
                />
            ),
        },
        {
            label: "Expand events",
            input: (
                <Switch
                    checked={settings.expanded}
                    size="small"
                    onChange={(event) => setExpanded(event.target.checked)}
                />
            ),
        },
    ];

    return (
        <>
            <NavButton
                onClick={handleClickOpen}
                title="Settings"
                sx={{
                    p: 0.5,
                    color: open
                        ? theme.text.selected
                        : theme.appbar.color.primary,
                }}
            >
                <SettingsIcon />
            </NavButton>
            <ContentDialog
                open={open}
                setOpen={setOpen}
                onClose={handleClose}
                maxWidth="md"
                fullWidth
                header="Training Event Helper Settings"
            >
                <Stack spacing={2}>
                    {settingsList.map((setting) => (
                        <SettingsItem key={setting.label} {...setting} />
                    ))}
                </Stack>
            </ContentDialog>
        </>
    );
}
