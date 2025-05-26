// src/App.tsx
import React, { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "./global/global";
import theme from "./global/theme";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
// import { NicknameProvider } from "./pages/PurgoChat/context/NicknameContext"; // 추가

function App(): JSX.Element {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.screenTop
      window.history.scrollRestoration = "manual";
    }
  }, []);

  return (
      <ThemeProvider theme={theme}>
        {/*<NicknameProvider> /!* 추가 *!/*/}
          <GlobalStyle />
          <RouterProvider router={router} />
        {/*</NicknameProvider> /!* 추가 *!/*/}
      </ThemeProvider>
  );
}

export default App;