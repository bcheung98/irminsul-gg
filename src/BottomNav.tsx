// MUI imports
import { useTheme } from "@mui/material/styles"
import { AppBar, Toolbar, Box, Typography, Divider, IconButton, createSvgIcon } from "@mui/material"
import GitHubIcon from "@mui/icons-material/GitHub"

function BottomNav() {

    const theme = useTheme()

    return (
        <AppBar position="static"
            sx={{
                backgroundColor: `${theme.appbar.backgroundColor}`,
                borderTop: `1px solid ${theme.border.color}`,
            }}
        >
            <Toolbar sx={{ justifyContent: "center" }}>
                <Typography sx={{ fontSize: "10.5pt", fontWeight: 300, fontFamily: "Rowdies, Roboto" }}>
                    Irminsul.GG is not affiliated with the developers of the games featured.<br />
                    Games, images and data are registered trademarks of their respective developers.
                </Typography>
                <Divider orientation="vertical" variant="middle" flexItem sx={{ mx: "25px", my: "10px" }} />
                <Box sx={{ mt: "10px", textAlign: "center", }}>
                    <Typography gutterBottom sx={{ fontSize: "10.5pt", fontWeight: 300, fontFamily: "Rowdies, Roboto" }}>GitHub:</Typography>
                    <IconButton disableRipple href={"https://github.com/bcheung98/irminsul-gg"} target="_blank" color="inherit">
                        <GitHubIcon sx={{ mb: "6px" }} />
                    </IconButton>
                </Box>
                <Divider orientation="vertical" variant="middle" flexItem sx={{ mx: "25px", my: "10px" }} />
                <Box sx={{ mt: "10px", textAlign: "center", }}>
                    <Typography gutterBottom sx={{ fontSize: "10.5pt", fontWeight: 300, fontFamily: "Rowdies, Roboto" }}>Made with:</Typography>
                    <IconButton disableRipple href={"https://react.dev/"} target="_blank" color="inherit">
                        <ReactIcon sx={{ fontSize: 32 }} />
                    </IconButton>
                    <IconButton disableRipple href={"https://mui.com/"} target="_blank" color="inherit">
                        <MuiIcon sx={{ fontSize: 32 }} />
                    </IconButton>
                </Box>
            </Toolbar>
        </AppBar>
    )

}

export default BottomNav

const ReactIcon = createSvgIcon(
    // Credit: React logo from https://react.dev/
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
    >
        <path
            stroke="#58C4DC"
            d="M 6.00,18.54 C 3.85,17.31 4.34,12.49 7.10,7.78 9.86,3.06 13.85,0.22 16.00,1.45 18.15,2.68 17.66,7.50 14.90,12.22 12.14,16.93 8.15,19.77 6.00,18.54 Z M 16.00,18.54 C 13.85,19.77 9.86,16.93 7.10,12.22 4.34,7.50 3.85,2.68 6.00,1.45 8.15,0.22 12.14,3.06 14.90,7.78 17.66,12.49 18.15,17.31 16.00,18.54 Z M 21.00,10.00 C 21.00,12.45 16.52,14.44 11.00,14.44 5.48,14.44 1.00,12.45 1.00,10.00 1.00,7.54 5.48,5.56 11.00,5.56 16.52,5.56 21.00,7.54 21.00,10.00 Z M 13.00,10.00 C 13.00,11.08 12.10,11.97 11.00,11.97 9.90,11.97 9.00,11.08 9.00,10.00 9.00,8.91 9.90,8.02 11.00,8.02 12.10,8.02 13.00,8.91 13.00,10.00 Z"
        />
    </svg>,
    "ReactIcon"
)

const MuiIcon = createSvgIcon(
    // Credit: MUI logo from https://mui.com/
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
    >
        <path
            fill="#0073E6"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M24 5.601V1.592a.344.344 0 0 0-.514-.298l-2.64 1.508a.688.688 0 0 0-.346.597v4.009c0 .264.285.43.514.298l2.64-1.508A.688.688 0 0 0 24 5.6ZM.515 1.295l7.643 4.383a.688.688 0 0 0 .684 0l7.643-4.383a.344.344 0 0 1 .515.298v12.03c0 .235-.12.453-.319.58l-4.65 2.953 3.11 1.832c.22.13.495.127.713-.009l4.61-2.878a.344.344 0 0 0 .161-.292v-4.085c0-.254.14-.486.362-.606l2.507-1.346a.344.344 0 0 1 .506.303v7.531c0 .244-.13.47-.34.593l-7.834 4.592a.688.688 0 0 1-.71-.009l-5.953-3.681A.344.344 0 0 1 9 18.808v-3.624c0-.115.057-.222.153-.286l4.04-2.694a.688.688 0 0 0 .307-.572v-4.39a.137.137 0 0 0-.208-.117l-4.44 2.664a.688.688 0 0 1-.705.002L3.645 7.123a.138.138 0 0 0-.208.118v7.933a.344.344 0 0 1-.52.295L.5 14.019C.19 13.833 0 13.497 0 13.135V1.593c0-.264.286-.43.515-.298Z"
        />
    </svg>,
    "MuiIcon"
)