export const defaultTheme = {
    components: {
        MuiTypography: {
            styleOverrides: {
                root: {
                    fontFamily: "Rowdies, Roboto, sans-serif",
                }
            }
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    borderColor: "rgb(168, 147, 105)"
                }
            }
        }
    },
    body: {
        backgroundColor: "rgb(23, 46, 98)",
    },
    appbar: {
        backgroundColor: "rgb(0, 16, 32)",
    },
    border: {
        color: "rgb(168, 147, 105)",
    },
    paper: {
        backgroundColor: "rgb(15, 15, 15)",
    },
    card: {
        backgroundColor: "rgb(15, 15, 15)",
    },
    text: {
        color: "white",
    },
}