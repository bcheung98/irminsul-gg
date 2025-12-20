// Component imports
import Tooltip from "@/components/Tooltip";

// MUI imports
import { TypographyVariant, useTheme } from "@mui/material/styles";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

interface CloseButtonProps extends IconButtonProps {
    onClick: () => void;
    icon?: React.ReactNode;
    padding?: string | number;
    textColor?: string;
    hoverColor?: string;
    tooltip?: string;
    textVariant?: TypographyVariant;
    borderRadius?: string | number;
}

export default function CloseButton({
    onClick,
    icon,
    padding = 0.5,
    textColor,
    hoverColor,
    tooltip = "",
    textVariant = "h5",
    borderRadius,
}: CloseButtonProps) {
    const theme = useTheme();

    const Icon = icon || <CloseIcon sx={theme.typography[textVariant]} />;

    return (
        <Tooltip title={tooltip} arrow placement="top">
            <IconButton
                onClick={onClick}
                sx={{
                    color: textColor,
                    p: padding,
                    borderRadius: borderRadius,
                    "&:hover": {
                        backgroundColor:
                            hoverColor || theme.appbar.backgroundColor.hover,
                    },
                }}
            >
                {Icon}
            </IconButton>
        </Tooltip>
    );
}
