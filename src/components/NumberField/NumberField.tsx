import { useId } from "react";

// MUI imports
import { useTheme } from "@mui/material/styles";
import { NumberField as BaseNumberField } from "@base-ui/react/number-field";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export default function NumberField({
    id: idProp,
    label,
    error,
    size = "medium",
    ...other
}: BaseNumberField.Root.Props & {
    label?: React.ReactNode;
    size?: "small" | "medium";
    error?: boolean;
}) {
    const theme = useTheme();

    let id = useId();
    if (idProp) {
        id = idProp;
    }

    return (
        <BaseNumberField.Root {...other}>
            <InputLabel htmlFor={id}>{label}</InputLabel>
            <BaseNumberField.Input
                id={id}
                type="text"
                render={(props, state) => (
                    <OutlinedInput
                        autoComplete="off"
                        label={label}
                        inputRef={props.ref}
                        value={state.inputValue}
                        onBlur={props.onBlur}
                        onChange={props.onChange}
                        onKeyUp={props.onKeyUp}
                        onKeyDown={props.onKeyDown}
                        onFocus={props.onFocus}
                        slotProps={{
                            input: {
                                ...props,
                                sx: {
                                    fontFamily: theme.typography.fontFamily,
                                    fontWeight: theme.font.weight.highlight,
                                    fontSize: {
                                        xs: theme.font.sizes.body1.xs,
                                        sm: theme.font.sizes.body1.sm,
                                    },
                                    color: theme.text.primary,
                                    boxSizing: "border-box",
                                },
                            },
                        }}
                        endAdornment={
                            <InputAdornment
                                position="end"
                                sx={{
                                    flexDirection: "column",
                                    maxHeight: "unset",
                                    alignSelf: "stretch",
                                    borderLeft: "1px solid",
                                    borderColor: "divider",
                                    ml: 0,
                                    "& button": {
                                        py: 0,
                                        flex: 1,
                                        borderRadius: 0.5,
                                    },
                                }}
                            >
                                <BaseNumberField.Increment
                                    render={
                                        <IconButton
                                            size={size}
                                            aria-label="Increase"
                                        />
                                    }
                                >
                                    <KeyboardArrowUpIcon
                                        fontSize={size}
                                        sx={{ transform: "translateY(2px)" }}
                                    />
                                </BaseNumberField.Increment>
                                <BaseNumberField.Decrement
                                    render={
                                        <IconButton
                                            size={size}
                                            aria-label="Decrease"
                                        />
                                    }
                                >
                                    <KeyboardArrowDownIcon
                                        fontSize={size}
                                        sx={{ transform: "translateY(-2px)" }}
                                    />
                                </BaseNumberField.Decrement>
                            </InputAdornment>
                        }
                        sx={{
                            pr: 0,
                            outline: `1px solid ${theme.border.color.primary}`,
                            backgroundColor: theme.background(0),
                        }}
                    />
                )}
            />
        </BaseNumberField.Root>
    );
}
