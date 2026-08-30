// Component imports
import TextLabel from "@/components/TextLabel";

// MUI imports
import ButtonBase from "@mui/material/ButtonBase";
import Avatar from "@mui/material/Avatar";

export default function KofiButton() {
    return (
        <ButtonBase
            href="https://ko-fi.com/bcheung"
            target="_blank"
            rel="noopener"
            sx={{
                height: "28px",
                px: { xs: 1, md: 2 },
                py: 0.5,
                borderRadius: "4px",
                backgroundColor: "#ce3833",
                "&:hover": {
                    backgroundColor: "#ce3833da",
                },
            }}
        >
            <TextLabel
                icon={
                    <Avatar
                        variant="square"
                        src="/kofi_symbol.png"
                        sx={{ width: "auto", height: "20px" }}
                    />
                }
                title="Ko-Fi"
                titleProps={{
                    variant: "subtitle2",
                    sx: {
                        display: {
                            xs: "inline",
                            md: "none",
                            lg: "inline",
                        },
                    },
                }}
            />
        </ButtonBase>
    );
}
