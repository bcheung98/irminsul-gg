// MUI imports
import Toolbar from "@mui/material/Toolbar";

export default function NavBarMiniRoot({
    children,
    onKeyDown,
}: {
    children: React.ReactNode;
    onKeyDown?: (event: React.KeyboardEvent) => void;
}) {
    return (
        <Toolbar
            role="presentation"
            variant="dense"
            sx={(theme) => ({
                containerType: "inline-size",
                gap: "24px",
                zIndex: theme.zIndex.drawer + 1,
                alignItems: "center",
                minHeight: "36px",
                flexDirection: { xs: "row-reverse", md: "row" },
                justifyContent: { xs: "space-between", md: "left" },
            })}
            onKeyDown={onKeyDown}
        >
            {children}
        </Toolbar>
    );
}
