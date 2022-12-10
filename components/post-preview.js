import DateFormater from "../components/date-formater";
import Link from "next/link";

const PostPreview = ({ title, date, excerpt, slug }) => (
  <div>
    <h3 className="mb-3 text-4xl font-bold leading-tight tracking-tighter text-neutral-200">
      <Link as={`/blog/${slug}`} href="/blog/[slug]">
        {title}
      </Link>
    </h3>
    <div className="mb-2 text-lg text-neutral-400">
      <DateFormater dateString={date} />
    </div>
    <p className="mb-12 text-lg leading-relaxed">{excerpt}</p>
  </div>
);

export default PostPreview;
