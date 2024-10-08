// Lib
// -----------------------------------------------------------------------------
import { PlusIcon } from "@heroicons/react/24/solid";
import { Metadata } from "next";

// App
// -----------------------------------------------------------------------------
import { LinkButton, Breadcrumbs } from "@/ui";
import { getPaginatedFilteredPosts } from "@/lib/queries";
import { formatDateTime } from "@/lib/utils";
import { LinkList, SearchInput } from "./ui";
import { Pagination } from "@/app/ui";

export default async function AdminPostsPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const { blogPosts, blogPostsPages } = await getPaginatedFilteredPosts(
    currentPage,
    query,
  );

  return (
    <>
      <Breadcrumbs
        className="mb-8"
        parts={[
          { text: "Администрирование", url: "/admin" },
          { text: "Записи" },
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
