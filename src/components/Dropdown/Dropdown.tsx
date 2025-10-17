import { CSSProperties, useState } from "react";

// Component imports
import Image from "../Image";
import Text from "../Text";

// MUI imports
import { useTheme, ButtonBase, Collapse, Box } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

// Helper imports
import { combineStyles } from "@/utils";

interface DropdownProps {
    children?: React.ReactNode;
    title?: string;
    titleColor?: string;
    img?: string;
    imgStyle?: CSSProperties;
    iconColor?: string;
    contentPadding?: string | number;
    unmountOnExit?: boolean;
    defaultOpen?: boolean;
}

export default function Dropdown({
    children,
    title = "",
    titleColor,
    img,
    imgStyle,
    iconColor,
    contentPadding = "4px 24px",
    unmountOnExit = false,
    defaultOpen = false,
}: DropdownProps) {
    const theme = useTheme();

    const [open, setOpen] = useState(defaultOpen);
    const toggleDropdownState = () => {
        setOpen(!open);
    };

    return (
        <Box sx={{ mb: "8px" }}>
            <ButtonBase
                onClick={toggleDropdownState}
                disableRipple
                disableTouchRipple
                sx={{
                    maxWidth: "100%",
                    pl: 0,
                    mb: "4px",
                    justifyContent: "left",
                }}
            >
                <ExpandMore
                    sx={{
                        mr: "4px",
                        color: iconColor || theme.border.color.primary,
                        transform: open ? "rotateZ(0deg)" : "rotateZ(-90deg)",
                        transition: "transform 0.25s",
                    }}
                />
                {img && (
                    <Image
                        src={img}
                        style={combineStyles(
                            {
                                width: "32px",
                                height: "32px",
                                marginRight: "8px",
                            },
                            imgStyle
                        )}
                    />
                )}
                <Text sx={{ color: titleColor || theme.text.primary }} noWrap>
                    {title}
                </Text>
            </ButtonBase>
            <Collapse in={open} timeout="auto" unmountOnExit={unmountOnExit}>
                <Box sx={{ p: { xs: "8px 0", md: contentPadding } }}>
                    {children}
                </Box>
            </Collapse>
        </Box>
    );
}
