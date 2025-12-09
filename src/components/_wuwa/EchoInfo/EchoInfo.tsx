// Component imports
import ContentBox from "@/components/ContentBox";
import EchoAttributes from "../EchoAttributes";
import EchoSkill from "../EchoSkill";
import EchoSonata from "../EchoSonata";

// MUI imports
import useMediaQuery from "@mui/material/useMediaQuery";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

// Type imports
import { WuWaEcho } from "@/types/wuwa";

export interface EchoInfoProps {
    image: React.ReactNode;
    echo: WuWaEcho;
}

export default function EchoInfo(props: EchoInfoProps) {
    const matches = useMediaQuery((theme) => theme.breakpoints.up("md"));

    return (
        <ContentBox
            header={<EchoAttributes {...props} />}
            headerProps={{ padding: matches ? "16px 24px" : "16px" }}
            contentProps={{ padding: "16px 24px" }}
        >
            <Stack spacing={2} divider={<Divider />}>
                <EchoSkill echo={props.echo} />
                <EchoSonata sonataIDs={props.echo.sonata} />
            </Stack>
        </ContentBox>
    );
}
