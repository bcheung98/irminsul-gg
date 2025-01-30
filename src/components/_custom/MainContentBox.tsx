// Component imports
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, Card, AppBar, Toolbar, Box } from "@mui/material";

interface HeaderProps {
    dense?: boolean;
    padding?: string | number;
}

interface ContentProps {
    padding?: string | number;
    backgroundColor?: string;
    overflowX?: "visible" | "hidden" | "clip" | "scroll" | "auto";
}

interface MainContentBoxProps {
    component?: React.ElementType;
    children?: React.ReactNode;
    title?: string | React.ReactNode;
    actions?: React.ReactNode;
    headerProps?: HeaderProps;
    contentProps?: ContentProps;
}

function MainContentBox({
    component = "div",
    children,
    title,
    actions,
    headerProps = {
        dense: true,
        padding: "8px 16px",
    },
    contentProps = {
        padding: "24px",
        overflowX: "visible",
    },
}: MainContentBoxProps) {
    const theme = useTheme();

    return (
        <Card
            sx={{
                backgroundColor:
                    contentProps.backgroundColor ||
                    theme.mainContentBox.backgroundColor,
                border: theme.mainContentBox.border,
                borderRadius: theme.mainContentBox.borderRadius,
            }}
        >
            <AppBar position="static">
                <Toolbar
                    variant={headerProps.dense ? "dense" : "regular"}
                    disableGutters
                    sx={{
                        p: headerProps.padding,
                        flexGrow: 1,
                        flexWrap: "wrap",
                        justifyContent: "space-between",
                        rowGap: "8px",
                    }}
                >
                    {typeof title === "string" ? (
                        <TextStyled
                            variant="h6-styled"
                            sx={{ color: theme.appbar.color }}
                        >
                            {title && title}
                        </TextStyled>
                    ) : (
                        <>{title}</>
                    )}
                    {actions && actions}
                </Toolbar>
            </AppBar>
            <Box
                sx={{
                    m:
                        contentProps.padding !== undefined
                            ? contentProps.padding
                            : "24px",
                    overflowX: contentProps.overflowX,
                }}
                component={component}
            >
                {children && children}
            </Box>
        </Card>
    );
}

export default MainContentBox;
