import { CssBaseline } from "@mui/material";
import {
    createTheme,
    ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";


function ThemeProvider({ children }) {
    const themeOptions = {
        palette: {
            mode: "dark",
            primary: {
                main: '#99CCFF',
                light: '#42a5f5',
                dark: '#1565c0',
                contrastText: '#fff',
            },
        },
        shape: { borderRadius: 8 },
        typography: {
            fontFamily: [
                'Gruppo',
                'sans-serif',
                'Mogra',
                'cursive'
            ].join(','),
        }
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