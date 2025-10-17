import { BaseSyntheticEvent, useState } from "react";
import { usePathname } from "next/navigation";
import parse from "html-react-parser";

// Component imports
import Image from "../Image";
import FlexBox from "../FlexBox";
import ContentDialog from "../ContentDialog";
import { default as Tabs } from "../Tabs";
import Text from "../Text";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Fade from "@mui/material/Fade";
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

    const game = usePathname().split("/")[1];

    const [dialogOpen, setDialogOpen] = useState(false);
    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

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
                        onClick={handleDialogOpen}
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
            <ContentDialog
                open={dialogOpen}
                setOpen={setDialogOpen}
                header="Outfits"
                contentProps={{ padding: 0 }}
            >
                <Tabs.List value={tabValue} onChange={handleTabChange}>
                    {outfits.map((outfit, index) => (
                        <Tabs.Selector
                            key={index}
                            icon={
                                <Image
                                    src={
                                        index === 0
                                            ? `${game}/characters/icons/${name}`
                                            : `${game}/characters/outfits/icon/${outfit.name}`
                                    }
                                    size={64}
                                    responsive
                                    style={{
                                        border: `2px solid ${theme.border.color.primary}`,
                                        borderRadius: "4px",
                                        backgroundImage: `url(https://assets.irminsul.gg/genshin/backgrounds/Background_${outfit.rarity}_Star.png)`,
                                        backgroundSize: "contain",
                                    }}
                                />
                            }
                        />
                    ))}
                </Tabs.List>
                {outfits.map((outfit, index) => (
                    <Tabs.Panel key={index} index={index} value={tabValue}>
                        <Box sx={{ minHeight: "96px" }}>
                            <Text variant="h6" gutterBottom>
                                {outfit.displayName || outfit.name}
                            </Text>
                            <Text
                                sx={{
                                    color: theme.text.description,
                                }}
                            >
                                {parse(outfit.description)}
                            </Text>
                        </Box>
                        <Fade in={index === tabValue} timeout={500}>
                            <Card elevation={0} sx={{ minHeight: "600px" }}>
                                <Image
                                    src={imgSrcSplash}
                                    alt={outfit.name}
                                    style={{
                                        width: "100%",
                                        minHeight: "600px",
                                        objectFit: "cover",
                                        overflowClipMargin: "unset",
                                    }}
                                />
                            </Card>
                        </Fade>
                    </Tabs.Panel>
                ))}
            </ContentDialog>
        </>
    );
}
