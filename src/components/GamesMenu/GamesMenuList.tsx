// Component imports
import Text from "@/components/Text";
import TextLabel from "@/components/TextLabel";
import NavLink from "@/components/NavLink";
import DiscordButton from "@/components/DiscordButton";
import KofiButton from "@/components/KofiButton";
import CloseButton from "@/components/CloseButton";

// MUI imports
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Stack from "@mui/material/Stack";
import ButtonBase from "@mui/material/ButtonBase";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";

// Helper imports
import { useGameList, useGameTag } from "@/context";

export default function GamesMenuList({
    handleClose,
}: {
    handleClose: () => void;
}) {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up("md"));

    const gameTag = useGameTag();
    const games = useGameList().sort((a, b) => a.name.localeCompare(b.name));

    if (gameTag) {
        const index = games.findIndex((game) => game.tag === gameTag);
        index > -1 && games.unshift(games.splice(index, 1)[0]);
    }

    return (
        <Stack
            spacing={1}
            divider={
                <Divider sx={{ borderColor: theme.border.color.secondary }} />
            }
        >
            {!matches && (
                <Stack
                    direction="row"
                    sx={{
                        display: { md: "none" },
                        p: "0px 8px 0px 16px",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Text>Games</Text>
                    <CloseButton
                        onClick={handleClose}
                        hoverColor={theme.drawer.backgroundColor.hover}
                    />
                </Stack>
            )}
            <Stack spacing={0.5}>
                {games.map((game, index) => (
                    <ButtonBase
                        key={index}
                        href={`/${game.tag.toLocaleLowerCase()}`}
                        sx={{ display: "flex" }}
                        LinkComponent={NavLink}
                    >
                        <Box
                            sx={[
                                {
                                    p: "4px 16px",
                                    "&:hover": {
                                        backgroundColor:
                                            theme.drawer.backgroundColor.hover,
                                    },
                                },
                                game.tag === gameTag
                                    ? {
                                          backgroundColor:
                                              theme.drawer.backgroundColor
                                                  .hover,
                                          textShadow: `${theme.text.selected} 1px 1px 16px`,
                                      }
                                    : {
                                          backgroundColor: "transparent",
                                          textShadow: "none",
                                      },
                            ]}
                            onClick={handleClose}
                        >
                            <TextLabel
                                icon={`main/game-icons/${game.shortName}`}
                                iconProps={{ size: 32 }}
                                title={game.name}
                                titleProps={{
                                    variant: "subtitle1",
                                    color:
                                        game.tag === gameTag
                                            ? theme.text.selected
                                            : theme.text.primary,
                                    defaultCursor: "pointer",
                                }}
                                spacing={2}
                            />
                        </Box>
                    </ButtonBase>
                ))}
            </Stack>
            {!matches && (
                <Stack spacing={1} sx={{ p: "4px 16px" }}>
                    <DiscordButton />
                    <KofiButton />
                </Stack>
            )}
        </Stack>
    );
}
