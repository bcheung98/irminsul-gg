import viteLogo from "/vite.svg";
import reactLogo from "/react.svg";
import muiLogo from "/mui.svg";

// Component imports
import { FlexBox } from "styled/StyledBox";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import {
    useTheme,
    getContrastRatio,
    SxProps,
    AppBar,
    Toolbar,
    Box,
    Divider,
    IconButton,
    Avatar,
    Container,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

const bottomText = (
    <>
        IRMINSUL.GG is not affiliated with the developers of the games featured.
        <br />
        Game contents are trademarks and copyrights of their respective
        developers.
    </>
);

const githubURL = "irminsul-gg";

function NavBottom() {
    const theme = useTheme();

    const textColor =
        getContrastRatio(theme.background(0), theme.text.primary) > 4.5
            ? theme.text.primary
            : theme.text.contrast;

    const iconButtonStyle: SxProps = {
        px: "4px",
    };

    const svgStyle: SxProps = {
        width: { xs: "22px", sm: "24px" },
        height: { xs: "22px", sm: "24px" },
    };

    return (
        <AppBar
            position="relative"
            elevation={0}
            sx={{ backgroundColor: "transparent", borderWidth: 0 }}
        >
            <Container maxWidth="lg" disableGutters>
                <Toolbar
                    sx={{
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "8px",
                        py: "8px",
                    }}
                >
                    <TextStyled
                        variant="body2-styled"
                        sx={{ color: textColor }}
                    >
                        {bottomText}
                    </TextStyled>
                    <Box>
                        <FlexBox gap="16px">
                            <FlexBox sx={{ flexWrap: "wrap", rowGap: "8px" }}>
                                <TextStyled
                                    variant="body2-styled"
                                    sx={{ color: textColor }}
                                >
                                    GitHub:
                                </TextStyled>
                                <IconButton
                                    disableRipple
                                    href={`https://github.com/bcheung98/${githubURL}`}
                                    target="_blank"
                                    rel="noopener"
                                    color="inherit"
                                    sx={{ color: textColor }}
                                    className="logo github"
                                >
                                    <GitHubIcon sx={svgStyle} />
                                </IconButton>
                            </FlexBox>
                            <Divider
                                orientation="vertical"
                                flexItem
                                sx={{ my: "4px" }}
                            />
                            <FlexBox sx={{ flexWrap: "wrap", rowGap: "8px" }}>
                                <TextStyled
                                    variant="body2-styled"
                                    sx={{ color: textColor }}
                                >
                                    Made with:
                                </TextStyled>
                                <Box>
                                    <IconButton
                                        disableRipple
                                        href="https://vite.dev"
                                        target="_blank"
                                        rel="noopener"
                                        color="inherit"
                                        sx={iconButtonStyle}
                                        className="logo vite"
                                    >
                                        <Avatar
                                            variant="square"
                                            src={viteLogo}
                                            alt="Vite logo"
                                            sx={svgStyle}
                                        />
                                    </IconButton>
                                    <IconButton
                                        disableRipple
                                        href="https://react.dev"
                                        target="_blank"
                                        rel="noopener"
                                        color="inherit"
                                        sx={iconButtonStyle}
                                        className="logo react"
                                    >
                                        <Avatar
                                            variant="square"
                                            src={reactLogo}
                                            alt="React logo"
                                            sx={svgStyle}
                                        />
                                    </IconButton>
                                    <IconButton
                                        disableRipple
                                        href="https://mui.com"
                                        target="_blank"
                                        rel="noopener"
                                        color="inherit"
                                        sx={iconButtonStyle}
                                        className="logo mui"
                                    >
                                        <Avatar
                                            variant="square"
                                            src={muiLogo}
                                            alt="MUI logo"
                                            sx={svgStyle}
                                        />
                                    </IconButton>
                                </Box>
                            </FlexBox>
                        </FlexBox>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default NavBottom;
