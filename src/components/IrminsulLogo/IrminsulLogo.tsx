// Component imports
import NavLink from "@/components/NavLink";
import Image from "@/components/Image";
import FlexBox from "@/components/FlexBox";
import Text from "@/components/Text";

// MUI imports
import { useTheme } from "@mui/material/styles";
import ButtonBase from "@mui/material/ButtonBase";

export default function IrminsulLogo({
    size = 40,
    href = "/",
    showText = true,
}: {
    size?: number;
    href?: string;
    showText?: boolean;
}) {
    const theme = useTheme();

    let { imgURL, filter, textBackground, textBackgroundHover } =
        theme.irminsulLogo;

    const today = new Date();
    if (today.getMonth() === 5) {
        textBackground = `linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(255,154,0,1) 10%, rgba(255, 210, 64, 1) 20%, rgba(79,220,74,1) 30%, rgba(63,218,216,1) 40%, rgba(47,201,226,1) 50%, rgba(28,127,238,1) 60%, rgba(166, 121, 255, 1) 70%, rgba(207, 75, 255, 1) 80%, rgba(255, 0, 221, 1) 90%)`;
    }

    return (
        <ButtonBase href={href} LinkComponent={NavLink}>
            <FlexBox spacing={1.5} sx={{ height: size }}>
                <Image
                    src={`_common/logo/${imgURL}`}
                    alt="IRMINSUL.GG"
                    size={size}
                    responsive
                    responsiveSize={0.2}
                    style={{ filter: filter }}
                />
                {showText && (
                    <Text
                        variant="sitename"
                        sx={{
                            userSelect: "none",
                            lineHeight: `${size}px`,
                            display: {
                                "@": "none",
                                "@450": "block",
                            },
                            background: textBackground,
                            backgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            "&:hover": {
                                background: textBackgroundHover,
                                backgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            },
                        }}
                    >
                        IRMINSUL.GG
                    </Text>
                )}
            </FlexBox>
        </ButtonBase>
    );
}
