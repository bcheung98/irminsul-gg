import { createTheme } from "@mui/material/styles"
import { defaultTheme } from "./defaultTheme"

const theme = defaultTheme

type CustomTheme = {
    [Key in keyof typeof theme]: typeof theme[Key]
}

declare module "@mui/material/styles" {
    interface Theme extends CustomTheme { }
    interface ThemeOptions extends CustomTheme { }
}

export default createTheme(theme)