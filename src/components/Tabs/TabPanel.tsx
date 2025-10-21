import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import { TransitionProps } from "@mui/material/transitions";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
    padding?: string | number;
    timeout?: TransitionProps["timeout"];
}

export default function TabPanel(props: TabPanelProps) {
    const { children, index, value, padding, timeout, ...other } = props;

    return (
        <Fade in={index === value} timeout={timeout || 250}>
            <div hidden={value !== index} {...other}>
                {value === index && (
                    <Box sx={{ p: padding ?? "16px" }}>{children}</Box>
                )}
            </div>
        </Fade>
    );
}
