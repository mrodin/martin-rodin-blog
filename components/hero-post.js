import Link from "next/link";

import CoverImage from "./CoverImage";
import Date from "./Date";

export default function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}) {
  return (
    <section>
      <div className="mb-8 md:mb-16">
        <CoverImage title={title} src={coverImage} slug={slug} />
      </div>
      <div className="md:col-gap-16 lg:col-gap-8 mb-20 md:mb-28 md:grid md:grid-cols-2">
        <div>
          <h3 className="mb-4 text-4xl leading-tight lg:text-6xl">
            <Link
              as={`/blog/${slug}`}
              href="/blog/[slug]"
              className="hover:underline"
            >
              {title}
            </Link>
          </h3>
          <div className="mb-4 text-lg md:mb-0">
            <Date dateString={date} />
          </div>
        </div>
        <div>
          <p className="mb-4 text-lg leading-relaxed">{excerpt}</p>
        </div>
      </div>
    </section>
  );
}
