// Component imports
import RatingCalculatorScore from "./RatingCalculatorScore";

// MUI imports
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";

export default function RatingCalculatorScoreFab() {
    const trigger = useScrollTrigger({
        threshold: 200,
    });
    return (
        <Fade in={trigger}>
            <Box
                sx={{
                    display: { xs: "block", xl: "none" },
                    position: "fixed",
                    zIndex: 5,
                    top: {
                        xs: "calc(80px + 0.75rem)",
                        sm: "calc(120px + 0.75rem)",
                        lg: "calc(80px + 0.75rem)",
                    },
                    bottom: "auto",
                    left: "50%",
                    right: "auto",
                    transform: "translate(-50%, 0)",
                    minWidth: "320px",
                }}
            >
                <RatingCalculatorScore mini />
            </Box>
        </Fade>
    );
}
