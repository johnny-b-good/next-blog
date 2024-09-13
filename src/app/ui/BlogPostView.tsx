import { BlogPost } from "@prisma/client";
import { marked } from "marked";
import { FC } from "react";

import { Link } from "./Link";
import { formatDateTime } from "../lib/utils";

export type BlogPostViewProps = {
  blogPost: BlogPost;
};

export const BlogPostView: FC<BlogPostViewProps> = async ({ blogPost }) => {
  const content = await marked.parse(blogPost.content);

  return (
    <article className="rounded bg-white p-4 shadow">
      <Link href={`/${blogPost.id}`}>{blogPost.title}</Link>

      <div>{formatDateTime(blogPost.createdAt)}</div>

      <section
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
    </article>
  );
};
