import { getMDXComponent } from "mdx-bundler/client";
import ErrorPage from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";
import { useMemo } from "react";

import Container from "../../components/Container";
import Header from "../../components/header";
import { Layout, PostHeader } from "components";

import { getPostBySlug, getSortedPosts } from "../../lib/api";

export default function Post({ slug, frontmatter, code }) {
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
        <Header />
        <article className="markdown mb-32">
          <PostHeader
            title={frontmatter.title}
            coverImage={frontmatter.coverImage}
            date={frontmatter.date}
            author={frontmatter.author}
          />
          <Component />
          {/*<PostBody content={post.content} />*/}
        </article>
      </Container>
    </Layout>
  );
}

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
