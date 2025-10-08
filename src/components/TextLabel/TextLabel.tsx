// Component imports
import Image from "../Image";
import Text from "../Text/";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";

// Type imports
import { TextLabelProps } from "./TextLabel.types";

export default function TextLabel({
    icon,
    iconProps,
    title,
    subtitle,
    titleProps,
    subtitleProps,
    spacing,
    isLink,
}: TextLabelProps) {
    const theme = useTheme();

    return (
        <Stack direction="row" spacing={spacing || 1} alignItems="center">
            {typeof icon === "string" ? (
                <Image
                    src={icon}
                    size={iconProps?.size || 24}
                    style={{
                        borderRadius: iconProps?.borderRadius || "4px",
                        padding: iconProps?.padding || 0,
                    }}
                />
            ) : (
                icon
            )}
            <Stack>
                <Text
                    variant={titleProps?.variant || "body1"}
                    sx={{
                        color: titleProps?.color || theme.text.primary,
                        "&:hover": {
                            color: isLink ? theme.text.selected : "global",
                            textDecoration: isLink ? "underline" : "none",
                            cursor: isLink
                                ? "pointer"
                                : titleProps?.defaultCursor || "default",
                        },
                    }}
                >
                    {title}
                </Text>
                {subtitle && (
                    <Text
                        variant={subtitleProps?.variant || "body2"}
                        sx={{ color: subtitleProps?.color || "inherit" }}
                    >
                        {subtitle}
                    </Text>
                )}
            </Stack>
        </Stack>
    );
}
