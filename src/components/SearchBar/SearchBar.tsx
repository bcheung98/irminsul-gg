import { useTheme, SxProps } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps {
    autoFocus?: boolean;
    onChange?: (event: React.BaseSyntheticEvent) => void;
    onKeyDown?: (event: React.KeyboardEvent) => void;
    value?: string;
    placeholder?: string;
    inputIcon?: React.ReactNode;
    sx?: SxProps;
    backgroundColor?: string;
    height?: string;
    params?: any;
}

export default function SearchBar({
    autoFocus,
    onChange,
    onKeyDown,
    value,
    placeholder = "Search",
    inputIcon,
    sx,
    backgroundColor,
    height,
    params,
}: SearchBarProps) {
    const theme = useTheme();

    return (
        <TextField
            autoFocus={autoFocus}
            focused
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            onKeyDown={onKeyDown}
            fullWidth
            autoComplete="off"
            spellCheck={false}
            {...params}
            sx={{
                ...{
                    "& .MuiOutlinedInput-root": {
                        width: "100%",
                        height: height || "100%",
                        backgroundColor: backgroundColor || theme.background(2),
                        color: theme.text.primary,
                        fontFamily: theme.typography.fontFamily,
                        fontWeight: theme.font.weight.primary,
                        borderRadius: "4px",
                        "& fieldset, &:hover fieldset, &:focus, &.Mui-focused fieldset":
                            { border: 0 },
                        "input::placeholder": {
                            ...theme.typography.subtitle1,
                            fontWeight: theme.font.weight.primary,
                        },
                    },
                },
                ...sx,
            }}
            slotProps={{
                input: {
                    ...params?.InputProps,
                    startAdornment: (
                        <>
                            <InputAdornment
                                position="start"
                                sx={{ color: theme.text.primary }}
                            >
                                {inputIcon || <SearchIcon />}
                            </InputAdornment>
                            {params?.InputProps?.startAdornment}
                        </>
                    ),
                },
            }}
        />
    );
}
