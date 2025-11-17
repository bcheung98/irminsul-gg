// Component imports
import SelectInput from "@/components/SelectInput";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

interface SelectWithArrowsProps<T> {
    children: React.ReactNode;
    index: number;
    data: T[] | readonly T[];
    handleIndexChange: (event: SelectChangeEvent) => void;
    handleIndexChangeLeft: () => void;
    handleIndexChangeRight: () => void;
    width?: string | number;
    disabledLeft?: boolean;
    disabledRight?: boolean;
}

export default function SelectWithArrows<T>({
    children,
    index,
    data,
    handleIndexChange,
    handleIndexChangeLeft,
    handleIndexChangeRight,
    width = "100px",
    disabledLeft,
    disabledRight,
}: SelectWithArrowsProps<T>) {
    const theme = useTheme();

    const buttonStyle = {
        color: theme.contentBox.color.header,
        "&.Mui-disabled": {
            opacity: 0.35,
            color: theme.contentBox.color.header,
        },
    };
    return (
        <Grid container sx={{ alignItems: "center" }}>
            <Grid>
                <IconButton
                    onClick={handleIndexChangeLeft}
                    disabled={disabledLeft ?? index >= data.length - 1}
                    sx={buttonStyle}
                >
                    <KeyboardArrowLeftIcon />
                </IconButton>
            </Grid>
            <Grid>
                <Select
                    value={index.toString()}
                    label="Version"
                    onChange={handleIndexChange}
                    input={<SelectInput />}
                    sx={{ width: width }}
                >
                    {children}
                </Select>
            </Grid>
            <Grid>
                <IconButton
                    onClick={handleIndexChangeRight}
                    disabled={disabledRight ?? index === 0}
                    sx={buttonStyle}
                >
                    <KeyboardArrowRightIcon />
                </IconButton>
            </Grid>
        </Grid>
    );
}
