"use client";

// Lib
// -----------------------------------------------------------------------------
import { FC } from "react";
import { BlogPost } from "@prisma/client";
import { useFormState } from "react-dom";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

// App
// -----------------------------------------------------------------------------
import {
  Field,
  Textarea,
  Button,
  Label,
  Input,
  LinkButton,
  FieldError,
  Alert,
} from "@/app/ui";
import { BlogPostFormState } from "@/app/lib/actions";

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

  const [state, formAction] = useFormState(action, initialState);

  return (
    <form className="flex flex-col gap-4" action={formAction}>
      {state.message && (
        <Alert status="error">
          <ExclamationCircleIcon className="h-6 w-6" />
          {state.message}
        </Alert>
      )}

      <Field>
        <Label>Заголовок</Label>

        <Input name="title" defaultValue={blogPost?.title} />

        <FieldError errors={state.errors?.title} />
      </Field>

      <Field>
        <Label>Контент</Label>

        <Textarea name="content" defaultValue={blogPost?.content} rows={10} />

        <FieldError errors={state.errors?.content} />
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
  );
};
