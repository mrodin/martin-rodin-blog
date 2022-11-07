import Container from "../components/Container";
import MoreStories from "../components/more-stories";
import Intro from "../components/Intro";
import Layout from "../components/Layout";
import { getSortedPosts } from "../lib/api";
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
  const posts = await getSortedPosts();

  return {
    props: { allPosts: posts },
  };
}

export default Index;
