// Lib
// -----------------------------------------------------------------------------
import {
  PlusIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { Metadata } from "next";

// App
// -----------------------------------------------------------------------------
import { getPostsForAdmin } from "@/lib/queries";
import { formatDateTime } from "@/lib/utils";
import { LinkList, SearchInput } from "./ui";
import { Pagination, Breadcrumbs, LinkButton } from "@/app/ui";

export default async function AdminPostsPage(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const { blogPosts, blogPostsPages } = await getPostsForAdmin(
    currentPage,
    query,
  );

  return (
    <>
      <Breadcrumbs
        className="mb-8"
        parts={[
          { content: "Администрирование", url: "/admin" },
          { content: "Записи" },
        ]}
      />

      <div className="grid grid-cols-[1fr_min-content] grid-rows-[min-content_1fr] gap-x-4 gap-y-8">
        <SearchInput placeholder="Поиск" />

        <LinkButton variant="primary" href="/admin/posts/create">
          <PlusIcon className="size-6" /> Создать
        </LinkButton>

        <LinkList
          className="col-span-2"
          items={blogPosts}
          renderItem={(blogPost) => (
            <>
              {blogPost.isPublished ? (
                <CheckCircleIcon
                  className="size-6 flex-none self-center text-cyan-500"
                  title="Опубликовано"
                />
              ) : (
                <XCircleIcon
                  className="size-6 flex-none self-center text-slate-300"
                  title="Не опубликовано"
                />
              )}

              {blogPost.title}

              <div className="flex-1" />

              <span className="flex-none text-sm text-slate-500">
                {formatDateTime(blogPost.updatedAt)}
              </span>
            </>
          )}
          makeUrl={(blogPost) => `/admin/posts/${blogPost.id}/edit`}
        />

        <Pagination totalPages={blogPostsPages} />
      </div>
    </>
  );
}

export const metadata: Metadata = {
  title: "Записи",
};
