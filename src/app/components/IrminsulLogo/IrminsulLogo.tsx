import Link from "next/link";
import Image from "next/image";

// Component imports
import { Text } from "@/components/Text/";
import FlexBox from "@/components/FlexBox";

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
                    src="https://assets.irminsul.gg/main/icons/Irminsul.png"
                    alt="IRMINSUL.GG"
                    width={size}
                    height={size}
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
