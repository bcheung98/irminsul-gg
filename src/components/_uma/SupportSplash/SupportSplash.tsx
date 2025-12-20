import { useState } from "react";
import parse from "html-react-parser";

// Component imports
import SupportCardImage from "../SupportCardImage";
import Image from "@/components/Image";
import Text from "@/components/Text";
import ContentDialog from "@/components/ContentDialog";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Grid from "@mui/material/Grid";

// Type imports
import { UmaSupport } from "@/types/uma";

export default function SupportSplash({ support }: { support: UmaSupport }) {
    const { id, name, title, splash } = support;

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("sm"));

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    return (
        <>
            <SupportCardImage
                support={support}
                style={{
                    width: matches ? "100%" : "96px",
                    height: matches ? "300px" : "auto",
                    cursor: "pointer",
                }}
                handleClickOpen={handleClickOpen}
            />
            <ContentDialog
                open={open}
                setOpen={setOpen}
                contentProps={{ padding: 0 }}
                maxWidth="xl"
                fullScreen={!matches}
                header={`[${title}] ${name}`}
            >
                <Grid container spacing={2} sx={{ maxHeight: { md: "600px" } }}>
                    <Grid size={{ xs: 12, sm: 5, md: "auto" }}>
                        <Image
                            src={`uma/supports/${id}`}
                            style={{ width: "100%", height: "auto" }}
                        />
                    </Grid>
                    <Grid
                        size={{ xs: 12, sm: 7, md: "grow" }}
                        sx={{
                            px: 2,
                            pt: { xs: 0, sm: 2 },
                            pb: 2,
                            overflowY: "auto",
                            maxHeight: { md: "600px" },
                            scrollbarWidth: "thin",
                        }}
                    >
                        <Text variant="body2">
                            {parse(splash.en || splash.jp)}
                        </Text>
                    </Grid>
                </Grid>
            </ContentDialog>
        </>
    );
}
