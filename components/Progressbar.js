import { useEffect } from "react";
import { useRouter } from "next/router";
import NProgress from "nprogress";

export default function TopProgressBar() {
  NProgress.configure({
    showSpinner: false,
  });

  const Router = useRouter();

  function load() {
    NProgress.start();
  }

  function stop() {
    NProgress.done();
  }

  useEffect(() => {
    Router.events.on("routeChangeStart", load);
    Router.events.on("routeChangeComplete", stop);
    Router.events.on("routeChangeError", stop);

    return () => {
      Router.events.off("routeChangeStart", load);
      Router.events.off("routeChangeComplete", stop);
      Router.events.off("routeChangeError", stop);
    };
  }, []);

  return null;
}
