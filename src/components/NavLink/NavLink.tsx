import Link from "next/link";
import { ButtonBaseProps } from "@mui/material/ButtonBase";

interface NavLinkProps extends ButtonBaseProps {
    href: string;
    openInNewTab?: boolean;
    children: React.ReactNode;
    disabled?: boolean;
    style?: React.CSSProperties;
}

export default function NavLink({
    href,
    openInNewTab,
    children,
    disabled,
    style,
}: NavLinkProps) {
    return !disabled ? (
        <Link
            style={style}
            href={href}
            target={openInNewTab ? "_blank" : "_self"}
            rel={openInNewTab ? "noopener" : undefined}
        >
            {children}
        </Link>
    ) : (
        children
    );
}
