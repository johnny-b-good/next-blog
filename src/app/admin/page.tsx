// Lib
// -----------------------------------------------------------------------------
import { PlusIcon } from "@heroicons/react/24/solid";

// App
// -----------------------------------------------------------------------------
import { LinkButton, SearchInput, Pagination } from "@/app/ui";
import { LinkList } from "./ui";
import { getFilteredPosts } from "./lib/queries";
import { formatDateTime } from "@/app/lib/utils";

export default async function AdminPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  const { blogPosts, blogPostsPages } = await getFilteredPosts(
    currentPage,
    query,
  );

  return (
    <div className="grid grid-cols-[1fr_min-content] grid-rows-[min-content_1fr] gap-4">
      <SearchInput placeholder="Поиск" />

      <LinkButton variant="primary" href="/admin/create">
        <PlusIcon className="h-6 w-6" /> Создать
      </LinkButton>

      <LinkList
        className="col-span-2"
        items={blogPosts}
        renderItem={(blogPost) => (
          <>
            {blogPost.title}
            <span className="text-sm text-slate-500">
              {formatDateTime(blogPost.createdAt)}
            </span>
          </>
        )}
        makeUrl={(blogPost) => `/admin/${blogPost.id}/edit`}
      />

      <Pagination totalPages={blogPostsPages} />
    </div>
  );
}
