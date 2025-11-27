// Component imports
import Image from "@/components/Image";
import Text from "@/components/Text";
import NavLink from "@/components/NavLink";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

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
    href,
    alignItems = "center",
    justifyContent = "left",
    reverse = false,
}: TextLabelProps) {
    const theme = useTheme();

    const IconRoot =
        typeof icon === "string" ? (
            <Image
                src={icon}
                size={iconProps?.size || 24}
                style={{
                    ...{
                        borderRadius: iconProps?.borderRadius || "4px",
                        padding: iconProps?.padding || 0,
                        cursor: href
                            ? "pointer"
                            : titleProps?.defaultCursor || "inherit",
                    },
                    ...iconProps?.styles,
                }}
                tooltip={iconProps?.tooltip}
                responsive
                responsiveSize={0.2}
                supressLoadImageWarning={iconProps?.supressLoadImageWarning}
                fallbackSrc={iconProps?.fallbackSrc}
            />
        ) : (
            icon
        );

    function Icon() {
        return href ? (
            <NavLink href={href} style={{ display: "inline-flex" }}>
                {IconRoot}
            </NavLink>
        ) : (
            IconRoot
        );
    }

    const TitleRoot = (
        <Text
            component={titleProps?.component || "span"}
            variant={titleProps?.variant || "body1"}
            weight={titleProps?.weight || "highlight"}
            sx={{
                ...{
                    color: titleProps?.color || theme.text.primary,
                    textAlign: justifyContent,
                    "&:hover": {
                        color: href ? theme.text.selected : "global",
                        textDecoration: href ? "underline" : "none",
                        cursor: href
                            ? "pointer"
                            : titleProps?.defaultCursor || "inherit",
                    },
                },
                ...titleProps?.sx,
            }}
        >
            {title}
        </Text>
    );

    function Title() {
        return href ? (
            <NavLink href={href} style={{ display: "inline-flex" }}>
                {TitleRoot}
            </NavLink>
        ) : (
            TitleRoot
        );
    }

    const Subtitle =
        typeof subtitle === "string" || typeof subtitle === "number" ? (
            <Text
                component={subtitleProps?.component || "span"}
                variant={subtitleProps?.variant || "body2"}
                weight={subtitleProps?.weight || "highlight"}
                sx={{ color: subtitleProps?.color || "inherit" }}
            >
                {subtitle}
            </Text>
        ) : (
            <>{subtitle}</>
        );

    return (
        <Stack
            direction={reverse ? "row-reverse" : "row"}
            spacing={spacing || 1}
            alignItems={alignItems}
            justifyContent={justifyContent}
        >
            {icon && Icon()}
            {(title || subtitle) &&
                (!subtitle ? (
                    <Stack spacing={textSpacing ?? 0}>{Title()}</Stack>
                ) : (
                    <Box>
                        <Box sx={{ textAlign: "left" }}>{Title()}</Box>
                        <Box sx={{ mt: textSpacing ?? 0 }}>{Subtitle}</Box>
                    </Box>
                ))}
        </Stack>
    );
}
