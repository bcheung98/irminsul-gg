// Component imports
import Image from "custom/Image";

// MUI imports
import { useTheme, Button } from "@mui/material";

function KofiButton() {
    const theme = useTheme();

    return (
        <Button
            href="https://ko-fi.com/bcheung"
            target="_blank"
            rel="noopener"
            variant="contained"
            disableElevation
            startIcon={
                <Image
                    src="https://storage.ko-fi.com/cdn/brandasset/v2/kofi_symbol.png"
                    alt="Ko-Fi"
                    style={{
                        height: "20px",
                    }}
                />
            }
            sx={{
                backgroundColor: {
                    xs: theme.palette.primary.main,
                    sm: theme.palette.info.dark,
                },
                color: theme.text.primary,
            }}
        >
            Support me on Ko-Fi
        </Button>
    );
}

export default KofiButton;
