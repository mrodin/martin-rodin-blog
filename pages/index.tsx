import Head from "next/head";

import Container from "../components/Container";
import Intro from "../components/Intro";
import MoreStories from "../components/more-stories";
import { Layout } from "components";

import { getSortedPosts } from "../lib/api";

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
