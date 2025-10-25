import { useTheme, SxProps } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

interface SearchBarProps {
    autoFocus?: boolean;
    onChange?: (event: React.BaseSyntheticEvent) => void;
    value?: string;
    placeholder?: string;
    inputIcon?: React.ReactNode;
    sx?: SxProps;
    params?: any;
}

export default function SearchBar({
    autoFocus,
    onChange,
    value,
    placeholder = "Search",
    inputIcon,
    sx,
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
            fullWidth
            autoComplete="off"
            spellCheck={false}
            sx={{
                ...{
                    "& .MuiOutlinedInput-root": {
                        width: "100%",
                        height: "100%",
                        backgroundColor: theme.background(2),
                        color: theme.text.primary,
                        fontFamily: theme.typography.fontFamily,
                        fontWeight: theme.font.weight.primary,
                        borderRadius: "4px",
                        "& fieldset, &:hover fieldset, &:focus, &.Mui-focused fieldset":
                            { border: 0 },
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
