import { getMDXComponent } from "mdx-bundler/client";
import ErrorPage from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";
import { useMemo } from "react";

import { Container, HomeLink, Layout, PostHeader } from "components";

import { getPostBySlug, getSortedPosts } from "core/api";

const Post = ({ slug, frontmatter, code }) => {
  const Component = useMemo(() => getMDXComponent(code), [code]);

  const router = useRouter();
  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />;
  }

  const title = `${frontmatter.title} | Martin Rodin - Front-end Web Developer`;

  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <meta property="og:image" content={frontmatter.ogImage.url} />
      </Head>
      <Container>
        <HomeLink />
        <PostHeader
          title={frontmatter.title}
          coverImage={frontmatter.coverImage}
          date={frontmatter.date}
          author={frontmatter.author}
        />
        <article className="markdown mb-32">
          <Component />
        </article>
      </Container>
    </Layout>
  );
};

export async function getStaticProps({ params }) {
  const postData = await getPostBySlug(params.slug);
  return {
    props: {
      ...postData,
    },
  };
}

export async function getStaticPaths() {
  const posts = await getSortedPosts();

  return {
    paths: posts.map((post) => ({
      params: {
        slug: post.slug,
      },
    })),
    fallback: false,
  };
}

export default Post;
