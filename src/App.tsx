import React from "react"

// Component imports
import Nav from "./Nav"
import About from "./About"
import BottomNav from "./BottomNav"

// MUI imports
import theme from "./themes/theme"
import { ThemeProvider } from "@mui/material/styles"
import { Typography, Box, ButtonBase, Card } from "@mui/material"
import Grid from "@mui/material/Grid2"

function App() {

    return (
        <ThemeProvider theme={theme}>
            <Box
                id="main"
                sx={{
                    pt: 15,
                    height: "100vh",
                    maxWidth: "100vw",
                    backgroundImage: `linear-gradient(to bottom, ${theme.body.backgroundColor} 5%, rgba(73, 218, 243, 0.2) 50%, ${theme.body.backgroundColor} 100%), url(https://assets.irminsul.gg/main/images/Irminsul.png)`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "50% 50%"
                }}
            >
                <Nav />
                <Box
                    sx={{
                        textAlign: "center",
                        mb: "50px"
                    }}
                >
                    <Typography
                        sx={{
                            color: `${theme.text.color}`,
                            fontSize: "24pt",
                            fontWeight: 400
                        }}
                    >
                        The database for gacha games.
                    </Typography>
                    <Typography
                        sx={{
                            color: `${theme.text.color}`,
                            fontSize: "16pt"
                        }}
                    >
                        Select a branch of Irminsul to view its database:
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                    }}
                >
                    <Grid container spacing={5} sx={{ mb: "300px", mx: "25px" }}>
                        {
                            websites.map((site, index) => (
                                <Grid
                                    key={index}
                                    size="auto"
                                    sx={{
                                        mx: "auto",
                                        borderRadius: "15px",
                                        backgroundColor: `${theme.card.backgroundColor}`,
                                    }}
                                >
                                    <ButtonBase disableRipple href={site.enabled ? site.href : ""}>
                                        {/* I know you can do the below using the other MUI Card components (like CardMedia, CardContent), 
                                            but that resulted in some very tiny border clippings.
                                            You probably wouldn't notice if no one said anything,
                                            but it bothered me enough to spend an hour trying to fix it. */}
                                        <Box
                                            onMouseEnter={() => zoomOnHover("enter", site.tag, site.img)}
                                            onMouseLeave={() => zoomOnHover("leave", site.tag, site.img)}
                                            sx={
                                                site.enabled ?
                                                    { opacity: 1, cursor: "pointer" }
                                                    :
                                                    { opacity: 0.5, cursor: "auto" }
                                            }
                                        >
                                            <Card
                                                sx={{
                                                    width: "400px",
                                                    height: "225px",
                                                    borderRadius: "15px 15px 0px 0px",
                                                    backgroundColor: `${theme.card.backgroundColor}`,
                                                }}
                                            >
                                                <img
                                                    id={`${site.tag.toLowerCase()}-image`}
                                                    src={site.img.src}
                                                    alt={`${site.tag}`}
                                                    style={{
                                                        position: "relative",
                                                        zIndex: 0,
                                                        width: "400px",
                                                        height: "auto",
                                                        aspectRatio: "16 / 9",
                                                        transform: `scale(${site.img.scale}) translate(${site.img.translate[0]}px, ${site.img.translate[1]}px)`,
                                                        transition: "transform .2s"
                                                    }}
                                                />
                                            </Card>
                                            <Box
                                                sx={{
                                                    position: "relative",
                                                    zIndex: 1,
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    textAlign: "center",
                                                    p: 2,
                                                    mt: "-5px",
                                                    height: "40px",
                                                    borderTop: `5px solid ${theme.border.color}`,
                                                    borderRadius: "0px 0px 15px 15px",
                                                    backgroundColor: `${theme.appbar.backgroundColor}`,
                                                    color: `${theme.text.color}`
                                                }}
                                            >
                                                <Box>
                                                    <Typography
                                                        sx={{
                                                            color: `${theme.text.color}`,
                                                            fontSize: "15pt"
                                                        }}
                                                    >
                                                        {site.title}
                                                    </Typography>
                                                    {
                                                        !site.enabled &&
                                                        <Typography
                                                            sx={{
                                                                color: `${theme.text.color}`,
                                                                fontSize: "12pt"
                                                            }}
                                                        >
                                                            Coming soon!
                                                        </Typography>
                                                    }
                                                </Box>
                                            </Box>
                                        </Box>
                                    </ButtonBase>
                                </Grid>
                            ))
                        }
                    </Grid>
                </Box>
                <About />
                <BottomNav />
            </Box>
        </ThemeProvider >
    )

}

export default App

const websites = [
    {
        title: "Genshin Impact",
        tag: "Genshin",
        enabled: true,
        href: "https://genshin.irminsul.gg/",
        img: {
            src: "https://assets.irminsul.gg/main/wallpapers/Genshin.png",
            scale: 1.5,
            translate: [0, 20]
        }
    },
    {
        title: "Honkai: Star Rail",
        tag: "HSR",
        enabled: true,
        href: "https://hsr.irminsul.gg/",
        img: {
            src: "https://assets.irminsul.gg/main/wallpapers/HSR.png",
            scale: 1,
            translate: [0, 0]
        }
    },
    {
        title: "Wuthering Waves",
        tag: "WutheringWaves",
        enabled: true,
        href: "https://wuwa.irminsul.gg/",
        img: {
            src: "https://assets.irminsul.gg/main/wallpapers/WutheringWaves.png",
            scale: 1.2,
            translate: [0, 0]
        }
    }
]

const zoomOnHover = (mouseDirection: "enter" | "leave", tag: string, img: { scale: number, translate: number[] }) => {
    let image = document.getElementById(`${tag.toLowerCase()}-image`)
    if (image !== null) {
        if (mouseDirection === "enter") {
            image.style.transform = `scale(${img.scale + .1}) translate(${img.translate[0]}px, ${img.translate[1]}px)`
        }
        else {
            image.style.transform = `scale(${img.scale}) translate(${img.translate[0]}px, ${img.translate[1]}px)`
        }
    }
}