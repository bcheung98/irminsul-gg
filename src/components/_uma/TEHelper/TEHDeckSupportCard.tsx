// Component imports
import SupportImage from "../SupportCardImage";
import InfoAvatarSupport from "../InfoAvatarSupport";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Stack from "@mui/material/Stack";

// Helper imports
import {
    TEHAddItem,
    TEHItemTitle,
    TEHRootStackParams,
    useTEHelperData,
} from "./TEHelper.utils";

// Type imports
import { TEHDeckData } from "@/types/uma/te-helper";

export default function TEHDeckSupportCard({
    data,
    mini,
}: {
    data: TEHDeckData;
    mini?: boolean;
}) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("sm"));

    const { supports } = useTEHelperData();
    const support = supports.find((support) => support.id === data);

    const cardStyles = {
        width: { xs: "64px", sm: mini ? "64px" : "96px" },
        height: { xs: "64px", sm: mini ? "64px" : "136px" },
        borderRadius: "16px",
        backgroundColor: theme.background(0, "dark"),
        cursor: mini ? "default" : "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "&:hover": {
            backgroundColor: mini
                ? theme.background(0, "dark")
                : theme.background(0),
        },
    };

    return (
        <Stack
            {...TEHRootStackParams}
            sx={{ width: !matches || mini ? "64px" : "96px" }}
        >
            {support ? (
                !matches || mini ? (
                    <InfoAvatarSupport
                        tag="uma/supports"
                        id={Number(support.id)}
                        key={support.id}
                        name={support.name}
                        rarity={support.rarity}
                        type={support.specialty}
                        url={`${support.id}_icon`}
                        disableZoomOnHover
                    />
                ) : (
                    <SupportImage
                        support={support}
                        style={{
                            width: 96,
                            cursor: "pointer",
                        }}
                        tooltipArrow="top"
                    />
                )
            ) : (
                <TEHAddItem sx={cardStyles} mini={mini} />
            )}
            {!mini && (
                <TEHItemTitle>
                    {support ? support.name : "Support"}
                </TEHItemTitle>
            )}
        </Stack>
    );
}
