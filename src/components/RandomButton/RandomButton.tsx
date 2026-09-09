// Component imports
import NavLink from "@/components/NavLink";
import Text from "@/components/Text";
import Tooltip from "@/components/Tooltip";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";

// Helper imports
import { useRandomPageShortcut } from "./RandomButton.hooks";

export default function RandomButton() {
    const theme = useTheme();

    useRandomPageShortcut();

    const href = "/random";

    return (
        <Tooltip title="Load a random page [alt-x]" arrow>
            <div>
                <NavLink href={href}>
                    <Button
                        variant="text"
                        sx={{
                            transition: "color 0.25s",
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
                            Random
                        </Text>
                    </Button>
                </NavLink>
            </div>
        </Tooltip>
    );
}
