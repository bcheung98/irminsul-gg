import { useState } from "react";

// Component imports
import FlexBox from "@/components/FlexBox";
import Text from "@/components/Text";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export interface SettingsItemProps {
    label: string;
    input: React.ReactNode;
    description?: string | React.ReactNode;
}

export default function SettingsItem({
    label,
    input,
    description,
}: SettingsItemProps) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("sm"));

    const [open, setOpen] = useState(false);
    const toggleDropdownState = () => {
        setOpen(!open);
    };

    return (
        <Box>
            <FlexBox
                sx={{
                    alignItems: "normal",
                    justifyContent: "space-between",
                    pl: { xs: 0, sm: description ? 0 : 1 },
                    pr: { xs: 0, sm: 1 },
                }}
                spacing={1}
            >
                {description ? (
                    <ButtonBase
                        disableRipple
                        onClick={toggleDropdownState}
                        sx={{ gap: 0.5 }}
                    >
                        <ExpandMoreIcon
                            fontSize={matches ? "medium" : "small"}
                            sx={{
                                color: theme.border.color.primary,
                                transform: open
                                    ? `rotateZ(0deg)`
                                    : `rotateZ(-90deg)`,
                                transition: "transform 0.25s",
                            }}
                        />
                        <Text variant="subtitle1" sx={{ textAlign: "left" }}>
                            {label}
                        </Text>
                    </ButtonBase>
                ) : (
                    <Text variant="subtitle1">{label}</Text>
                )}
                {input}
            </FlexBox>
            {description && (
                <Collapse in={open} timeout="auto">
                    <Box
                        sx={{
                            px: { xs: 1, sm: 4 },
                            pt: 1,
                            pb: 2,
                            borderBottom: `1px solid ${theme.border.color.primary}`,
                        }}
                    >
                        {typeof description === "string" ? (
                            <Text variant="subtitle2">{description}</Text>
                        ) : (
                            description
                        )}
                    </Box>
                </Collapse>
            )}
        </Box>
    );
}
