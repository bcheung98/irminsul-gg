// Component imports
import Text from "../Text";
import TextLabel from "../TextLabel";
import SkillIcon from "../SkillIcon";
import SkillDescription from "../SkillDescription";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import LinearProgress from "@mui/material/LinearProgress";

// Helper imports
import { useGameTag } from "@/app/context";
import { skillKeys } from "@/data/skills";

// Type imports
import { SkillKeyword } from "@/types/skill";
import { AttributeData } from "@/types";

export default function KeywordPopup({
    keyword,
    attributes,
}: {
    keyword: SkillKeyword | null;
    attributes: AttributeData;
}) {
    const theme = useTheme();

    const game = useGameTag();

    return (
        <>
            {keyword ? (
                <Stack spacing={keyword.icon ? 2 : 1}>
                    <TextLabel
                        icon={
                            keyword.icon && (
                                <SkillIcon
                                    icon={keyword.icon}
                                    attributes={attributes}
                                />
                            )
                        }
                        title={keyword.name}
                        titleProps={{ variant: "h6" }}
                        subtitle={keyword.type && skillKeys[game][keyword.type]}
                        subtitleProps={{
                            color: theme.text.header,
                            variant: "body1",
                        }}
                        spacing={2}
                    />
                    <Text
                        component="span"
                        variant="subtitle1"
                        sx={{
                            color: theme.text.description,
                        }}
                    >
                        <SkillDescription
                            game={game}
                            description={keyword.description}
                            disableLink
                        />
                    </Text>
                </Stack>
            ) : (
                <LinearProgress color="info" />
            )}
        </>
    );
}
