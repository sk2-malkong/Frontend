// src/App.tsx
import React, { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./global/global";
import theme from "./global/theme";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";

function App(): JSX.Element {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.screenTop
      window.history.scrollRestoration = "manual";
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
