// Component imports
import Calendar from "./Calendar";

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

    const websites = [...useAppSelector(selectWebsites)].sort((a, b) =>
        a.title.localeCompare(b.title)
    );

    return <Calendar websites={websites} />;
}

export default CalendarRoot;
