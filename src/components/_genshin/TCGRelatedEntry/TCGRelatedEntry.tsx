import useSWR from "swr";

// Component imports
import ContentBox from "@/components/ContentBox";
import TCGCardImage from "../TCGCardImage";
import SkillCard from "@/components/SkillCard";
import SkillDescription from "@/components/SkillDescription";
import Text from "@/components/Text";
import NavLink from "@/components/NavLink";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import ButtonBase from "@mui/material/ButtonBase";

// Helper imports
import { urls } from "@/lib/fetchData";

// Type imports
import { TCGActionCard } from "@/types/genshin/tcg";

export default function TCGRelatedEntry({ id }: { id: number }) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));

    const { data, error, isLoading } = useSWR(
        urls["genshin/tcg"],
        (url: string) => fetch(url).then((r) => r.json())
    );
    let card: TCGActionCard | undefined;
    if (!isLoading && !error) {
        card = data.find((c: TCGActionCard) => c.id === id);
    }

    if (!card) return <></>;

    return (
        <ContentBox
            header="Talent Card"
            contentProps={{ padding: "16px 24px" }}
        >
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: "auto" }}>
                    <ButtonBase
                        href={`/genshin/tcg/${id}`}
                        LinkComponent={NavLink}
                        disableRipple
                    >
                        <TCGCardImage
                            id={id}
                            cost={card.cost}
                            size={matches ? 175 : 96}
                            style={{
                                width: matches ? "100%" : "96px",
                                height: matches ? "300px" : "auto",
                            }}
                        />
                    </ButtonBase>
                </Grid>
                <Grid size={{ xs: 12, sm: "grow" }}>
                    <SkillCard size={12}>
                        <Stack spacing={1}>
                            <Text variant="h6" weight="highlight">
                                {card.displayName}
                            </Text>
                            <Text
                                component="span"
                                variant="subtitle1"
                                sx={(theme) => ({
                                    color: theme.text.description,
                                })}
                            >
                                <SkillDescription
                                    game="genshin"
                                    description={card.description}
                                    disableLink
                                />
                            </Text>
                        </Stack>
                    </SkillCard>
                </Grid>
            </Grid>
        </ContentBox>
    );
}
