// Component imports
import Image from "@/components/Image";
import NavLink from "@/components/NavLink";
import Text from "@/components/Text";

// MUI imports
import { useTheme, SxProps } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import ButtonBase from "@mui/material/ButtonBase";

// Helper imports
import { zoomImageOnHover } from "@/utils";
import versions from "@/data/versions";

// Type imports
import { Game, GameData, GameInfo } from "@/types";

export default function WebsiteCardMobile({
    game,
    index,
    handleIndexChange,
}: {
    game: GameInfo;
    index: number;
    handleIndexChange: (newIndex: number) => void;
}) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("sm"));

    const { tag, name, shortName, enabled } = game;

    const version = versions[tag as Game][0].version;

    const borderRadius = "16px";

    const translate = imagePosition[tag];

    const id = `${tag.split(" ").join("")}-websiteCardMobile`;

    const href = enabled ? `/${tag}` : "";
    const imgSrc = `${tag}/_common/wallpapers/${shortName}_${version}`;

    const handleHover = (direction: "enter" | "leave") => {
        if (direction === "enter") {
            handleIndexChange(index);
        }
        if (enabled) {
            zoomImageOnHover({
                direction,
                id: `${id}-img`,
                baseScale: 1,
                zoom: 1.0325,
                translate: `translate(${translate[0]}px, ${translate[1]}px`,
            });
        }
    };

    const rootStyle: SxProps = {
        display: { xs: "block", md: "none" },
        position: "relative",
        height: { xs: "20vw", sm: "15vw" },
        borderRadius,
    };

    const imageStyle: React.CSSProperties = {
        width: "100%",
        transform: `translate(${translate[0]}px, ${translate[1]}px)`,
        cursor: enabled ? "pointer" : "auto",
        opacity: enabled ? 1 : 0.5,
    };

    const textContainerStyle: SxProps = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100%",
        height: "100vh",
        "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            background:
                "linear-gradient(to right, transparent, black 30%, black 70%, transparent)",
            opacity: 0.6,
            transition: "opacity 200ms ease",
            pointerEvents: "none",
        },
        "&:hover::before": {
            opacity: 0.25,
        },
    };

    const textStyle: SxProps = {
        textShadow: `black 1px 1px 4px`,
        position: "absolute",
        top: "50%",
        left: "50%",
        textAlign: "center",
        transform: "translate(-50%, -50%)",
        width: "90%",
        zIndex: 1,
    };

    return (
        <Card
            sx={rootStyle}
            elevation={2}
            onMouseEnter={() => handleHover("enter")}
            onMouseLeave={() => handleHover("leave")}
        >
            <ButtonBase href={href} LinkComponent={NavLink}>
                <Image
                    src={imgSrc}
                    fallbackSrc={`${tag}/_common/wallpapers/${shortName}`}
                    id={`${id}-img`}
                    style={imageStyle}
                />
                <Box sx={textContainerStyle}>
                    <Text
                        variant={matches ? "h6" : "h6"}
                        weight="highlight"
                        sx={textStyle}
                    >
                        {name}
                    </Text>
                </Box>
            </ButtonBase>
        </Card>
    );
}

const imagePosition: GameData<[number, number]> = {
    genshin: [0, 0],
    hsr: [0, 0],
    wuwa: [0, 0],
    zzz: [0, 0],
    uma: [0, -40],
    endfield: [0, -20],
    nte: [0, 0],
};
