import { BlogPost } from "@prisma/client";
import { marked } from "marked";
import { FC } from "react";

import { formatDateTime } from "../lib/utils";

export type BlogPostViewProps = {
  blogPost: BlogPost;
};

export const BlogPostView: FC<BlogPostViewProps> = async ({ blogPost }) => {
  const content = await marked.parse(blogPost.content);

  return (
    <article>
      {blogPost.title && <h2>{blogPost.title}</h2>}

      <div>{formatDateTime(blogPost.createdAt)}</div>

      <section
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
    </article>
  );
};
