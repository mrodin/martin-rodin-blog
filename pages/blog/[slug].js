import { useRouter } from "next/router";
import ErrorPage from "next/error";
import Container from "../../components/Container";
import Header from "../../components/header";
import Layout from "../../components/Layout";
import { getPostBySlug } from "../../lib/api";
import PostTitle from "../../components/post-title";
import { getMDXComponent } from "mdx-bundler/client";
import { useMemo } from "react";

export default function Post({ code, frontmatter }) {
  const Component = useMemo(() => getMDXComponent(code), [code]);

  // const router = useRouter();
  // if (!router.isFallback && !post?.slug) {
  //   return <ErrorPage statusCode={404} />;
  // }

  // const title = `${post.title} | Martin Rodin - Front-end Web Developer`;

  return (
    <Layout>
      <Container>
        <Header />
        <>
          <article className="mb-32">
            <PostTitle>{frontmatter.title}</PostTitle>
            <Component />
            {/*<Head>*/}
            {/*  <title>{title}</title>*/}
            {/*  <meta property="og:image" content={post.ogImage.url} />*/}
            {/*</Head>*/}
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
  // const posts = getAllPosts(["slug"]);

  return {
    paths: [
      { params: { slug: "responsive-text-react-tailwind-css-typescript" } },
    ],
    fallback: false,
  };
}
