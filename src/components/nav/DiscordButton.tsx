import { useState } from "react";

// Component imports
import Image from "custom/Image";
import MainContentBox from "custom/MainContentBox";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import {
    useTheme,
    useMediaQuery,
    Button,
    IconButton,
    Dialog,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function DiscordButton() {
    const theme = useTheme();
    const matches_up_lg = useMediaQuery(theme.breakpoints.up("lg"));

    const DiscordIcon = (
        <Image
            src="https://cdn.prod.website-files.com/6257adef93867e50d84d30e2/66e3d7f4ef6498ac018f2c55_Symbol.svg"
            alt="Discord"
            style={{
                height: "16px",
                width: "auto",
            }}
        />
    );

    const [dialogOpen, setDialogOpen] = useState(false);
    const handleDialogOpen = () => {
        setDialogOpen(true);
    };
    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    return (
        <>
            {matches_up_lg ? (
                <Button
                    variant="contained"
                    disableElevation
                    startIcon={DiscordIcon}
                    onClick={handleDialogOpen}
                    sx={{
                        backgroundColor: "#5865F2",
                        color: theme.text.primary,
                        height: "32px",
                    }}
                >
                    Discord
                </Button>
            ) : (
                <IconButton
                    disableRipple
                    disableTouchRipple
                    onClick={handleDialogOpen}
                    sx={{
                        borderRadius: "8px",
                        px: "2px",
                        width: "36px",
                        height: "36px",
                        "&:hover": {
                            backgroundColor: theme.appbar.hover,
                        },
                    }}
                >
                    {DiscordIcon}
                </IconButton>
            )}
            <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
                maxWidth="sm"
                fullWidth
                disableScrollLock
            >
                <MainContentBox
                    title="Join the Discord!"
                    actions={
                        <IconButton
                            disableRipple
                            onClick={handleDialogClose}
                            sx={{ color: theme.appbar.color }}
                        >
                            <CloseIcon />
                        </IconButton>
                    }
                    contentProps={{ padding: "16px" }}
                >
                    <TextStyled variant="subtitle1-styled">
                        Join the IRMINSUL.GG Discord server if you want to
                        receive notifications for updates on the website, want
                        to provide feedback and suggestions, or have any other
                        questions!
                        <br />
                        <br />
                        <i>
                            NOTE: You must have a verified email on your Discord
                            account to join the server.
                        </i>
                    </TextStyled>
                    <br />
                    <br />
                    <Button
                        href="https://discord.gg/QGehvhYdAz"
                        target="_blank"
                        rel="noopener"
                        variant="contained"
                        disableElevation
                        startIcon={DiscordIcon}
                        sx={{
                            backgroundColor: "#00863A",
                            color: theme.text.primary,
                            height: "32px",
                        }}
                    >
                        Join
                    </Button>
                </MainContentBox>
            </Dialog>
        </>
    );
}

export default DiscordButton;
