// Component imports
import Text from "@/components/Text";

// MUI imports
import { useTheme, alpha } from "@mui/material/styles";
import Card from "@mui/material/Card";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";

// Type imports
import { ContentBoxProps, ContentProps, HeaderProps } from "./ContentBox.types";

export default function ContentBox({
    component = "div",
    children,
    header = "",
    actions,
    headerProps,
    contentProps,
    elevation,
}: ContentBoxProps) {
    const theme = useTheme();

    const hProps: HeaderProps = {
        ...{
            dense: true,
            padding: "8px 16px",
            textVariant: "h6",
            gap: "8px",
            justifyContent: "space-between",
        },
        ...headerProps,
    };

    const cProps: ContentProps = {
        ...{ padding: "16px", overflowX: "visible" },
        ...contentProps,
    };

    return (
        <Card
            sx={{
                backgroundColor: alpha(
                    cProps.backgroundColor ||
                        theme.contentBox.backgroundColor.main,
                    0.95
                ),
                borderWidth: theme.contentBox.border.width,
                borderColor: theme.contentBox.border.color,
                borderRadius: theme.contentBox.border.radius,
                backdropFilter: "blur(4px)",
            }}
            elevation={elevation ?? 2}
        >
            <AppBar
                position="static"
                sx={{
                    backgroundColor: theme.contentBox.backgroundColor.header,
                    borderBottomWidth: children ? 1 : 0,
                }}
            >
                <Toolbar
                    variant={
                        hProps.dense || typeof header !== "string"
                            ? "dense"
                            : "regular"
                    }
                    disableGutters
                    sx={{
                        p: hProps.padding,
                        flexGrow: 1,
                        flexWrap: "wrap",
                        justifyContent: hProps.justifyContent,
                        gap: hProps.gap,
                    }}
                >
                    {typeof header === "string" ? (
                        <Text
                            variant={hProps.textVariant}
                            weight="highlight"
                            sx={{ color: theme.contentBox.color.header }}
                        >
                            {header}
                        </Text>
                    ) : (
                        <>{header}</>
                    )}
                    {actions}
                </Toolbar>
            </AppBar>
            {children && (
                <Box
                    sx={{
                        m: cProps.padding,
                        overflowX: cProps.overflowX,
                    }}
                    component={component}
                >
                    {children}
                </Box>
            )}
        </Card>
    );
}
