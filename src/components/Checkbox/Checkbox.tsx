// MUI imports
import MuiCheckbox, { CheckboxProps } from "@mui/material/Checkbox";

export default function Checkbox(props: CheckboxProps) {
    return (
        <MuiCheckbox
            disableRipple
            sx={(theme) => ({
                width: 18,
                height: 18,
                p: 0,
                borderRadius: "3px",
                "&.MuiCheckbox-root": {
                    backgroundColor: theme.text.primary,
                },
                "&.Mui-checked": {
                    color: theme.palette.info.main,
                },
            })}
            {...props}
        />
    );
}
