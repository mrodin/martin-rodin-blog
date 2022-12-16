import fs from "fs";
import path from "path";
import { bundleMDX } from "mdx-bundler";
import remarkEmbedder from "@remark-embedder/core";
import rehypePrettyCode from "rehype-pretty-code";

const postsDirectory = path.join(process.cwd(), "posts");

export function getPostSlugs() {
  return fs
    .readdirSync(postsDirectory)
    .map((slug) => slug.replace(/\.mdx$/, ""));
}

export async function getSortedPosts() {
  const slugs = getPostSlugs();
  const postPromises = slugs.map((slug) => getPostBySlug(slug));
  const posts = await Promise.all(postPromises);

  return posts
    .map((post) => ({
      slug: post.slug,
      frontmatter: post.frontmatter,
    }))
    .sort((post1, post2) =>
      post1.frontmatter.date > post2.frontmatter.date ? -1 : 1
    );
}

const CodeSandboxTransformer = {
  name: "CodeSandbox",
  shouldTransform(url) {
    const { host, pathname } = new URL(url);

    return (
      ["codesandbox.io", "www.codesandbox.io"].includes(host) &&
      pathname.includes("/s/")
    );
  },
  getHTML(url) {
    const iframeUrl = url.replace("/s/", "/embed/");

    return `<iframe src="${iframeUrl}" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking" sandbox="allow-autoplay allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"></iframe>`;
  },
};

const rehypePrettyCodeOptions = {
  theme: "one-dark-pro",
};

export async function getPostBySlug(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const source = fs.readFileSync(fullPath, "utf8");

  const { code, frontmatter } = await bundleMDX({
    source,
    mdxOptions(options, frontmatter) {
      // this is the recommended way to add custom remark/rehype plugins:
      // The syntax might look weird, but it protects you in case we add/remove
      // plugins in the future.
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        [remarkEmbedder, { transformers: [CodeSandboxTransformer] }],
      ];
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        [rehypePrettyCode, rehypePrettyCodeOptions],
      ];

      return options;
    },
  });

  return {
    slug,
    frontmatter,
    code,
  };
}
