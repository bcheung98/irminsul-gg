import Box from "@mui/material/Box";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
    padding?: string | number;
}

export default function TabPanel(props: TabPanelProps) {
    const { children, index, value, padding, ...other } = props;

    return (
        <div hidden={value !== index} {...other}>
            {value === index && (
                <Box sx={{ p: padding ?? "16px" }}>{children}</Box>
            )}
        </div>
    );
}
