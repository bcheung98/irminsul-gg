import { usePathname } from "next/navigation";

// Component imports
import NavButton from "@/components/NavButton";
import NavLink from "@/components/NavLink";
import Text from "@/components/Text";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Button from "@mui/material/Button";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export default function CalendarButton() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));

    const href = "/calendar";
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
                <Text variant="body2" sx={{ color: "inherit" }}>
                    Calendar
                </Text>
            </Button>
        </NavLink>
    ) : (
        <NavButton
            title="Calendar"
            href={href}
            sx={{ display: { xs: "flex", md: "none" } }}
        >
            <CalendarMonthIcon />
        </NavButton>
    );
}
