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
    textSpacing,
    isLink,
    alignItems = "center",
    justifyContent = "left",
}: TextLabelProps) {
    const theme = useTheme();

    return (
        <Stack
            direction="row"
            spacing={spacing || 1}
            alignItems={alignItems}
            justifyContent={justifyContent}
        >
            {typeof icon === "string" ? (
                <Image
                    src={icon}
                    size={iconProps?.size || 24}
                    style={{
                        borderRadius: iconProps?.borderRadius || "4px",
                        padding: iconProps?.padding || 0,
                    }}
                    tooltip={iconProps?.tooltip}
                />
            ) : (
                icon
            )}
            <Stack spacing={textSpacing || 0}>
                <Text
                    component={titleProps?.component || "span"}
                    variant={titleProps?.variant || "body1"}
                    sx={{
                        color: titleProps?.color || theme.text.primary,
                        textAlign: justifyContent,
                        "&:hover": {
                            color: isLink ? theme.text.selected : "global",
                            textDecoration: isLink ? "underline" : "none",
                            cursor: isLink
                                ? "pointer"
                                : titleProps?.defaultCursor || "inherit",
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
