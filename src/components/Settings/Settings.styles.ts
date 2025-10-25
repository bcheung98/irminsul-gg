import { SxProps } from "@mui/material/styles";

export const toggleButtonsParams = {
    spacing: 0,
    padding: "0px 8px",
    highlightOnHover: false,
};

export const settingsBoxStyle: SxProps = {
    display: {
        xs: "block",
        sm: "flex",
    },
    flexGrow: 1,
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "8px",
};

export const settingsTextStyle: SxProps = {
    display: {
        xs: "block",
        sm: "flex",
    },
    mb: { xs: "8px", sm: "0px" },
};
