import React from "react";
import "../styles/globals.css";
import "../styles/progressbar.css";
import "../styles/anychart.css";

import "react-toastify/dist/ReactToastify.css";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import { theme } from "lib/theme";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import store from "redux/store";
import Progressbar from "components/Progressbar";

const IntercomProvider = dynamic(
  () => import("react-intercom-hook").then((m) => m.IntercomProvider),
  { ssr: false }
);

import { analytics } from "lib/firebase";

function MyApp({ Component, pageProps }) {
  const routers = useRouter();

  React.useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      // analytics();

      const logEvent = (url) => {
        // console.log(url);
        analytics().setCurrentScreen(url);
        analytics().logEvent("page_view");
      };

      routers.events.on("routeChangeComplete", logEvent);
      //For First Page
      logEvent(window.location.pathname);

      //Remvove Event Listener after un-mount
      return () => {
        routers.events.off("routeChangeComplete", logEvent);
      };
    }
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <IntercomProvider appId={process.env.NEXT_PUBLIC_INTERCOM_ID} autoBoot>
        <Provider store={store}>
          <Progressbar />
          <ToastContainer
            position="top-center"
            autoClose={5000}
            closeOnClick
            draggable
          />
          <Component {...pageProps} />
        </Provider>
      </IntercomProvider>
    </ChakraProvider>
  );
}

export default MyApp;
