// App
// ---------------------------------------------------------------------------
import prisma from "@/app/lib/db";
import { Button, Label, Input, Field, Select } from "@/app/ui";

export default async function Home() {
  const allBlogPosts = await prisma.blogPost.count();

  return (
    <div className="max-w-prose p-8">
      <div className="mb-8 text-2xl font-semibold text-teal-500">
        next-blog {allBlogPosts}
      </div>

      <form className="flex flex-col gap-4">
        <Field>
          <Label>Title:</Label>
          <Input placeholder="Text goes here" />
        </Field>

        <Field>
          <Label>Country:</Label>
          <Select
            options={[
              { value: "ru", label: "Russia" },
              { value: "jp", label: "Japan" },
            ]}
          />
        </Field>

        <Button type="submit" variant="primary" className="self-start">
          HELLO WORLD!
        </Button>
      </form>
    </div>
  );
}
