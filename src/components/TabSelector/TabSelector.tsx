// MUI imports
import { useTheme } from "@mui/material/styles";
import Tab, { TabProps } from "@mui/material/Tab";

export default function TabSelector(props: TabProps) {
    const theme = useTheme();

    const { sx, ...other } = props;

    return (
        <Tab
            disableRipple
            sx={{
                ...{
                    textTransform: "none",
                    "&.Mui-selected": {
                        color: theme.text.selected,
                    },
                },
                ...sx,
            }}
            {...other}
        />
    );
}
