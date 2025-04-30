import React from 'react';
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./global/global";
import theme from "./global/theme";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";

function App(): JSX.Element {
    return (
        <>
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                <RouterProvider router={router} />
            </ThemeProvider>
        </>
    );
}

export default App;