import PostPreview from "./PostPreview";

const MoreStories = ({ posts }) => (
  <section>
    <div className="flex flex-col md:grid-cols-2 md:col-gap-16 lg:col-gap-32 row-gap-20 md:row-gap-32 mb-12">
      {posts.map((post) => (
        <PostPreview
          key={post.slug}
          title={post.frontmatter.title}
          coverImage={post.frontmatter.coverImage}
          date={post.frontmatter.date}
          author={post.frontmatter.author}
          slug={post.slug}
          excerpt={post.frontmatter.excerpt}
        />
      ))}
    </div>
  </section>
);

export default MoreStories;
