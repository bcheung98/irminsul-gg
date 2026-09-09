import { usePathname } from "next/navigation";

// Component imports
import NavLink from "@/components/NavLink";
import Text from "@/components/Text";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";

export default function CalendarButton() {
    const theme = useTheme();

    const href = "/calendar";
    const pathname = usePathname();
    const linkActive = pathname === href;

    return (
        <NavLink href={href}>
            <Button
                variant="text"
                sx={{
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
                    Calendar
                </Text>
            </Button>
        </NavLink>
    );
}
