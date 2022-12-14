import cn from "classnames";
import Link from "next/link";
import { FC } from "react";

type CoverImageProps = {
  title: string;
  src: string;
  slug?: string;
};

export const CoverImage: FC<CoverImageProps> = ({ title, src, slug }) => {
  const image = (
    <img
      src={src}
      alt={`Cover Image for ${title}`}
      className={cn("shadow-small", {
        "hover:shadow-medium transition-shadow duration-200": slug,
      })}
    />
  );
  return (
    <div className="-mx-5 sm:mx-0">
      {slug ? (
        <Link as={`/blog/${slug}`} href="/blog/[slug]" aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
};
