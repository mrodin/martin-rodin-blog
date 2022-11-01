import { AppProps } from "next/app";

import "../styles/index.css";
import "../styles/github-gist.css";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
);

export default MyApp;
