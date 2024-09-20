import React from "react"
import { AppBar, Container, Toolbar, Typography, Box, ButtonBase, Card, CardMedia, CardContent, CardHeader, Avatar } from "@mui/material"
import Grid from "@mui/material/Grid2"

const URL = "https://assets.irminsul.gg/main"

function App() {

    return (
        <React.Fragment>
            <AppBar
                position="static"
                sx={{
                    backgroundColor: `rgb(15, 15, 15)`,
                    borderBottom: `1px solid gray`
                }}
            >
                <Container maxWidth="xl" sx={{ margin: 0 }}>
                    <Toolbar disableGutters>
                        <CardHeader
                            avatar={
                                <Avatar
                                    src="https://irminsul.gg/logo512.png"
                                    alt="irminsul.gg"
                                    sx={{
                                        height: "48px",
                                        width: "48px"
                                    }}
                                />
                            }
                            title={
                                <Typography variant="h6"
                                    sx={{
                                        letterSpacing: ".1rem",
                                        color: `white`
                                    }}
                                >
                                    Irminsul.GG
                                </Typography>
                            }
                            sx={{ px: 0 }}
                        />
                    </Toolbar>
                </Container>
            </AppBar>
            <Box
                sx={{
                    p: 5,
                    height: "100vh",
                    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(20, 20, 20, 1) 90%), url(${URL}/wallpapers/Genshin.png)`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover"
                }}
            >
                <Typography variant="h6" sx={{ color: `white`, textAlign: "center", fontWeight: "500", mb: "100px" }}>
                    A database for gacha games
                </Typography>
                <Box
                    sx={{
                        display: "block",
                        width: "90%",
                        mx: "auto"
                    }}
                >
                    <Grid container spacing={5}>
                        <Grid size={4}>
                            <ButtonBase
                                disableRipple
                                href={`https://bcheung98.github.io/project-irminsul/`}
                            >
                                <Card sx={{ width: "480px", borderRadius: "15px", backgroundColor: `rgb(15, 15, 15)` }}>
                                    <CardMedia
                                        sx={{ height: "270px" }}
                                        image={`${URL}/wallpapers/Genshin.png`}
                                    />
                                    <CardContent sx={{ backgroundColor: `rgb(15, 15, 15)`, color: `white`, textAlign: "center" }}>
                                        <Typography variant="h6" fontWeight="500">
                                            Genshin Impact
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </ButtonBase>
                        </Grid>
                        <Grid size={4}>
                            <ButtonBase
                                disableRipple
                                href={`https://bcheung98.github.io/project-stellaron/`}
                            >
                                <Card sx={{ width: "480px", borderRadius: "15px", backgroundColor: `rgb(15, 15, 15)` }}>
                                    <CardMedia
                                        sx={{ height: "270px" }}
                                        image={`${URL}/wallpapers/HSR.png`}
                                    />
                                    <CardContent sx={{ backgroundColor: `rgb(15, 15, 15)`, color: `white`, textAlign: "center" }}>
                                        <Typography variant="h6" fontWeight="500">
                                            Honkai: Star Rail
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </ButtonBase>
                        </Grid>
                        {/* <Grid size={4}>
                        <ButtonBase disabled>
                            <Card sx={{ width: "480px", borderRadius: "15px", backgroundColor: `rgb(15, 15, 15)` }}>
                                <CardMedia
                                    sx={{ height: "270px" }}
                                    image={`${URL}/wallpapers/ZZZ.png`}
                                />
                                <CardContent sx={{ backgroundColor: `rgb(15, 15, 15)`, color: `white`, textAlign: "center" }}>
                                    <Typography variant="h6" fontWeight="500">
                                        Zenless Zone Zero
                                    </Typography>
                                </CardContent>
                            </Card>
                        </ButtonBase>
                    </Grid> */}
                        <Grid size={4}>
                            <ButtonBase
                                disableRipple
                                href={`https://bcheung98.github.io/project-tacetite/`}
                            >
                                <Card sx={{ width: "480px", borderRadius: "15px", backgroundColor: `rgb(15, 15, 15)` }}>
                                    <CardMedia
                                        sx={{ height: "270px" }}
                                        image={`${URL}/wallpapers/WutheringWaves.png`}
                                    />
                                    <CardContent sx={{ backgroundColor: `rgb(15, 15, 15)`, color: `white`, textAlign: "center" }}>
                                        <Typography variant="h6" fontWeight="500">
                                            Wuthering Waves
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </ButtonBase>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </React.Fragment>
    )

}

export default App