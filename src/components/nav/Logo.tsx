// Component imports
import Image from "custom/Image";
import RouterLink from "./RouterLink";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { Stack } from "@mui/material";

function Logo({
    size = "48px",
    href = "/",
    showText = true,
}: {
    size?: string;
    href?: string;
    showText?: boolean;
}) {
    return (
        <RouterLink to={href}>
            <Stack direction="row" spacing={2}>
                <Image
                    src="https://assets.irminsul.gg/main/icons/Irminsul.png"
                    alt="IRMINSUL.GG"
                    style={{ width: size, height: size }}
                />
                {showText && (
                    <TextStyled
                        variant="sitename"
                        sx={{
                            lineHeight: size,
                            display: {
                                "@": "none",
                                "@300": "block",
                            },
                        }}
                    >
                        IRMINSUL.GG
                    </TextStyled>
                )}
            </Stack>
        </RouterLink>
    );
}

export default Logo;
