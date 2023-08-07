import { CssBaseline } from "@mui/material";
import {
    createTheme,
    ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";


function ThemeProvider({ children }) {
    const themeOptions = {
        palette: {
            mode: "dark"
        },
        shape: { borderRadius: 8 },
    };

    const theme = createTheme(themeOptions);

    return (
        <MUIThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </MUIThemeProvider>
    );
}

export default ThemeProvider;