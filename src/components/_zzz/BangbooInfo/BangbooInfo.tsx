// Component imports
import ContentBox from "@/components/ContentBox";
import StatsDisplay from "@/components/StatsDisplay";
import BangbooAttributes from "../BangbooAttributes";

// MUI imports
import useMediaQuery from "@mui/material/useMediaQuery";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

// Type imports
import { AttributeData } from "@/types";
import { ZZZBangbooStats } from "@/types/zzz/bangboo";

export interface BangbooInfoProps {
    stats: ZZZBangbooStats;
    attributes: AttributeData;
    image: React.ReactNode;
}

export default function BangbooInfo(props: BangbooInfoProps) {
    const matches = useMediaQuery((theme) => theme.breakpoints.up("md"));

    return (
        <ContentBox
            header={<BangbooAttributes {...props} />}
            headerProps={{ padding: matches ? "16px 24px" : "16px" }}
            contentProps={{ padding: "16px 24px" }}
        >
            <Stack spacing={2} divider={<Divider />}>
                <StatsDisplay
                    stats={props.stats}
                    attributes={props.attributes}
                />
            </Stack>
        </ContentBox>
    );
}
