import { usePathname } from "next/navigation";

// Component imports
import NavButton from "@/components/NavButton";
import NavLink from "@/components/NavLink";
import Text from "@/components/Text";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Button from "@mui/material/Button";
import ArticleIcon from "@mui/icons-material/Article";

export default function BlogButton() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));

    const href = "/blog";
    const pathname = usePathname();
    const linkActive = pathname === href;

    return matches ? (
        <NavLink href={href}>
            <Button
                variant="text"
                sx={{
                    display: { xs: "none", md: "flex" },
                    transition: "color 0.25s",
                    color: linkActive
                        ? theme.text.selected
                        : theme.text.primary,
                    textShadow: linkActive
                        ? `${theme.text.selected} 1px 1px 8px`
                        : "none",
                    "&:hover": {
                        color: theme.text.selected,
                        textShadow: `${theme.text.selected} 1px 1px 8px`,
                    },
                }}
            >
                <Text
                    variant="body2"
                    weight="highlight"
                    sx={{
                        color: "inherit",
                    }}
                >
                    Blog
                </Text>
            </Button>
        </NavLink>
    ) : (
        <NavButton
            title="Blog"
            href={href}
            sx={{ display: { xs: "flex", md: "none" } }}
        >
            <ArticleIcon />
        </NavButton>
    );
}
