import { useState } from "react";

// Component imports
import Tooltip from "@/components/Tooltip";
import Text from "@/components/Text";
import MenuItem from "@/components/MenuItem";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import GroupIcon from "@mui/icons-material/Group";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

// Helper imports
import { usePlannerStore } from "@/stores";
import { useGameTag } from "@/context";
import { buttonStyles } from "./PlannerCardRoot.styles";

// Type imports
import type { GameNoUma } from "@/types";

export default function PlannerCardTeamMenu({ itemID }: { itemID: number }) {
    const theme = useTheme();

    const game = useGameTag() as GameNoUma;

    const teams = usePlannerStore((state) => state[`${game}/teams`]);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const createTeam = usePlannerStore((state) => state[`${game}/createTeam`]);

    const setTeamItem = usePlannerStore(
        (state) => state[`${game}/setTeamItem`],
    );

    const handleCreateTeam = () => {
        createTeam({
            itemID,
            activate: false,
        });
        setAnchorEl(null);
    };

    return (
        <>
            <Tooltip title="Assign to Group" placement="top">
                <IconButton onClick={handleMenuOpen} sx={buttonStyles.root}>
                    <GroupIcon sx={buttonStyles.icon} />
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                sx={{
                    "& .MuiMenu-paper": {
                        backgroundColor: theme.menu.backgroundColor.primary,
                        border: `1px solid ${theme.border.color.primary}`,
                        borderRadius: "4px",
                    },
                }}
            >
                {teams.map((team) => {
                    const included = team.itemIDs.includes(itemID);

                    return (
                        <MenuItem
                            key={team.id}
                            onClick={() =>
                                setTeamItem(itemID, team.id, !included)
                            }
                            sx={{
                                justifyContent: "space-between",
                                minHeight: "32px",
                                "&:hover .team-check": {
                                    display: "none",
                                },
                                "&:hover .team-remove": {
                                    display: "block",
                                },
                            }}
                        >
                            <Text variant="subtitle2" weight="highlight">
                                {team.name}
                            </Text>
                            {included && (
                                <>
                                    <CheckIcon
                                        className="team-check"
                                        sx={{
                                            color: theme.palette.success.light,
                                            fontSize: {
                                                xs: "16px",
                                                sm: "18px",
                                            },
                                        }}
                                    />
                                    <CloseIcon
                                        className="team-remove"
                                        sx={{
                                            display: "none",
                                            color: theme.palette.error.light,
                                            fontSize: {
                                                xs: "16px",
                                                sm: "18px",
                                            },
                                        }}
                                    />
                                </>
                            )}
                        </MenuItem>
                    );
                })}
                <Divider />
                <MenuItem
                    onClick={handleCreateTeam}
                    value="add-new-team"
                    sx={{
                        pl: 1.5,
                        py: 0.5,
                        justifyContent: "space-between",
                        gap: 1,
                    }}
                >
                    <AddIcon
                        sx={{
                            fontSize: {
                                xs: "16px",
                                sm: "18px",
                            },
                        }}
                    />
                    <Text variant="subtitle2" weight="highlight">
                        New Group
                    </Text>
                </MenuItem>
            </Menu>
        </>
    );
}
