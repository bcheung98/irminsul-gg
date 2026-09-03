// Component imports
import FlexBox from "@/components/FlexBox";
import Image from "@/components/Image";
import Text from "@/components/Text";
import TextLabel from "@/components/TextLabel";

// MUI imports
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";

// Helper imports
import { useUmaContext } from "@/context";
import { getUmaStatColors } from "@/helpers/uma/getUmaColors";
import { stats } from "@/data/uma/common";
import { statRanks } from "@/data/uma/ranks";

// Type imports
import { UmaCharacter } from "@/types/uma";
import { DataArray } from "@/types/uma/calculator";

export default function UmaShowcaseStats({
    character,
    values,
}: {
    character: UmaCharacter;
    values: DataArray;
}) {
    const { profiles } = useUmaContext();
    const profile = profiles.find(
        (char) => char.id.toString() === character.id.toString().slice(0, 4),
    );

    const { headerColor, borderColor } = getUmaStatColors({ profile });

    const data = stats.map((stat, index) => [
        `${stat}|uma/icons/specialties/${stat}`,
        values[index],
    ]);

    return (
        <Box sx={{ p: 2 }}>
            <Card
                sx={{
                    backgroundColor: headerColor,
                    border: `1px solid ${borderColor}`,
                }}
            >
                <Grid container>
                    {data.map((stat, index) => (
                        <Grid key={index} size="grow">
                            <Stack sx={{ justifyContent: "center" }}>
                                <Box
                                    sx={{
                                        borderBottom: `1px solid ${borderColor}`,
                                        borderRight:
                                            index < 4
                                                ? `1px dashed ${borderColor}`
                                                : 0,
                                    }}
                                >
                                    <TextLabel
                                        title={stat[0].toString().split("|")[0]}
                                        titleProps={{
                                            variant: "subtitle1",
                                            sx: {
                                                textShadow: `black 1px 1px 4px`,
                                            },
                                        }}
                                        icon={stat[0].toString().split("|")[1]}
                                        iconProps={{ size: 18 }}
                                        responsive={false}
                                        justifyContent="center"
                                    />
                                </Box>
                                <FlexBox
                                    spacing={1}
                                    sx={{
                                        backgroundColor: "white",
                                        justifyContent: "center",
                                        position: "relative",
                                        height: "32px",
                                        py: 2.5,
                                        ...(index < 4 && {
                                            "&::after": {
                                                content: '""',
                                                position: "absolute",
                                                right: 0,
                                                top: "5%",
                                                height: "90%",
                                                borderRight: `1px dashed ${borderColor}`,
                                            },
                                        }),
                                    }}
                                >
                                    <Image
                                        src={`uma/icons/ranks/${statRanks[stat[1] as number]}`}
                                        size={32}
                                        style={{
                                            padding:
                                                statRanks[stat[1] as number] <
                                                16
                                                    ? "2px"
                                                    : 0,
                                        }}
                                    />
                                    <Text
                                        variant="h6"
                                        sx={{
                                            color: "rgb(121, 64, 22)",
                                            fontSize: "22px !important",
                                        }}
                                    >
                                        {`${stat[1]}`}
                                    </Text>
                                </FlexBox>
                            </Stack>
                        </Grid>
                    ))}
                </Grid>
            </Card>
        </Box>
    );
}
