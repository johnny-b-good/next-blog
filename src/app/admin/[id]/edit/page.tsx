import { notFound } from "next/navigation";

import prisma from "@/app/lib/db";
import { Field, Textarea, Button, Label, Input, LinkButton } from "@/app/ui";

export default async function AdminEditPostPage({
  params,
}: {
  params: { id: string };
}) {
  const id = parseInt(params.id);

  const blogPost = await prisma.blogPost.findFirst({ where: { id } });

  if (!blogPost) {
    notFound();
  }

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Редактировать пост</h2>

      <form className="flex flex-col gap-4">
        <Field>
          <Label>Заголовок</Label>

          <Input name="title" defaultValue={blogPost.title} />
        </Field>

        <Field>
          <Label>Контент</Label>

          <Textarea name="content" defaultValue={blogPost.content} rows={10} />
        </Field>

        <div className="flex justify-end gap-4">
          <LinkButton variant="default" href="/admin">
            Отмена
          </LinkButton>

          <Button variant="primary" type="submit">
            Сохранить
          </Button>
        </div>
      </form>
    </div>
  );
}
