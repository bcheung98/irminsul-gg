// Component imports
import Image from "custom/Image";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { ButtonBase, Stack } from "@mui/material";

function Logo({ href = "/" }: { href?: string }) {
    return (
        <ButtonBase disableRipple disableTouchRipple href={href}>
            <Stack direction="row" spacing={2}>
                <Image
                    src="https://assets.irminsul.gg/main/icons/Irminsul.png"
                    alt="IRMINSUL.GG"
                    style={{ width: "48px", height: "48px" }}
                />
                <TextStyled variant="sitename" sx={{ lineHeight: "48px" }}>
                    IRMINSUL.GG
                </TextStyled>
            </Stack>
        </ButtonBase>
    );
}

export default Logo;
