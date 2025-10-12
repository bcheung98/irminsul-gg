// Component imports
import Text from "../Text";

// MUI imports
import { useTheme, alpha } from "@mui/material/styles";
import Card from "@mui/material/Card";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";

// Type imports
import { ContentBoxProps } from "./ContentBox.types";

export default function ContentBox({
    component = "div",
    children,
    header = "",
    actions,
    headerProps = {
        dense: true,
        padding: "8px 16px",
        textVariant: "h6",
    },
    contentProps = {
        padding: "16px",
        overflowX: "visible",
    },
}: ContentBoxProps) {
    const theme = useTheme();

    return (
        <Card
            sx={{
                backgroundColor: alpha(
                    contentProps.backgroundColor ||
                        theme.contentBox.backgroundColor.main,
                    0.95
                ),
                borderWidth: theme.contentBox.border.width,
                borderColor: theme.contentBox.border.color,
                borderRadius: theme.contentBox.border.radius,
                backdropFilter: "blur(4px)",
            }}
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
                        headerProps.dense || typeof header !== "string"
                            ? "dense"
                            : "regular"
                    }
                    disableGutters
                    sx={{
                        p: headerProps.padding,
                        flexGrow: 1,
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                        gap: "8px",
                    }}
                >
                    {typeof header === "string" ? (
                        <Text
                            variant={headerProps.textVariant}
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
                        m: contentProps.padding,
                        overflowX: contentProps.overflowX,
                    }}
                    component={component}
                >
                    {children}
                </Box>
            )}
        </Card>
    );
}
