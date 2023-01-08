import Helmet from "react-helmet";
import { Provider, useSelector } from "react-redux";
import Layout from "../src/components/layout";
import { appWithTranslation, useTranslation } from "next-i18next";
import { store } from "~/src/store/store.js";
import { useEffect } from "react";

import "~/public/scss/plugins/owl-carousel/owl.carousel.scss";
import "~/public/scss/style.scss";
import { AuthContext, AuthProvider } from "~/src/contexts/JWTContext";
import axiosInstance from "~/src/utils/axios/axiosInstance";
import { useRouter } from "next/router";

const WrappedApp = ({ Component, pageProps }) => {
  const router = useRouter();
  const { i18n } = useTranslation();
  useEffect(() => {
    document.body.dir = i18n?.dir?.() ?? "en";

    axiosInstance.defaults.headers.common["accept-language"] = router.locale;
  }, [i18n]);

  return (
    <AuthProvider>
      <Provider store={store}>
        <Helmet>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="keywords" content="Molla React Template" />
          <meta
            name="description"
            content="Molla –  eCommerce React Template is a multi-use React template. It is designed to go well with multi-purpose websites."
          />
          <meta name="author" content="d-themes" />
          <meta name="apple-mobile-web-app-title" content="UNEX" />
          <meta name="UNEX" content="Unex City Active" />
          <meta name="msapplication-TileColor" content="#cc9966" />
          <meta
            name="msapplication-config"
            content="images/icons/browserconfig.xml"
          />
          <meta name="theme-color" content="#ffffff" />
          <title>UNEX City Active</title>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="images/icons/Logo.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="images/icons/Logo.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="images/icons/Logo.png"
          />
          <link rel="manifest" href="images/icons/site.webmanifest" />
          <link
            rel="mask-icon"
            href="images/icons/safari-pinned-tab.svg"
            color="#666666"
          />
          <link rel="shortcut icon" href="images/icons/favicon.ico" />
        </Helmet>

        <Component {...pageProps} />
      </Provider>
    </AuthProvider>
  );
};

WrappedApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  return { pageProps };
};

export default appWithTranslation(WrappedApp);
