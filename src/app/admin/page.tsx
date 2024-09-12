// Lib
// -----------------------------------------------------------------------------
import { PlusIcon } from "@heroicons/react/24/solid";
import dayjs from "dayjs";

// App
// -----------------------------------------------------------------------------
import { LinkButton, Input } from "@/app/ui";
import prisma from "@/app/lib/db";
import { LinkList } from "./ui";

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
              {dayjs(blogPost.createdAt).format("DD MMM YYYY, HH:mm")}
            </span>
          </>
        )}
        makeUrl={(blogPost) => `/admin/${blogPost.id}/edit`}
      />
    </div>
  );
}
