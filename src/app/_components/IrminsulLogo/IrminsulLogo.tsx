import Link from "next/link";

// Component imports
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
    return (
        <ButtonBase href={href} LinkComponent={Link}>
            <FlexBox spacing={2} sx={{ height: size }}>
                <Image
                    src="main/icons/Irminsul"
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
                        }}
                    >
                        IRMINSUL.GG
                    </Text>
                )}
            </FlexBox>
        </ButtonBase>
    );
}
