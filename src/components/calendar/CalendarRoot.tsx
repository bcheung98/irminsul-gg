// Component imports
import Calendar from "./Calendar";
import { TextStyled } from "styled/StyledTypography";

// MUI imports
import { useTheme, Card, Container } from "@mui/material";

// Helper imports
import { useAppSelector } from "helpers/hooks";
import { selectWebsites } from "reducers/website";

function CalendarRoot() {
    const theme = useTheme();

    const websites = [...useAppSelector(selectWebsites)].sort((a, b) =>
        a.title.localeCompare(b.title)
    );

    return (
        <Container>
            <Card
                sx={{
                    p: 2,
                    mb: "48px",
                    backgroundColor: theme.palette.error.dark,
                }}
            >
                <TextStyled>
                    Hello! If you're reading this it means you have stumbled
                    across a secret page that is currently WIP and is being
                    tested.
                    <br />
                    Please be aware there might be some things that are broken
                    on this page.
                </TextStyled>
            </Card>
            <Calendar websites={websites} />
        </Container>
    );
}

export default CalendarRoot;
