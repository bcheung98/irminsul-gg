// Component imports
import Image from "@/components/Image";
import TextLabel from "@/components/TextLabel";

// MUI imports
import ButtonBase from "@mui/material/ButtonBase";

export default function KofiButton() {
    return (
        <ButtonBase
            href="https://ko-fi.com/bcheung"
            target="_blank"
            rel="noopener"
            sx={{
                px: { xs: 1, md: 2 },
                py: 0.5,
                borderRadius: "8px",
                backgroundColor: "#ce3833",
                "&:hover": {
                    backgroundColor: "#ce3833da",
                },
            }}
        >
            <TextLabel
                icon={
                    <Image
                        src="https://storage.ko-fi.com/cdn/brandasset/v2/kofi_symbol.png"
                        alt="Ko-Fi"
                        size={[24, 0]}
                    />
                }
                title="Ko-Fi"
                titleProps={{ variant: "subtitle1" }}
            />
        </ButtonBase>
    );
}
