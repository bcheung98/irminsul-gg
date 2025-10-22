// MUI imports
import Stack from "@mui/material/Stack";
import Grid, { GridProps } from "@mui/material/Grid";
import Box from "@mui/material/Box";

// Helper imports
import { SkillContext } from "@/app/context";

// Type imports
import { CharacterSkillsList } from "@/types/skill";

type Size = GridProps["size"];

interface CharacterPageRootProps {
    skills: CharacterSkillsList;
    leftColumn?: React.ReactNode[];
    rightColumn?: React.ReactNode[];
    children?: React.ReactNode;
    columnSizes?: [Size, Size];
}

export default function CharacterPageRoot({
    skills,
    leftColumn,
    rightColumn,
    children,
    columnSizes = [4, "grow"],
}: CharacterPageRootProps) {
    const [sizeLeft, sizeRight] = columnSizes;

    return (
        <SkillContext value={skills}>
            <Stack spacing={2}>
                <Grid container spacing={2}>
                    <Grid size={sizeLeft}>
                        <Stack spacing={2}>
                            {leftColumn?.map((element, index) => (
                                <Box key={index}>{element}</Box>
                            ))}
                        </Stack>
                    </Grid>
                    <Grid size={sizeRight}>
                        {rightColumn?.map((element, index) => (
                            <Box key={index}>{element}</Box>
                        ))}
                    </Grid>
                </Grid>
                {children}
            </Stack>
        </SkillContext>
    );
}
