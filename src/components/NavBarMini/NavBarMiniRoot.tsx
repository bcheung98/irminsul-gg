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
                gap: "32px",
                zIndex: theme.zIndex.drawer + 1,
                alignItems: "center",
                justifyContent: "space-between",
            })}
            onKeyDown={onKeyDown}
        >
            {children}
        </Toolbar>
    );
}
