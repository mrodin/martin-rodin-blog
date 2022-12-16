import Link from "next/link";
import { FC } from "react";

import { Date } from "./Date";
import { PostPreviewHeading } from "./Headings";
import { Text } from "./Text";

type PostPreviewProps = {
  title: string;
  date: string;
  excerpt: string;
  slug: string;
};

const PostPreview: FC<PostPreviewProps> = ({ title, date, excerpt, slug }) => (
  <div className="mb-12">
    <PostPreviewHeading>
      <Link as={`/blog/${slug}`} href="/blog/[slug]">
        {title}
      </Link>
    </PostPreviewHeading>
    <div className="mb-2">
      <Date dateString={date} />
    </div>
    <Text>{excerpt}</Text>
  </div>
);

export default PostPreview;
