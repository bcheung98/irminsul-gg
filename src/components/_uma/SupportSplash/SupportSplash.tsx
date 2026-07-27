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
    const matches_up_sm = useMediaQuery(theme.breakpoints.up("sm"));
    const matches_up_md = useMediaQuery(theme.breakpoints.up("md"));

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const maxHeight = "720px";

    return (
        <>
            <SupportCardImage
                support={support}
                style={{
                    width: matches_up_sm ? "100%" : "96px",
                    height: matches_up_sm ? "300px" : "auto",
                    cursor: "pointer",
                }}
                handleClickOpen={handleClickOpen}
            />
            <ContentDialog
                open={open}
                setOpen={setOpen}
                contentProps={{ padding: 0 }}
                maxWidth={matches_up_md ? "xl" : "sm"}
                fullScreen={!matches_up_sm}
                header={`[${title}] ${name}`}
            >
                <Grid
                    container
                    spacing={2}
                    sx={{ maxHeight: { md: maxHeight } }}
                >
                    <Grid size={{ xs: 12, md: "auto" }}>
                        <Image
                            src={`uma/supports/${id}_large`}
                            style={
                                matches_up_sm
                                    ? { width: "auto", height: maxHeight }
                                    : { width: "100%", height: "auto" }
                            }
                        />
                    </Grid>
                    <Grid
                        size={{ xs: 12, md: "grow" }}
                        sx={{
                            px: 2,
                            pt: { xs: 0, md: 2 },
                            pb: 2,
                            overflowY: "auto",
                            maxHeight: { md: maxHeight },
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
