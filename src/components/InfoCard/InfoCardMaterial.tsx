// Component imports
import Image from "@/components/Image";
import NavLink from "@/components/NavLink";
import Text from "@/components/Text";
import InfoBadge from "@/components/InfoBadge";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ButtonBase from "@mui/material/ButtonBase";

// Helper imports
import { infoCardStyles } from "./InfoCard.styles";
import { formatHref, splitJoin } from "@/utils";
import { useMaterials } from "@/helpers/materials";

// Type imports
import { InfoCardMaterialProps } from "./InfoCard.types";
import { Game, GameData } from "@/types";

export default function InfoCardMaterial({
    tag,
    name,
    displayName = name,
    rarity = 3,
    size = 96,
    background,
    url = "avatars",
    componentID,
    badgeLeft,
    badgeRight,
    materials,
    href,
}: InfoCardMaterialProps) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));

    const id = `${componentID || formatHref(href)}-infoCard`;

    const [game, type] = tag.split("/") as [Game, string];

    let imgSize = size;
    if (matches) {
        imgSize = imgSize - imgSize * 0.3;
    }

    const styles = infoCardStyles({
        game,
        type,
        border: theme.infoCard.border,
        backgroundColor: background || theme.background(1),
        rarity,
        imgSize: `${imgSize}px`,
        variant: "material-card",
    });

    function MaterialIcon(props: { material: string | number }) {
        const material = useMaterials()[game](props.material);

        const nums: GameData<string> = {
            genshin: "3",
            hsr: "3",
            wuwa: "4",
            zzz: "3",
            uma: "",
        };

        let imgURL = `${game}/materials/${material.category}/${splitJoin(
            material.tag
        )}`;

        if (["talent", "common"].includes(material.category)) {
            imgURL += nums[game];
        }

        let tooltip = material.name;
        if (material.source) {
            tooltip += ` (${material.source})`;
        }

        return (
            <Image
                src={imgURL}
                tooltip={tooltip}
                size={imgSize / (8 / 3.5)}
                style={{
                    border: `1px solid ${theme.border.color.primary}`,
                    borderRadius: "4px",
                    backgroundColor: theme.background(1),
                }}
            />
        );
    }

    return (
        <Card sx={styles.root()} elevation={2}>
            <Card elevation={0} sx={styles.card()}>
                <ButtonBase
                    href={`/${tag}/${formatHref(href)}`}
                    LinkComponent={NavLink}
                >
                    <Box sx={styles.imageContainer()}>
                        <Image
                            src={`${tag}/${url}/${name}`}
                            id={id}
                            size={size}
                            responsive
                            responsiveSize={0.25}
                        />
                        <Grid
                            container
                            spacing={0.5}
                            sx={{
                                alignContent: "center",
                                justifyContent: "center",
                            }}
                        >
                            {Object.values(materials).map((material, index) => (
                                <MaterialIcon key={index} material={material} />
                            ))}
                        </Grid>
                    </Box>
                    <Box sx={styles.textContainer()}>
                        <Text
                            variant={
                                displayName.length > 20
                                    ? matches
                                        ? "body3"
                                        : "body2"
                                    : matches
                                    ? "body2"
                                    : "body1"
                            }
                            sx={styles.text()}
                        >
                            {displayName}
                        </Text>
                    </Box>
                </ButtonBase>
            </Card>
            {badgeLeft && (
                <InfoBadge
                    data={badgeLeft}
                    game={game}
                    styles={{
                        root: styles.badgeContainer("left"),
                        icon: styles.badgeIcon(!matches),
                    }}
                />
            )}
            {badgeRight && (
                <InfoBadge
                    data={badgeRight}
                    game={game}
                    styles={{
                        root: styles.badgeContainer("right"),
                        icon: styles.badgeIcon(!matches),
                    }}
                />
            )}
        </Card>
    );
}
