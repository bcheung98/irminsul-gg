// Component imports
import ContentBox from "@/components/ContentBox";
import UmaAttributes from "../UmaAttributes";
import CharacterStats from "../CharacterStats";
import CharacterAptitude from "../CharacterAptitude";

// MUI imports
import useMediaQuery from "@mui/material/useMediaQuery";
import Stack from "@mui/material/Stack";

// Type imports
import { AttributeData } from "@/types";
import { UmaCharacterAptitude, UmaCharacterStats } from "@/types/uma/character";

interface CharacterInfoProps {
    stats: UmaCharacterStats;
    aptitude: UmaCharacterAptitude;
    attributes: AttributeData;
    image: React.ReactNode;
}

export default function CharacterInfo(props: CharacterInfoProps) {
    const matches = useMediaQuery((theme) => theme.breakpoints.up("md"));

    return (
        <ContentBox
            header={
                <UmaAttributes
                    attributes={props.attributes}
                    image={props.image}
                />
            }
            headerProps={{ padding: matches ? "16px 24px" : "8px 8px 0" }}
            contentProps={{ padding: "16px 24px" }}
        >
            <Stack spacing={2}>
                <CharacterStats {...props} />
                <CharacterAptitude {...props} />
            </Stack>
        </ContentBox>
    );
}
