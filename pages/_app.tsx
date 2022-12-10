import { Inter } from "@next/font/google";
import { AppProps } from "next/app";

import "../styles/index.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const MyApp = ({ Component, pageProps }: AppProps) => (
    <main className={`${inter.variable} font-sans`}>
        <Component {...pageProps} />
    </main>
);

export default MyApp;
