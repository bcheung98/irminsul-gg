"use client";

import LinearProgress from "@mui/material/LinearProgress";

export default function Loader() {
    return (
        <LinearProgress
            color="info"
            sx={{
                position: "fixed",
                width: "100%",
                left: 0,
                top: 0,
                zIndex: 99999999,
                overflowX: "hidden",
            }}
        />
    );
}
