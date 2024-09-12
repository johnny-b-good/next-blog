// Lib
// -----------------------------------------------------------------------------
import { PlusIcon } from "@heroicons/react/24/solid";

// App
// -----------------------------------------------------------------------------
import { LinkButton, Input } from "@/app/ui";
import prisma from "@/app/lib/db";
import { LinkList } from "./ui";
import { formatDateTime } from "@/app/lib/utils";

export default async function AdminPage() {
  const allBlogPosts = await prisma.blogPost.findMany();

  return (
    <div className="grid grid-cols-[1fr_min-content] grid-rows-[min-content_1fr] gap-4">
      <Input placeholder="Поиск" />

      <LinkButton variant="primary" href="/admin/create">
        <PlusIcon className="h-6 w-6" /> Создать
      </LinkButton>

      <LinkList
        className="col-span-2"
        items={allBlogPosts}
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
    </div>
  );
}
