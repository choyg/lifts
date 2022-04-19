/* @refresh reload */
import { render } from "solid-js/web";

import App from "./App";
import { styled, ThemeProvider, DefaultTheme } from "solid-styled-components";

const theme: DefaultTheme = {
  colors: {
    primary: "hotpink",
    accent: "#DC2626",
  },
};

render(
  () => (
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  ),
  document.getElementById("root") as HTMLElement
);
