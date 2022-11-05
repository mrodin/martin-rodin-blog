import fs from "fs";
import path from "path";
import { bundleMDX } from "mdx-bundler";
import rehypePrettyCode from "rehype-pretty-code";

const postsDirectory = path.join(process.cwd(), "posts");

const rehypePrettyCodeOptions = {
  // use a prepackaged theme
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
      options.remarkPlugins = [...(options.remarkPlugins ?? [])];
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

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export async function getAllPosts() {
  const slugs = getPostSlugs().map((slug) => slug.replace(/\.mdx$/, ""));

  const posts = slugs.map((slug) => getPostBySlug(slug));
  const promises = await Promise.all(posts);

  // sort posts by date in descending order
  // .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return promises;
}
