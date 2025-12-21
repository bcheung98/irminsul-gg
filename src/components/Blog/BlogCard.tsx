// Component imports
import Image from "@/components/Image";
import NavLink from "@/components/NavLink";
import Text from "@/components/Text";

// MUI imports
import { useTheme, SxProps } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import ButtonBase from "@mui/material/ButtonBase";

// Helper imports
import { zoomImageOnHover } from "@/utils";

// Type imports
import { BlogPost } from "@/data/blog-list";
import DateObject from "@/helpers/dates";

export default function BlogCard({ post }: { post: BlogPost }) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("lg"));

    const { title, description, slug, date, image } = post;

    const borderRadius = "16px";

    const scale = image ? 1 : 1.05;
    const translate = [0, 0];

    const id = `${slug}-blogCard`;

    const href = `/blog/${slug}`;
    const imgSrc = image || "_common/images/Irminsul";

    const handleHover = (direction: "enter" | "leave") => {
        zoomImageOnHover({
            direction,
            id: `${id}-img`,
            baseScale: scale,
            zoom: scale + 0.05,
            translate: `translate(${translate[0]}px, ${translate[1]}px`,
        });
    };

    const rootStyle: SxProps = {
        position: "relative",
        overflow: "visible",
        maxHeight: "320px",
        borderRadius: borderRadius,
        background: `linear-gradient(to bottom, transparent, ${theme.infoCard.backgroundColor.main} 50%)`,
        zIndex: 1,
    };

    const cardStyle: SxProps = {
        borderRadius: borderRadius,
        backgroundColor: "transparent",
    };

    const imageContainerStyle: SxProps = {
        position: "relative",
        display: "flex",
        overflow: "clip",
        width: "auto",
    };

    const imageStyle: React.CSSProperties = {
        width: "100%",
        height: "200px",
        objectFit: "cover",
        overflowClipMargin: "unset",
        transform: `scale(${scale}) translate(${translate[0]}px, ${translate[1]}px)`,
        cursor: "pointer",
    };

    return (
        <Card sx={rootStyle} elevation={2}>
            <ButtonBase href={href} LinkComponent={NavLink}>
                <Card
                    elevation={0}
                    sx={cardStyle}
                    onMouseEnter={() => handleHover("enter")}
                    onMouseLeave={() => handleHover("leave")}
                >
                    <Box sx={imageContainerStyle}>
                        <Image
                            src={imgSrc}
                            id={`${id}-img`}
                            style={imageStyle}
                        />
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            p: 2,
                            borderTop: `4px solid ${theme.border.color.accent}`,
                        }}
                    >
                        <Stack sx={{ mx: "auto", width: "100%" }} spacing={2}>
                            <Box>
                                <Text
                                    variant={matches ? "body1" : "body2"}
                                    weight="highlight"
                                    sx={{ cursor: "pointer" }}
                                    gutterBottom
                                >
                                    {title}
                                </Text>
                                <Text
                                    variant="subtitle1"
                                    sx={{
                                        color: theme.text.description,
                                    }}
                                    noWrap
                                >
                                    {description}
                                </Text>
                            </Box>
                            <Text variant="body2">
                                {new DateObject(date).string}
                            </Text>
                        </Stack>
                    </Box>
                </Card>
            </ButtonBase>
        </Card>
    );
}
