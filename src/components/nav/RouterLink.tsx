import { forwardRef } from "react";
import { Link } from "react-router";
import { ButtonBase, ButtonBaseProps } from "@mui/material";

interface RouterLinkProps extends ButtonBaseProps {
    to: string;
    openInNewTab?: boolean;
}

const RouterLink = forwardRef((props: RouterLinkProps, ref) => {
    const { to, openInNewTab, children, ...other } = props;

    return (
        <ButtonBase
            ref={ref}
            component={Link}
            to={to}
            disableRipple
            disableTouchRipple
            target={openInNewTab ? "_blank" : "_self"}
            rel={openInNewTab ? "noopener" : undefined}
            {...other}
        >
            {children}
        </ButtonBase>
    );
});

export default RouterLink;
