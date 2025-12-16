import { useState } from "react";

// Component imports
import EventPopup from "./EventPopup";
import Text from "@/components/Text";

// MUI imports
import Card from "@mui/material/Card";
import Popover from "@mui/material/Popover";

// Helper imports
import { useCardIDContext } from "@/context";
import { range } from "@/utils";
import { useStore, useServerStore } from "@/stores";
import { history } from "@/helpers/uma/history";

// Type imports
import { Event } from "@/types/uma/event";

export default function EventInfo({
    event,
    index = 0,
    isChain = false,
    expand = false,
}: {
    event: Event;
    index?: number;
    isChain?: boolean;
    expand?: boolean;
}) {
    const cardID = useCardIDContext();

    const server = useStore(useServerStore, (state) => state.uma);

    const expanded = expand; // TODO: Update when adding planner settings

    let name: string;
    if (server === "Asia") {
        if (event.name === event.nameJP) {
            name = event.name;
        } else {
            name = event.name
                ? `${event.name} (${event.nameJP})`
                : event.nameJP;
        }
    } else {
        name = event.name || event.nameJP;
    }
    if (isChain) {
        name = `(${range(index + 1)
            .map((_) => "❯")
            .join("")}) ${name}`;
    }

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const handleClickOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);

    const renderEventPopup = () => {
        let e = event;
        if (event.altOptions) {
            e = event.altOptions.find((e) => e.cardID === cardID) || event;
        } else if (event.otherVersions && server === "NA") {
            e =
                event.otherVersions.find((e) => !history.includes(e.version))
                    ?.data || event;
        }
        return <EventPopup name={name} event={e} />;
    };

    if (
        event.didNotExist &&
        server === "NA" &&
        !history.includes(event.didNotExist)
    ) {
        return null;
    }

    return expanded ? (
        <Card>{renderEventPopup()}</Card>
    ) : (
        <>
            <Card
                sx={(theme) => ({
                    p: "8px 16px",
                    backgroundColor: theme.background(2),
                    cursor: "pointer",
                    "&:hover": {
                        outline: `2px solid ${theme.border.color.primary}`,
                    },
                })}
                onClick={handleClickOpen}
            >
                <Text variant="body2" weight="highlight">
                    {name}
                </Text>
            </Card>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                disableScrollLock
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
            >
                {renderEventPopup()}
            </Popover>
        </>
    );
}
