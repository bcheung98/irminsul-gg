"use client";

import Text, { TextProps } from "@/components/Text";
import { useTheme } from "@mui/material/styles";

export function H4({ children }: TextProps) {
    return (
        <Text variant="h4" weight="highlight" gutterBottom>
            {children}
        </Text>
    );
}

export function H5({ children }: TextProps) {
    return (
        <Text variant="h5" weight="highlight" gutterBottom>
            {children}
        </Text>
    );
}

export function H6({ children }: TextProps) {
    return (
        <Text variant="h6" weight="highlight" gutterBottom>
            {children}
        </Text>
    );
}

export function SubHeader({ children, weight = "highlight", sx }: TextProps) {
    return (
        <Text
            weight={weight}
            sx={{
                ...sx,
            }}
            gutterBottom
        >
            {children}
        </Text>
    );
}

export function Description({ children, weight, sx }: TextProps) {
    const theme = useTheme();

    return (
        <Text
            variant="subtitle1"
            weight={weight}
            sx={{
                color: theme.text.description,
                ...sx,
            }}
            gutterBottom
        >
            {children}
        </Text>
    );
}

export function DescriptionSmall({ children, weight, sx }: TextProps) {
    const theme = useTheme();

    return (
        <Text
            variant="body2"
            weight={weight}
            sx={{
                lineHeight: theme.typography.subtitle2.lineHeight,
                color: theme.text.description,
                ...sx,
            }}
            gutterBottom
        >
            {children}
        </Text>
    );
}
