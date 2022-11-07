import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "../../components/Container";
import Header from "../../components/header";
import Layout from "../../components/Layout";
import { getPostBySlug, getSortedPosts } from "../../lib/api";
import PostTitle from "../../components/post-title";
import { getMDXComponent } from "mdx-bundler/client";
import { useMemo } from "react";
import Head from "next/head";

export default function Post({ slug, frontmatter, code }) {
  const Component = useMemo(() => getMDXComponent(code), [code]);

  const router = useRouter();
  if (!router.isFallback && !slug) {
    return <ErrorPage statusCode={404} />;
  }

  const title = `${frontmatter.title} | Martin Rodin - Front-end Web Developer`;

  return (
    <Layout>
      <Container>
        <Header />
        <>
          <article className="mb-32">
            <PostTitle>{frontmatter.title}</PostTitle>
            <Component />
            <Head>
              <title>{title}</title>
              <meta property="og:image" content={frontmatter.ogImage.url} />
            </Head>
            {/*<PostHeader*/}
            {/*  title={post.title}*/}
            {/*  coverImage={post.coverImage}*/}
            {/*  date={post.date}*/}
            {/*  author={post.author}*/}
            {/*/>*/}
            {/*<PostBody content={post.content} />*/}
          </article>
        </>
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
