// MUI imports 
import { useTheme } from "@mui/material/styles"
import { AppBar, Toolbar, Typography, Box, ButtonBase, CardHeader, Avatar } from "@mui/material"

function Nav() {

    const theme = useTheme()

    return (
        <AppBar
            position="fixed"
            sx={{
                backgroundColor: `${theme.appbar.backgroundColor}`,
                borderBottom: `1px solid ${theme.border.color}`
            }}
        >
            <Toolbar sx={{ justifyContent: { xs: "center", sm: "left" }, }}>
                <Box sx={{ mr: "45px", display: { xs: "none", sm: "block" } }} />
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
                                    fontFamily: "Rowdies, Roboto",
                                    fontSize: "16pt",
                                    fontWeight: 400,
                                    letterSpacing: ".1rem",
                                    color: `${theme.text.color}`,
                                }}
                            >
                                IRMINSUL.GG
                            </Typography>
                        }
                        sx={{ px: 0 }}
                    />
                </ButtonBase>
            </Toolbar>
        </AppBar>
    )

}

export default Nav