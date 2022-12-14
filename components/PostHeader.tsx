import { FC } from "react";

import { Author } from "types";

import { CoverImage } from "./CoverImage";
import DateFormatter from "./date-formatter";
import PostTitle from "./post-title";

type PostHeaderProps = {
  title: string;
  coverImage: string;
  date: string;
  author: Author;
};

export const PostHeader: FC<PostHeaderProps> = ({
  title,
  coverImage,
  date,
  author,
}) => (
  <>
    <PostTitle>{title}</PostTitle>
    <div className="mb-8 md:mb-16 -mx-5 sm:mx-0">
      <CoverImage title={title} src={coverImage} />
    </div>
    <div className="max-w-2xl mx-auto">
      <div className="mb-6 text-lg">
        <DateFormatter dateString={date} />
      </div>
    </div>
  </>
);
