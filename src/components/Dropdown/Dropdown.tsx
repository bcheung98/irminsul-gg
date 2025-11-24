import { useState } from "react";

// Component imports
import FlexBox from "@/components/FlexBox";
import TextLabel from "@/components/TextLabel";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ButtonBase from "@mui/material/ButtonBase";
import { StackProps } from "@mui/material/Stack";
import { TypographyProps } from "@mui/material/Typography";

interface DropdownProps {
    children?: React.ReactNode;
    icon?: React.ReactNode;
    title?: string;
    titleColor?: string;
    textVariant?: TypographyProps["variant"];
    img?: string;
    imgStyle?: React.CSSProperties;
    iconColor?: string;
    contentPadding?: string | number;
    unmountOnExit?: boolean;
    defaultOpen?: boolean;
    reverse?: boolean;
    rotate?: number | [number, number] | false;
    axis?: "X" | "Y" | "Z";
    spacing?: string | number;
    justifyContent?: StackProps["justifyContent"];
}

export default function Dropdown({
    children,
    icon,
    title = "",
    titleColor,
    textVariant = "subtitle1",
    img,
    imgStyle,
    iconColor,
    contentPadding = "4px 24px",
    unmountOnExit = false,
    defaultOpen = false,
    reverse = false,
    rotate,
    axis = "Z",
    spacing = 0.5,
    justifyContent = "left",
}: DropdownProps) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("sm"));

    const [open, setOpen] = useState(defaultOpen);
    const toggleDropdownState = () => {
        setOpen(!open);
    };

    let start: number;
    let end: number;
    if (rotate === false) {
        (start = 0), (end = 0);
    } else if (Array.isArray(rotate)) {
        [start, end] = rotate;
    } else {
        (start = 0), (end = rotate ?? -90);
    }

    return (
        <Box>
            <FlexBox
                sx={{
                    maxWidth: "100%",
                    mb: "4px",
                    justifyContent: justifyContent,
                    flexDirection: reverse ? "row-reverse" : "row",
                }}
            >
                <ButtonBase
                    disableRipple
                    onClick={toggleDropdownState}
                    sx={{
                        ml: reverse && justifyContent === "left" ? spacing : 0,
                        mr: !reverse && justifyContent === "left" ? spacing : 0,
                        color: iconColor || theme.border.color.primary,
                        transform: open
                            ? `rotate${axis}(${start}deg)`
                            : `rotate${axis}(${end}deg)`,
                        transition: "transform 0.25s",
                    }}
                >
                    {icon || (
                        <ExpandMoreIcon
                            fontSize={matches ? "medium" : "small"}
                        />
                    )}
                </ButtonBase>
                <ButtonBase
                    disableRipple
                    onClick={toggleDropdownState}
                    sx={{
                        pl: !reverse && justifyContent === "left" ? 1 : 0,
                        ml:
                            !reverse && justifyContent === "left"
                                ? -spacing
                                : 0,
                    }}
                >
                    <TextLabel
                        icon={img}
                        iconProps={{
                            size: 32,
                            styles: { ...imgStyle },
                        }}
                        title={title}
                        titleProps={{
                            color: titleColor || theme.text.primary,
                            variant: textVariant,
                        }}
                    />
                </ButtonBase>
            </FlexBox>
            <Collapse in={open} timeout="auto" unmountOnExit={unmountOnExit}>
                <Box sx={{ p: contentPadding }}>{children}</Box>
            </Collapse>
        </Box>
    );
}
