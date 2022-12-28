import { FC } from "react";

import { CoverImage } from "./CoverImage";
import { Date } from "./Date";
import PostTitle from "./post-title";

type PostHeaderProps = {
  title: string;
  coverImage: string;
  date: string;
};

export const PostHeader: FC<PostHeaderProps> = ({
  title,
  coverImage,
  date,
}) => (
  <>
    <PostTitle>{title}</PostTitle>
    <div className="mb-8 md:mb-16 -mx-5 sm:mx-0">
      <CoverImage title={title} src={coverImage} />
    </div>
    <div className="max-w-2xl">
      <div className="mb-6 text-lg">
        <Date dateString={date} />
      </div>
    </div>
  </>
);
