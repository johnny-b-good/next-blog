"use client";

// Lib
// -----------------------------------------------------------------------------
import { FC, useActionState } from "react";
import { BlogPost } from "@prisma/client";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import {
  Textarea,
  Button,
  Input,
  Alert,
  FormField,
  Checkbox,
} from "@something-ui/components";
import { LinkButton } from "@/app/ui";

// App
// -----------------------------------------------------------------------------
import { BlogPostFormState } from "@/lib/actions";

// Props
// -----------------------------------------------------------------------------
export interface BlogPostFormProps {
  action: (
    previousState: BlogPostFormState,
    payload: FormData,
  ) => Promise<BlogPostFormState>;
  blogPost?: BlogPost;
}

/** Blog post form component */
export const BlogPostForm: FC<BlogPostFormProps> = ({ action, blogPost }) => {
  const initialState: BlogPostFormState = { message: null, errors: {} };

  const [state, formAction] = useActionState(action, initialState);

  return (
    <form className="flex flex-col gap-4" action={formAction}>
      {state.message && (
        <Alert status="error">
          <ExclamationCircleIcon className="size-6" />
          {state.message}
        </Alert>
      )}

      <FormField label="Заголовок" errors={state.errors?.title}>
        <Input
          name="title"
          defaultValue={blogPost?.title}
          invalid={Boolean(state.errors?.title)}
        />
      </FormField>

      <FormField label="Контент" errors={state.errors?.content}>
        <Textarea
          name="content"
          defaultValue={blogPost?.content}
          rows={15}
          invalid={Boolean(state.errors?.content)}
          className="font-mono text-sm"
        />
      </FormField>

      <FormField
        label="Опубликовано"
        errors={state.errors?.isPublished}
        labelPosition="right"
      >
        <Checkbox name="isPublished" defaultChecked={blogPost?.isPublished} />
      </FormField>

      <div className="flex justify-end gap-4">
        <LinkButton href="/admin/posts">Отмена</LinkButton>

        <Button variant="primary" type="submit">
          Сохранить
        </Button>
      </div>
    </form>
  );
};
