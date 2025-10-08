import Link from "next/link";
import { ButtonBaseProps } from "@mui/material/ButtonBase";

interface NavLinkProps extends ButtonBaseProps {
    href: string;
    openInNewTab?: boolean;
    children: React.ReactNode;
    disabled?: boolean;
}

export default function NavLink({
    href,
    openInNewTab,
    children,
    disabled,
}: NavLinkProps) {
    return !disabled ? (
        <Link
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
