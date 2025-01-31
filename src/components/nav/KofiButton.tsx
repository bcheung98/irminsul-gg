// Component imports
import Image from "custom/Image";

// MUI imports
import { useTheme, useMediaQuery, Button, IconButton } from "@mui/material";

function KofiButton() {
    const theme = useTheme();
    const matches_up_lg = useMediaQuery(theme.breakpoints.up("lg"));

    const KofiImg = (
        <Image
            src="https://storage.ko-fi.com/cdn/brandasset/v2/kofi_symbol.png"
            alt="Ko-Fi"
            style={{
                height: "20px",
                width: "auto",
            }}
        />
    );

    return matches_up_lg ? (
        <Button
            href="https://ko-fi.com/bcheung"
            target="_blank"
            rel="noopener"
            variant="contained"
            disableElevation
            startIcon={KofiImg}
            sx={{
                backgroundColor: theme.palette.info.dark,
                color: theme.text.primary,
                height: "32px",
            }}
        >
            Buy me a Ko-Fi
        </Button>
    ) : (
        <IconButton
            href="https://ko-fi.com/bcheung"
            target="_blank"
            rel="noopener"
            disableRipple
            disableTouchRipple
            sx={{
                borderRadius: "8px",
                px: "2px",
                width: "36px",
                height: "36px",
                "&:hover": {
                    backgroundColor: theme.appbar.hover,
                },
            }}
        >
            {KofiImg}
        </IconButton>
    );
}

export default KofiButton;
