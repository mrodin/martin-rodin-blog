import Container from "../components/Container";
import MoreStories from "../components/more-stories";
import Intro from "../components/Intro";
import Layout from "../components/Layout";
import { getAllPosts } from "../lib/api";
import Head from "next/head";

import Post from "../types/post";

type Props = {
    allPosts: Post[];
};

const Index = ({ allPosts }: Props) => (
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
