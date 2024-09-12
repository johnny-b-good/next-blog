import { BlogPost } from "@prisma/client";
import DOMPurify from "dompurify";
import { marked } from "marked";
import { JSDOM } from "jsdom";
import { FC } from "react";

import { formatDateTime } from "../lib/utils";

const { window } = new JSDOM("<!DOCTYPE html>");

export type BlogPostViewProps = {
  blogPost: BlogPost;
};

export const BlogPostView: FC<BlogPostViewProps> = async ({ blogPost }) => {
  const content = DOMPurify(window).sanitize(
    await marked.parse(blogPost.content),
  );

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
