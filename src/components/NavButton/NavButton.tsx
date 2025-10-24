import { usePathname } from "next/navigation";

// Component imports
import NavLink from "@/components/NavLink";
import Tooltip from "@/components/Tooltip";

// MUI imports
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { SxProps } from "@mui/material/styles";

interface NavButtonProps {
    href?: string;
    title?: string;
    children?: React.ReactNode;
    sx?: SxProps;
    onClick?: (args: any) => void;
    openInNewTab?: boolean;
}

export default function NavButton({
    href = "",
    title,
    children,
    sx,
    onClick,
    openInNewTab,
}: NavButtonProps) {
    const theme = useTheme();

    const pathname = usePathname();

    const defaultStyles = {
        px: 0,
        color:
            href && pathname.includes(href)
                ? theme.text.selected
                : theme.text.primary,
        fontSize: 0,
        "&:hover": {
            color: theme.text.selected,
        },
    };

    const styles = { ...defaultStyles, ...sx };

    return (
        <Tooltip title={title}>
            <IconButton sx={styles} onClick={onClick}>
                {href ? (
                    <NavLink href={href} openInNewTab={openInNewTab}>
                        {children}
                    </NavLink>
                ) : (
                    children
                )}
            </IconButton>
        </Tooltip>
    );
}
