import { styled } from "@mui/material/styles";
import MuiMenuItem from "@mui/material/MenuItem";

const MenuItem = styled(MuiMenuItem)(({ theme }) => ({
    "&.MuiMenuItem-root": {
        backgroundColor: theme.menu.backgroundColor.primary,
        color: theme.text.primary,
        "&:hover": {
            backgroundColor: theme.menu.backgroundColor.hover,
        },
        "&.Mui-selected": {
            backgroundColor: theme.menu.backgroundColor.selected,
            "&:hover": {
                backgroundColor: theme.menu.backgroundColor.selectedHover,
            },
        },
    },
}));

export default MenuItem;
