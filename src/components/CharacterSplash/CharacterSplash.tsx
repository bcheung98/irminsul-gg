import { useState } from "react";
import parse from "html-react-parser";

// Component imports
import Image from "@/components/Image";
import FlexBox from "@/components/FlexBox";
import ContentDialog from "@/components/ContentDialog";
import Text from "@/components/Text";
import { default as Tabs } from "@/components/Tabs";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

// Helper imports
import { useGameTag } from "@/context";

// Type imports
import { CharacterOutfit } from "@/types/character";

export default function CharacterSplash({
    id,
    outfits,
}: {
    id: number;
    outfits: CharacterOutfit[];
}) {
    const theme = useTheme();

    const game = useGameTag();

    const [dialogOpen, setDialogOpen] = useState(false);
    const handleDialogOpen = () => {
        setDialogOpen(true);
    };

    const [tabValue, setTabValue] = useState(0);
    const handleTabChange = (_: React.BaseSyntheticEvent, newValue: number) => {
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
        p: 0,
        "&.Mui-disabled": {
            opacity: 0.35,
            color: theme.text.primary,
        },
    };

    function getSplashImg(popup?: boolean) {
        let url = "";
        switch (game) {
            case "genshin":
            case "hsr":
            default:
                url = `${game}/characters/${id}_splash`;
                break;
            case "wuwa":
                popup
                    ? (url = `${game}/resonators/${id}_splash`)
                    : (url = `${game}/resonators/${id}_card`);
                break;
            case "zzz":
                url = `${game}/agents/${id}_splash`;
                break;
            case "uma":
                url = `${game}/characters/${id}_card`;
                break;
            case "endfield":
                url = `${game}/operators/${id}_splash`;
                break;
        }
        return `${url}${tabValue !== 0 ? tabValue : ""}`;
    }

    function getIconImg(index: number) {
        switch (game) {
            case "genshin":
                return `${game}/characters/${id}_icon${
                    index !== 0 ? `${index}` : ""
                }`;
            case "wuwa":
                return `${game}/resonators/${id}${
                    index !== 0 ? `_${index}` : ""
                }`;
            case "zzz":
                return `${game}/agents/${id}${index !== 0 ? `_${index}` : ""}`;
            case "endfield":
                return `${game}/operators/${id}${
                    index !== 0 ? `${index}` : ""
                }`;
            case "hsr":
            case "uma":
            default:
                return `${game}/characters/${id}${
                    index !== 0 ? `_${index}` : ""
                }`;
        }
    }

    return (
        <>
            <Card
                sx={{
                    backgroundColor: theme.background(1),
                    borderRadius: theme.contentBox.border.radius,
                    width: "100%",
                    height: "auto",
                }}
            >
                {outfits.map((_, index) => (
                    <Tabs.Panel
                        key={index}
                        index={index}
                        value={tabValue}
                        padding={0}
                    >
                        <Image
                            src={getSplashImg()}
                            style={{
                                width: "100%",
                                height: "600px",
                                objectFit: "cover",
                                overflowClipMargin: "unset", // removes "crispy" effect from `object-fit: cover`
                                borderBottom: `1px solid ${theme.border.color.primary}`,
                                backgroundColor: theme.background(2),
                            }}
                        />
                    </Tabs.Panel>
                ))}
                <FlexBox
                    sx={{
                        alignItems: "center",
                        justifyContent: "center",
                        p: "4px 8px 8px",
                        height: "48px",
                    }}
                    spacing={1}
                >
                    <IconButton
                        onClick={handleTabChangeLeft}
                        disableRipple
                        sx={buttonStyle}
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
                        disableRipple
                        sx={buttonStyle}
                    >
                        <KeyboardArrowRightIcon />
                    </IconButton>
                </FlexBox>
            </Card>
            <ContentDialog
                open={dialogOpen}
                setOpen={setDialogOpen}
                maxWidth="xl"
                header="Outfits"
                contentProps={{ padding: 0 }}
            >
                <Tabs.List
                    value={tabValue}
                    onChange={handleTabChange}
                    showIndicator
                >
                    {outfits.map((outfit, index) => (
                        <Tabs.Selector
                            key={index}
                            icon={
                                <Image
                                    src={getIconImg(index)}
                                    size={72}
                                    responsive
                                    style={{
                                        border: `2px solid ${theme.border.color.primary}`,
                                        borderRadius: "4px",
                                        backgroundImage: `url(https://assets.irminsul.gg/v2/_common/rarity-background/${outfit.rarity}.png)`,
                                        backgroundSize: "contain",
                                    }}
                                />
                            }
                        />
                    ))}
                </Tabs.List>
                {outfits.map((outfit, index) => (
                    <Tabs.Panel
                        key={index}
                        index={index}
                        value={tabValue}
                        timeout={500}
                    >
                        <Stack spacing={1} sx={{ minHeight: "96px" }}>
                            <Text variant="h6" weight="highlight">
                                {outfit.displayName || outfit.name}
                            </Text>
                            <Text
                                variant="subtitle1"
                                sx={{ color: theme.text.description }}
                            >
                                {parse(outfit.description)}
                            </Text>
                        </Stack>
                        <Image
                            src={getSplashImg(true)}
                            alt={outfit.name}
                            style={{
                                width: "100%",
                                minHeight: "600px",
                                objectFit: "cover",
                                overflowClipMargin: "unset",
                            }}
                        />
                    </Tabs.Panel>
                ))}
            </ContentDialog>
        </>
    );
}
