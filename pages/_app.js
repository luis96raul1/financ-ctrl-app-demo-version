// import "@/styles/globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { darkTheme, lighttheme } from "@/themes";
import store from "../redux/store";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <NextUIProvider theme={darkTheme}>
        <Component {...pageProps} />
      </NextUIProvider>
    </Provider>
  );
}
