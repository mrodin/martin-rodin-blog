import { FC } from "react";

import Container from "../components/Container";
import MoreStories from "../components/more-stories";
import HeroPost from "../components/hero-post";
import Intro from "../components/Intro";
import Layout from "../components/layout";
import { getAllPosts } from "../lib/api";
import Head from "next/head";

const Index: FC = ({ allPosts }) => (
    <Layout>
        <Head>
            <title>Martin Rodin - Front-end Web Developer</title>
        </Head>
        <Container>
            <Intro />
            <MoreStories posts={allPosts} />
        </Container>
    </Layout>
);

export async function getStaticProps() {
    const allPosts = getAllPosts([
        "title",
        "date",
        "slug",
        "author",
        "coverImage",
        "excerpt",
    ]);

    return {
        props: { allPosts },
    };
}

export default Index;
