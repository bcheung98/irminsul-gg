import { forwardRef } from "react";

// Component imports
import UmaShowcaseHeader from "./UmaShowcaseHeader";
import UmaShowcaseStats from "./UmaShowcaseStats";
import UmaShowcaseAptitude from "./UmaShowcaseAptitude";
import UmaShowcaseSkills from "./UmaShowcaseSkills";
import TextLabel from "@/components/TextLabel";

// MUI imports
import { ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";

// Helper imports
import { ranks } from "@/data/uma/ranks";
import { getImageExportTheme } from "@/themes/theme";

// Type imports
import { DataArray, UmaSkillOption } from "@/types/uma/calculator";
import { UmaCharacter, UmaCharacterAptitude } from "@/types/uma/character";

interface UmaShowcaseImageProps {
    character: UmaCharacter;
    aptitude: UmaCharacterAptitude;
    stats: DataArray;
    skills: UmaSkillOption[];
    hiddenSkills: number[];
    rating: number;
    rank: keyof typeof ranks;
}

const UmaShowcaseImage = forwardRef<HTMLDivElement, UmaShowcaseImageProps>(
    function UmaShowcaseImage(
        { character, aptitude, stats, skills, hiddenSkills, rating, rank },
        ref,
    ) {
        const theme = getImageExportTheme();

        return (
            <div
                ref={ref}
                style={{
                    width: "100%",
                    height: "auto",
                    backgroundColor: "rgb(250, 250, 250)",
                }}
            >
                <ThemeProvider theme={theme}>
                    <Box
                        sx={{
                            backdropFilter: "opacity(0.75) blur(16px)",
                        }}
                    >
                        <Stack divider={<Divider />}>
                            <UmaShowcaseHeader
                                character={character}
                                stats={stats}
                                rating={rating}
                                rank={rank}
                            />
                            <Stack>
                                <UmaShowcaseStats character={character} values={stats} />
                                <UmaShowcaseAptitude aptitude={aptitude} />
                            </Stack>
                            <UmaShowcaseSkills
                                charID={character.id}
                                skills={skills}
                                hiddenSkills={hiddenSkills}
                                stats={stats}
                            />
                            <Box
                                sx={{
                                    display: "flex",
                                    p: "8px 16px",
                                    justifyContent: "right",
                                }}
                            >
                                <TextLabel
                                    icon="_common/logo/logo_red"
                                    iconProps={{ size: 40 }}
                                    title="IRMINSUL.GG"
                                    titleProps={{
                                        variant: "sitename",
                                        sx: {
                                            color: "rgb(121, 64, 22) !important",
                                        },
                                    }}
                                />
                            </Box>
                        </Stack>
                    </Box>
                </ThemeProvider>
            </div>
        );
    },
);

export default UmaShowcaseImage;
