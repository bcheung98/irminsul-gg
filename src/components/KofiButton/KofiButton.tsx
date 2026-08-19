// Component imports
import TextLabel from "@/components/TextLabel";

// MUI imports
import useMediaQuery from "@mui/material/useMediaQuery";
import ButtonBase from "@mui/material/ButtonBase";
import Avatar from "@mui/material/Avatar";

export default function KofiButton() {
    const matches_up_lg = useMediaQuery((theme) => theme.breakpoints.up("lg"));
    const matches_dn_md = useMediaQuery((theme) =>
        theme.breakpoints.down("md"),
    );
    const matches = matches_up_lg || matches_dn_md;

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
                title={matches && "Ko-Fi"}
                titleProps={{ variant: "subtitle2" }}
            />
        </ButtonBase>
    );
}
