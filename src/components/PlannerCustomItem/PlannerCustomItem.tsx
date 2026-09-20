import { useState } from "react";

// Component imports
import FlexBox from "@/components/FlexBox";
import Text from "@/components/Text";
import ContentDialog from "@/components/ContentDialog";
import { CustomItemCreator } from "./CustomItemCreator";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Card from "@mui/material/Card";
import ButtonBase from "@mui/material/ButtonBase";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

// Type imports
import type { PlannerCustomItemProps } from "./PlannerCustomItem.types";

export default function PlannerCustomItem({
    sampleItem,
    label,
    handleSelect,
    groups,
    type,
}: PlannerCustomItemProps) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("sm"));

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Card
                sx={{
                    p: 1,
                    backgroundColor: theme.background(0),
                    "&:hover": {
                        backgroundColor: theme.background(0, "light"),
                        cursor: "pointer",
                    },
                }}
            >
                <ButtonBase
                    disableRipple
                    disableTouchRipple
                    onClick={handleOpen}
                    sx={{
                        display: "inline",
                        width: "100%",
                    }}
                >
                    <FlexBox spacing={2}>
                        <AutoAwesomeIcon
                            sx={{
                                width: "48px",
                                height: "48px",
                                p: "8px",
                                color: theme.text.primary,
                            }}
                        />
                        <Text weight="highlight">{`Add custom ${label}`}</Text>
                    </FlexBox>
                </ButtonBase>
            </Card>
            {open && (
                <ContentDialog
                    open={open}
                    setOpen={setOpen}
                    // Prevent close on pressing `esc` or clicking backdrop
                    onClose={() => {}}
                    header={`Add custom ${label}`}
                    actions={<></>}
                    maxWidth="sm"
                    fullScreen={!matches}
                    contentProps={{ padding: 0 }}
                >
                    <CustomItemCreator
                        label={label}
                        handleClose={handleClose}
                        handleSelect={handleSelect}
                        sampleItem={sampleItem}
                        groups={groups}
                        type={type}
                    />
                </ContentDialog>
            )}
        </>
    );
}
