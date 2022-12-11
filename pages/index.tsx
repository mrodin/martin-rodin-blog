import Head from "next/head";

import Container from "../components/Container";
import MoreStories from "../components/more-stories";
import { IndexHeading, Layout } from "components";

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
      <section className="mt-3 mb-12 flex md:mt-16">
        <IndexHeading>Martin Rodin</IndexHeading>
      </section>
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
