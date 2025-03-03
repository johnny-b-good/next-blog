"use client";

// Lib
// -----------------------------------------------------------------------------
import { FC, useActionState } from "react";
import { BlogPost, BlogPostImage } from "@prisma/client";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import {
  Textarea,
  Button,
  Input,
  Alert,
  FormField,
  Checkbox,
  LinkButton,
} from "@something-ui/components";
import { Dropzone } from "@/app/ui/Dropzone";

// App
// -----------------------------------------------------------------------------
import { BlogPostFormState } from "@/lib/actions";
import {
  MAX_FILE_SIZE,
  ACCEPTED_FILE_TYPES_WITH_EXTENSIONS,
} from "@/lib/consts";
import { ImagesList } from "./ImagesList";

// Props
// -----------------------------------------------------------------------------
export interface BlogPostFormProps {
  action: (
    previousState: BlogPostFormState,
    payload: FormData,
  ) => Promise<BlogPostFormState>;
  blogPost?: BlogPost;
  blogPostImages?: Array<BlogPostImage>;
}

/** Blog post form component */
export const BlogPostForm: FC<BlogPostFormProps> = ({
  action,
  blogPost,
  blogPostImages,
}) => {
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

      {blogPostImages && <ImagesList images={blogPostImages} />}

      <FormField label="Загрузить файлы">
        <Dropzone
          name="files"
          dropzoneOptions={{
            accept: ACCEPTED_FILE_TYPES_WITH_EXTENSIONS,
            maxSize: MAX_FILE_SIZE,
          }}
        />
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
