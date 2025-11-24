// MUI imports
import Menu from "@mui/material/Menu";

type Context = {
    mouseX: number;
    mouseY: number;
} | null;

interface ContextMenuProps {
    children: React.ReactNode;
    context: Context;
    handleClose: () => void;
    padding?: string | number;
}

export default function ContextMenu({
    children,
    context,
    handleClose,
    padding = 1,
}: ContextMenuProps) {
    return (
        <Menu
            open={context !== null}
            onClose={handleClose}
            anchorReference="anchorPosition"
            anchorPosition={
                context !== null
                    ? { top: context.mouseY, left: context.mouseX }
                    : undefined
            }
            sx={(theme) => ({
                "& .MuiMenu-paper": {
                    outline: `1px solid ${theme.border.color.secondary}`,
                    borderRadius: theme.contentBox.border.radius,
                },
                "& .MuiMenu-list": {
                    p: padding,
                    backgroundColor: theme.background(2, "light"),
                },
            })}
        >
            {children}
        </Menu>
    );
}
