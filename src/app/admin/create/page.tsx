import prisma from "@/app/lib/db";
import { Field, Textarea, Button, Label, Input, LinkButton } from "@/app/ui";

export default async function AdminCreatePostPage() {
  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Создать пост</h2>

      <form className="flex flex-col gap-4">
        <Field>
          <Label>Заголовок</Label>
          <Input name="title" />
        </Field>

        <Field>
          <Label>Контент</Label>
          <Textarea name="content" rows={10} />
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
