// Lib
// -----------------------------------------------------------------------------
import { BlogPost } from "@prisma/client";
import { FC } from "react";
import markdownit from "markdown-it";
import hljs from "highlight.js";
import "highlight.js/styles/base16/tomorrow-night.css";

// App
// -----------------------------------------------------------------------------
import { Link } from "@/ui";
import { formatDateTime } from "@/lib/utils";

// Props
// -----------------------------------------------------------------------------
export type BlogPostViewProps = {
  blogPost: BlogPost;
};

// Consts
// -----------------------------------------------------------------------------
const md = markdownit({
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (__) {}
    }

    return "";
  },
});

export const BlogPostView: FC<BlogPostViewProps> = async ({ blogPost }) => {
  const content = md.render(blogPost.content);

  return (
    <article className="rounded bg-white shadow">
      <h2 className="flex border-b border-solid border-b-slate-300 px-6 py-4 align-baseline">
        <Link
          href={`/posts/${blogPost.id}`}
          className="text-xl font-semibold no-underline"
        >
          {blogPost.title}
        </Link>

        <div className="flex-grow"></div>

        <div className="flex-none text-slate-500">
          {formatDateTime(blogPost.createdAt)}
        </div>
      </h2>

      <section
        className="prose prose-slate max-w-none px-6 py-4"
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
    </article>
  );
};
