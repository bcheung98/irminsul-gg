import React from "react"
import { AppBar, Toolbar, Typography, Box, ButtonBase, Card, CardHeader, Avatar } from "@mui/material"
import Grid from "@mui/material/Grid2"

function App() {

    return (
        <React.Fragment>
            <AppBar
                position="fixed"
                sx={{
                    backgroundColor: `rgb(15, 15, 15)`,
                    borderBottom: `1px solid rgb(168, 147, 105)`
                }}
            >
                <Toolbar>
                    <Box sx={{ mr: "45px" }} />
                    <ButtonBase disableRipple href="/">
                        <CardHeader
                            avatar={
                                <Avatar
                                    variant="square"
                                    src="https://assets.irminsul.gg/main/icons/Irminsul.png"
                                    alt="irminsul.gg"
                                    sx={{
                                        height: "48px",
                                        width: "48px",
                                    }}
                                />
                            }
                            title={
                                <Typography
                                    sx={{
                                        fontFamily: "Bungee, Roboto",
                                        fontSize: "15pt",
                                        letterSpacing: ".1rem",
                                        color: `white`
                                    }}
                                >
                                    Irminsul.GG
                                </Typography>
                            }
                            sx={{ px: 0 }}
                        />
                    </ButtonBase>
                </Toolbar>
            </AppBar>
            <Box
                id="main"
                sx={{
                    px: 5,
                    pt: 15,
                    height: "100vh",
                    backgroundImage: `linear-gradient(to bottom, rgba(23, 46, 98, 1), rgba(73, 218, 243, 0.1) 50%, rgba(23, 46, 98, 1) 100%), url(https://assets.irminsul.gg/main/images/Irminsul.png)`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "100vw"
                }}
            >
                <Box
                    sx={{
                        textAlign: "center",
                        mb: "50px"
                    }}
                >
                    <Typography
                        sx={{
                            color: `white`,
                            fontSize: "24pt",
                            fontFamily: "Rowdies"
                        }}
                    >
                        The database for gacha games.
                    </Typography>
                    <Typography
                        sx={{
                            color: `white`,
                            fontSize: "16pt",
                            fontWeight: 300,
                            fontFamily: "Rowdies"
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
                        mb: "100px"
                    }}
                >
                    <Grid container spacing={5}>
                        {
                            websites.map((site, index) => (
                                <Grid key={index} size="auto" sx={{ mx: "auto" }}>
                                    <ButtonBase disableRipple href={site.href}>
                                        {/* 
                                        I know you can do the below using the other MUI Card components (like CardMedia, CardContent), 
                                        but that resulted in some very tiny border clippings.
                                        You probably wouldn't notice if no one said anything,
                                        but it bothered me enough to spend an hour trying to fix it.
                                    */}
                                        <Box
                                            onMouseEnter={() => zoomOnHover("enter", site.tag, site.imageTransform)}
                                            onMouseLeave={() => zoomOnHover("leave", site.tag, site.imageTransform)}
                                        >
                                            <Card
                                                sx={{
                                                    width: "400px",
                                                    height: "225px",
                                                    borderRadius: "15px 15px 0px 0px",
                                                    backgroundColor: `rgb(15, 15, 15)`,
                                                }}
                                            >
                                                <img
                                                    id={`${site.tag.toLowerCase()}-image`}
                                                    src={`https://assets.irminsul.gg/main/wallpapers/${site.tag}.png`}
                                                    alt={`${site.tag}`}
                                                    style={{
                                                        position: "relative",
                                                        zIndex: 0,
                                                        width: "400px",
                                                        height: "auto",
                                                        aspectRatio: "16 / 9",
                                                        transform: `scale(${site.imageTransform.scale}) translate(${site.imageTransform.translate[0]}px, ${site.imageTransform.translate[1]}px)`,
                                                        transition: "transform .2s"
                                                    }}
                                                />
                                            </Card>
                                            <Box
                                                sx={{
                                                    position: "relative",
                                                    zIndex: 1,
                                                    p: 2,
                                                    mt: "-5px",
                                                    height: "32px",
                                                    borderTop: `5px solid rgb(168, 147, 105)`,
                                                    borderRadius: "0px 0px 15px 15px",
                                                    backgroundColor: `rgb(15, 15, 15)`,
                                                    color: `white`,
                                                    textAlign: "center"
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        color: `white`,
                                                        fontSize: "15pt",
                                                        fontWeight: 300,
                                                        fontFamily: "Rowdies"
                                                    }}
                                                >
                                                    {site.title}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </ButtonBase>
                                </Grid>
                            ))
                        }
                    </Grid>
                </Box>
            </Box>
        </React.Fragment>
    )

}

export default App

const websites = [
    {
        title: "Genshin Impact",
        tag: "Genshin",
        href: "https://bcheung98.github.io/project-irminsul/",
        imageTransform: {
            scale: 1.5,
            translate: [0, 20]
        }
    },
    {
        title: "Honkai: Star Rail",
        tag: "HSR",
        href: "https://bcheung98.github.io/project-stellaron/",
        imageTransform: {
            scale: 1,
            translate: [0, 0]
        }
    },
    {
        title: "Wuthering Waves",
        tag: "WutheringWaves",
        href: "https://bcheung98.github.io/project-tacetite/",
        imageTransform: {
            scale: 1,
            translate: [0, 0]
        }
    }
]

const zoomOnHover = (mouseDirection: "enter" | "leave", tag: string, transformData: { scale: number, translate: number[] }) => {
    let image = document.getElementById(`${tag.toLowerCase()}-image`)
    if (image !== null) {
        if (mouseDirection === "enter") {
            image.style.transform = `scale(${transformData.scale + .1}) translate(${transformData.translate[0]}px, ${transformData.translate[1]}px)`
        }
        else {
            image.style.transform = `scale(${transformData.scale}) translate(${transformData.translate[0]}px, ${transformData.translate[1]}px)`
        }
    }
}