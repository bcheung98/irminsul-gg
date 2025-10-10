import { BaseSyntheticEvent, useState } from "react";
import { usePathname } from "next/navigation";
import parse from "html-react-parser";

// Component imports
import Image from "../Image";
import ContentBox from "../ContentBox/ContentBox";
import FlexBox from "../FlexBox";
import Text from "../Text";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

// Type imports
import { CharacterOutfit } from "@/types/character";

export default function CharacterSplash({
    name,
    outfits,
}: {
    name: string;
    outfits: CharacterOutfit[];
}) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("sm"));

    const game = usePathname().split("/")[1];

    const [tabValue, setTabValue] = useState(0);
    const handleTabChange = (_: BaseSyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };
    const handleTabChangeLeft = () => {
        if (tabValue - 1 >= 0) {
            setTabValue(tabValue - 1);
        } else {
            setTabValue(outfits.length - 1);
        }
    };
    const handleTabChangeRight = () => {
        if (tabValue + 1 < outfits.length) {
            setTabValue(tabValue + 1);
        } else {
            setTabValue(0);
        }
    };

    const buttonStyle = {
        display: outfits.length > 1 ? "flex" : "none",
        color: theme.text.primary,
        px: 0,
        "&.Mui-disabled": {
            opacity: 0.35,
            color: theme.text.primary,
        },
    };

    const imgSrcSplash =
        tabValue === 0
            ? `${game}/characters/splash/${name}`
            : `${game}/characters/outfits/splash/${outfits[tabValue].name}`;

    return (
        <>
            <Card
                sx={{
                    backgroundColor: theme.background(1),
                    width: "100%",
                    height: "auto",
                }}
            >
                <Image
                    src={imgSrcSplash}
                    style={{
                        width: "100%",
                        height: "600px",
                        objectFit: "cover",
                        overflowClipMargin: "unset", // removes "crispy" effect from `object-fit: cover`
                        borderBottom: `1px solid ${theme.border.color.primary}`,
                        backgroundColor: theme.background(2),
                    }}
                />
                <FlexBox
                    sx={{
                        alignItems: "center",
                        justifyContent: "center",
                        p: "4px 8px 8px",
                        height: "48px",
                    }}
                >
                    <IconButton
                        onClick={handleTabChangeLeft}
                        sx={buttonStyle}
                        disableRipple
                    >
                        <KeyboardArrowLeftIcon />
                    </IconButton>
                    <Button
                        variant="contained"
                        color="primary"
                        // onClick={handleDialogOpen}
                        disableRipple
                    >
                        View Outfits
                    </Button>
                    <IconButton
                        onClick={handleTabChangeRight}
                        sx={buttonStyle}
                        disableRipple
                    >
                        <KeyboardArrowRightIcon />
                    </IconButton>
                </FlexBox>
            </Card>
        </>
    );
}
