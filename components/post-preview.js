import DateFormater from "../components/date-formater";
import Link from "next/link";

const PostPreview = ({ title, date, excerpt, slug }) => (
  <div>
    <h3 className="text-4xl font-bold tracking-tighter leading-tight mb-3">
      <Link as={`/blog/${slug}`} href="/blog/[slug]">
        <a>{title}</a>
      </Link>
    </h3>
    <div className="text-lg mb-2 text-gray-400">
      <DateFormater dateString={date} />
    </div>
    <p className="text-lg leading-relaxed mb-12">{excerpt}</p>
  </div>
);

export default PostPreview;
