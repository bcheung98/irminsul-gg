import React from "react"
import { AppBar, Container, Toolbar, Typography, Box, ButtonBase, Card, CardMedia, CardContent, CardActions, CardHeader, Avatar, Button } from "@mui/material"
import Grid from "@mui/material/Grid2"

const URL = "https://raw.githubusercontent.com/bcheung98/irminsul-gg-assets/main/"

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
                                    src="https://raw.githubusercontent.com/bcheung98/irminsul-gg/main/public/logo512.png"
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
            <Box sx={{ m: 5 }}>
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
        </React.Fragment>
    )

}

export default App