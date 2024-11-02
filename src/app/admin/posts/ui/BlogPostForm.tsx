"use client";

// Lib
// -----------------------------------------------------------------------------
import { FC, ReactNode } from "react";
import { BlogPost } from "@prisma/client";
import { useFormState } from "react-dom";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

// App
// -----------------------------------------------------------------------------
import {
  Textarea,
  Button,
  Input,
  LinkButton,
  Alert,
  FormField,
  Checkbox,
  Dropzone,
} from "@/ui";
import { BlogPostFormState } from "@/lib/actions";
import {
  MAX_FILE_SIZE,
  ACCEPTED_FILE_TYPES_WITH_EXTENSIONS,
} from "@/lib/consts";

// Props
// -----------------------------------------------------------------------------
export interface BlogPostFormProps {
  action: (
    previousState: BlogPostFormState,
    payload: FormData,
  ) => Promise<BlogPostFormState>;
  blogPost?: BlogPost;
  children?: ReactNode;
}

/** Blog post form component */
export const BlogPostForm: FC<BlogPostFormProps> = ({
  action,
  blogPost,
  children,
}) => {
  const initialState: BlogPostFormState = { message: null, errors: {} };

  const [state, formAction] = useFormState(action, initialState);

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

      <FormField label="Загрузить файлы">
        <Dropzone
          name="files"
          dropzoneOptions={{
            accept: ACCEPTED_FILE_TYPES_WITH_EXTENSIONS,
            maxSize: MAX_FILE_SIZE,
          }}
        />
      </FormField>

      {children}

      <div className="flex justify-end gap-4">
        <LinkButton href="/admin/posts">Отмена</LinkButton>

        <Button variant="primary" type="submit">
          Сохранить
        </Button>
      </div>
    </form>
  );
};
