// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Tabs, { TabsProps } from "@mui/material/Tabs";

interface CustomTabsProps extends TabsProps {
    tabcolor?: string;
    showIndicator?: boolean;
}

export default function TabList(props: CustomTabsProps) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("sm"));

    const { children, value, onChange, sx, showIndicator, ...other } = props;

    return (
        <Tabs
            value={value}
            onChange={onChange}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile={!matches}
            sx={{
                ...{
                    height: "100%",
                    "& .MuiTabs-indicator": {
                        display: "flex",
                        justifyContent: "center",
                        backgroundColor: "transparent",
                    },
                    "& .MuiTabScrollButton-root": {
                        color: theme.text.primary,
                        backgroundColor: theme.background(2),
                    },
                    ".MuiTabs-scrollButtons.Mui-disabled": {
                        opacity: 0.3,
                    },
                    "& .MuiTabs-indicatorSpan": {
                        width: showIndicator ? "100%" : "0",
                        backgroundColor:
                            props.tabcolor || theme.border.color.primary,
                    },
                },
                ...sx,
            }}
            {...other}
            slotProps={{
                indicator: {
                    children: <span className="MuiTabs-indicatorSpan" />,
                },
            }}
        >
            {children}
        </Tabs>
    );
}
