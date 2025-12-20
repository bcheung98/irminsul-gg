import { createContext, useContext } from "react";

// Component imports
import Text from "@/components/Text";

// MUI imports
import { SxProps, Theme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

// Type imports
import { UmaCharacter, UmaSupport } from "@/types/uma";

export const TEHelperDataContext = createContext<{
    characters: UmaCharacter[];
    supports: UmaSupport[];
}>({ characters: [], supports: [] });

export function useTEHelperData() {
    return useContext(TEHelperDataContext);
}

export function TEHItemTitle({ children }: { children: React.ReactNode }) {
    return (
        <Text
            variant="body2"
            weight="highlight"
            sx={{
                textAlign: "center",
                "&:hover": {
                    cursor: "pointer",
                },
            }}
        >
            {children}
        </Text>
    );
}

export function TEHAddItem({
    mini,
    sx,
}: {
    mini?: boolean;
    sx?: SxProps<Theme>;
}) {
    return (
        <Card sx={sx}>
            {!mini && (
                <AddCircleOutlineIcon
                    fontSize="large"
                    sx={(theme) => ({ color: theme.text.primary })}
                />
            )}
        </Card>
    );
}

export function TEHInvalidTag({
    invalid,
    message = "Selected",
    color,
}: {
    invalid?: boolean;
    message?: string;
    color?: string;
}) {
    return invalid ? (
        <Card
            sx={(theme) => ({
                position: "absolute",
                top: 0,
                right: 0,
                px: 1,
                backgroundColor: color || theme.palette.error.main,
                borderRadius: "4px",
                userSelect: "none",
            })}
        >
            <Text variant="body2" weight="highlight">
                {message}
            </Text>
        </Card>
    ) : null;
}

export const TEHRootStackParams = {
    spacing: 1,
    alignItems: "center",
    justifyContent: "center",
};

export const searchResultStyle =
    (invalid = false): SxProps<Theme> =>
    (theme) => ({
        opacity: invalid ? 0.5 : 1,
        p: 1,
        borderRadius: "4px",
        backgroundColor: theme.background(0, "dark"),
        "&:hover": {
            backgroundColor: invalid
                ? theme.background(0, "dark")
                : theme.background(0, "light"),
            cursor: invalid ? "not-allowed" : "pointer",
        },
    });
