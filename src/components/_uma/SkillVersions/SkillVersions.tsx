// Component imports
import Text from "@/components/Text";
import SkillInfo from "@/components/_uma/SkillInfo";

// MUI imports
import Stack from "@mui/material/Stack";

export default function SkillVersions({
    skills,
    evo,
    handleClick,
}: {
    skills?: number[];
    evo?: boolean;
    handleClick?: (arg: any) => void;
}) {
    if (!skills) return <></>;

    return skills.length > 0 ? (
        <Stack spacing={1}>
            <Text weight="highlight">
                {evo ? "Evolves From:" : "Other Versions:"}
            </Text>
            <Stack spacing={1}>
                {skills.map((skill) => (
                    <SkillInfo
                        key={skill}
                        skillID={skill}
                        handleClick={handleClick}
                        disablePopup={!Boolean(handleClick)}
                    />
                ))}
            </Stack>
        </Stack>
    ) : (
        <></>
    );
}
