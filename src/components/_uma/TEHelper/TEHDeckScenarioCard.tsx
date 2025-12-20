// Component imports
import Image from "@/components/Image";

// MUI imports
import { useTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";

// Helper imports
import { useStore, useServerStore } from "@/stores";
import { scenarios } from "@/data/uma/scenarios";
import { TEHAddItem, TEHItemTitle, TEHRootStackParams } from "./TEHelper.utils";

// Type imports
import { TEHDeckData } from "@/types/uma/te-helper";

export default function TEHDeckScenarioCard({ data }: { data: TEHDeckData }) {
    const theme = useTheme();

    const server = useStore(useServerStore, (state) => state.uma);

    const scenario = scenarios.find((scenario) => scenario.id === data);
    let scenarioName = "Scenario";
    if (scenario) {
        scenarioName = server === "Asia" ? scenario.nameJP : scenario.name;
    }

    const cardStyles = {
        width: "96px",
        height: "96px",
        borderRadius: "16px",
        backgroundColor: theme.background(0, "dark"),
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "&:hover": {
            backgroundColor: scenario
                ? theme.background(0, "dark")
                : theme.background(0),
        },
    };
    return (
        <Stack {...TEHRootStackParams} sx={{ width: "96px" }}>
            {scenario ? (
                <Card sx={cardStyles}>
                    <Image
                        src={`uma/scenarios/${scenario.id}`}
                        style={{ width: "85%", height: "85%" }}
                    />
                </Card>
            ) : (
                <TEHAddItem sx={cardStyles} />
            )}
            <TEHItemTitle>{scenarioName}</TEHItemTitle>
        </Stack>
    );
}
