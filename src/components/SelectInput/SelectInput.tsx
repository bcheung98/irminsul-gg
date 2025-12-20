import { styled, InputBase } from "@mui/material";

const SelectInput = styled(InputBase)(({ theme }) => ({
    "& .MuiInputBase-input": {
        backgroundColor: theme.menu.backgroundColor.primary,
        borderRadius: "4px",
        border: `1px solid ${theme.border.color.primary}`,
        padding: "4px 8px 4px 16px",
        "&:focus": {
            borderRadius: "4px",
            backgroundColor: theme.menu.backgroundColor.selectedHover,
        },
    },
}));

export default SelectInput;
