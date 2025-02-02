// Component imports
import CalendarSettings from "./CalendarSettings";
import Calendar from "./Calendar";

// MUI imports
import { useTheme, Box } from "@mui/material";

// Helper imports
import { useAppSelector } from "helpers/hooks";
import { selectWebsites } from "reducers/website";

function CalendarRoot() {
    const documentTitle = `Gacha Calendar - Irminsul.GG`;
    const documentDesc = `A calendar to view the release dates of each game's updates`;
    document.title = documentTitle;
    document
        .querySelector('meta[property="og:title"]')
        ?.setAttribute("content", documentTitle);
    document
        .querySelector('meta[property="description"]')
        ?.setAttribute("content", documentDesc);
    document
        .querySelector('meta[property="og:description"]')
        ?.setAttribute("content", documentDesc);

    const theme = useTheme();

    const websites = [...useAppSelector(selectWebsites)].sort((a, b) =>
        a.title.localeCompare(b.title)
    );

    return (
        <Box
            sx={{
                color: theme.text.primary,
                fontFamily: theme.font.styled.family,
                fontWeight: theme.font.styled.weight,
                borderBottom: `1px solid ${theme.border.color.primary}`,
            }}
        >
            <CalendarSettings websites={websites} />
            <Calendar websites={websites} />
        </Box>
    );
}

export default CalendarRoot;
