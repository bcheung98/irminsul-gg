// MUI imports
import Toolbar from "@mui/material/Toolbar";

export default function NavBarMiniRoot({
    children,
    onKeyDown,
    disableGutters,
}: {
    children: React.ReactNode;
    onKeyDown?: (event: React.KeyboardEvent) => void;
    disableGutters?: boolean;
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
                justifyContent: { xs: "space-between", sm: "left" },
            })}
            onKeyDown={onKeyDown}
            disableGutters={disableGutters}
        >
            {children}
        </Toolbar>
    );
}
