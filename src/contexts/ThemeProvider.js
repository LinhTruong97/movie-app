import { CssBaseline } from "@mui/material";
import {
    createTheme,
    ThemeProvider as MUIThemeProvider,
} from "@mui/material/styles";

const PRIMARY = {
    lighter: "#D7EBFA",
    light: "#AED6F6",
    main: "#5DADEC",
    dark: "#3A6C94",
    darker: "#234159",
    contrastText: "#FFF",
};
const SECONDARY = {
    lighter: "#FFD07F",
    light: "#FDA65D",
    main: "#FF8243",
    dark: "#E26A2C",
    darker: "#cc571f",
    contrastText: "#FFF",
};
const SUCCESS = {
    lighter: "#E9FCD4",
    light: "#AAF27F",
    main: "#54D62C",
    dark: "#229A16",
    darker: "#08660D",
    contrastText: "#FFF",
};

function ThemeProvider({ children }) {
    const themeOptions = {
        palette: {
            primary: PRIMARY,
            secondary: SECONDARY,
            success: SUCCESS,
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