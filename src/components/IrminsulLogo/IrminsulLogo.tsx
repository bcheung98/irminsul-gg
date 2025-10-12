// Component imports
import NavLink from "@/components/NavLink";
import Image from "@/components/Image";
import FlexBox from "@/components/FlexBox";
import Text from "@/components/Text";

// MUI imports
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
    let imgURL = "logo_red";
    let textBackground = "white";

    const today = new Date();
    if (today.getMonth() === 5) {
        textBackground = `linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(255,154,0,1) 10%, rgba(208,222,33,1) 20%, rgba(79,220,74,1) 30%, rgba(63,218,216,1) 40%, rgba(47,201,226,1) 50%, rgba(28,127,238,1) 60%, rgba(95,21,242,1) 70%, rgba(186,12,248,1) 80%, rgba(251,7,217,1) 90%)`;
        imgURL = "logo_rainbow";
    }

    return (
        <ButtonBase href={href} LinkComponent={NavLink}>
            <FlexBox spacing={2} sx={{ height: size }}>
                <Image
                    src={`main/logo/${imgURL}`}
                    alt="IRMINSUL.GG"
                    size={size}
                    responsive
                    responsiveSize={0.2}
                />
                {showText && (
                    <Text
                        variant="sitename"
                        sx={{
                            lineHeight: `${size}px`,
                            display: {
                                "@": "none",
                                "@350": "block",
                            },
                            background: textBackground,
                            backgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        IRMINSUL.GG
                    </Text>
                )}
            </FlexBox>
        </ButtonBase>
    );
}
