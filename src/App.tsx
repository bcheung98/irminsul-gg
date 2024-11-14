import { useState, useEffect } from "react"

// Component imports
import Nav from "./Nav"
import About from "./About"
import BottomNav from "./BottomNav"

// MUI imports
import theme from "./themes/theme"
import { ThemeProvider } from "@mui/material/styles"
import { Typography, Box, ButtonBase, Card } from "@mui/material"
import Grid from "@mui/material/Grid2"

interface WebsiteData {
    title: string,
    tag: string,
    enabled: boolean,
    href: string,
    img: {
        src: string,
        scale: number,
        translate: [number, number]
    }
}

function App() {

    const [websites, setWebsites] = useState<WebsiteData[]>([])

    useEffect(() => {
        // https://api.irminsul.gg/websites.json
        fetch("https://api.irminsul.gg/websites.json")
            .then(response => response.json())
            .then((data) => {
                setWebsites(data)
            })
            .catch(error => console.error(error))
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <Box
                id="main"
                sx={{
                    pt: 15,
                    height: "auto",
                    maxWidth: "100vw",
                    backgroundImage: `linear-gradient(to bottom, ${theme.body.backgroundColor} 5%, rgba(73, 218, 243, 0.2) 50%, ${theme.body.backgroundColor} 100%), url(https://assets.irminsul.gg/main/images/Irminsul.png)`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "50% 25%",
                    backgroundAttachment: "fixed"
                }}
            >
                <Nav />
                <Box
                    sx={{
                        textAlign: "center",
                        mb: "50px",
                        mx: "50px",
                    }}
                >
                    <Typography
                        gutterBottom
                        sx={{
                            color: `${theme.text.color}`,
                            fontSize: { xs: "26px", sm: "29.5px", md: "32px" },
                            fontWeight: 400,
                        }}
                    >
                        Welcome to IRMINSUL.GG!
                    </Typography>
                    <Typography
                        sx={{
                            color: `${theme.text.color}`,
                            fontSize: { xs: "16px", sm: "19.5px", md: "22px" },
                        }}
                    >
                        <span style={{ fontWeight: 400 }}>IRMINSUL.GG</span> is a database and companion website for various gacha games.<br />
                        Select a branch of Irminsul to get started:
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignContent: "center",
                    }}
                >
                    <Grid container spacing={5} sx={{ mb: { xs: "100px", sm: "300px" }, mx: "25px" }}>
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
                                                    width: { xs: "200px", sm: "300px", md: "400px" },
                                                    height: "auto",
                                                    aspectRatio: "16 / 9",
                                                    borderRadius: "15px 15px 0px 0px",
                                                    background: "none",
                                                    overflow: "hidden"
                                                }}
                                            >
                                                <img
                                                    id={`${site.tag.toLowerCase()}-image`}
                                                    src={site.img.src}
                                                    alt={site.tag}
                                                    style={{
                                                        width: "100%",
                                                        height: "auto",
                                                        aspectRatio: "16 / 9",
                                                        transform: `scale(${site.img.scale}) translate(${site.img.translate[0]}px, ${site.img.translate[1]}px)`,
                                                        transition: "transform .2s"
                                                    }}
                                                    onError={(e: any) => {
                                                        site.img.scale = 1
                                                        site.img.translate[0] = 0
                                                        site.img.translate[1] = 0
                                                        e.target.src = `https://assets.irminsul.gg/main/wallpapers/${site.tag.toLowerCase()}/${site.tag}.png`
                                                        e.target.style.transform = `scale(${site.img.scale}) translate(${site.img.translate[0]}px, ${site.img.translate[1]}px)`
                                                        e.onError = null
                                                    }}
                                                />
                                            </Card>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    textAlign: "center",
                                                    p: 2,
                                                    height: { xs: "16px", sm: "24px", md: "32px" },
                                                    borderTop: `5px solid ${theme.border.color}`,
                                                    color: `${theme.text.color}`
                                                }}
                                            >
                                                <Box>
                                                    <Typography
                                                        sx={{
                                                            color: `${theme.text.color}`,
                                                            fontSize: { xs: "14px", sm: "17.5px", md: "20px" }
                                                        }}
                                                    >
                                                        {site.title}
                                                    </Typography>
                                                    {
                                                        !site.enabled &&
                                                        <Typography
                                                            sx={{
                                                                color: `${theme.text.color}`,
                                                                fontSize: { xs: "12px", sm: "15.5px", md: "18px" }
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
        </ThemeProvider>
    )

}

export default App

const zoomOnHover = (mouseDirection: "enter" | "leave", tag: string, img: { scale: number, translate: number[] }) => {
    let image = document.getElementById(`${tag.toLowerCase()}-image`)
    if (image !== null) {
        if (mouseDirection === "enter") {
            image.style.transform = `scale(${img.scale + .075}) translate(${img.translate[0]}px, ${img.translate[1]}px)`
        }
        else {
            image.style.transform = `scale(${img.scale}) translate(${img.translate[0]}px, ${img.translate[1]}px)`
        }
    }
}