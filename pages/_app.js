import Head from "next/head";
import "../styles/globals.css";

//Internal Import
import { StateContextProvider } from "../Context/index";

export default function App({ Component, pageProps }) {
  return (
    <>
    <Head>
      <link ref="icon" href="assets/images/favicon.png" />
    </Head>
    <StateContextProvider>
        <Component {...pageProps} />
    </StateContextProvider>

    {/* Import Scripts */}

    <script src="assets/js/bootstrap.bundle.min.js"></script>
    <script src="assets/js/swiper-bundle.min.js"></script>
    <script src="assets/js/aos.js"></script>
    <script src="assets/js/custom-aos.js"></script>
    <script src="assets/js/home-animation.js"></script>
    <script src="assets/js/header_sticky.js"></script>
    <script src="assets/js/script.js"></script>
    </>
  );
}
