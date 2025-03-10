"use client";

// Lib
// -----------------------------------------------------------------------------
import { FC, useActionState } from "react";
import { Settings } from "@prisma/client";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { Button, Input, Alert, FormField } from "@something-ui/components";

// App
// -----------------------------------------------------------------------------
import { LinkButton } from "@/app/ui";
import { SettingsFormState } from "@/lib/actions";

// Props
// -----------------------------------------------------------------------------
export interface SettingsFormProps {
  action: (
    previousState: SettingsFormState,
    payload: FormData,
  ) => Promise<SettingsFormState>;
  settings?: Settings;
}

/** Blog post form component */
export const SettingsForm: FC<SettingsFormProps> = ({ action, settings }) => {
  const initialState: SettingsFormState = { message: null, errors: {} };

  const [state, formAction] = useActionState(action, initialState);

  return (
    <form className="flex flex-col gap-4" action={formAction}>
      {state.message && (
        <Alert status="error">
          <ExclamationCircleIcon className="size-6" />
          {state.message}
        </Alert>
      )}

      <FormField label="Название сайта" errors={state.errors?.siteName}>
        <Input
          name="siteName"
          defaultValue={settings?.siteName}
          invalid={Boolean(state.errors?.siteName)}
        />
      </FormField>

      <FormField label="Копирайт" errors={state.errors?.copyright}>
        <Input
          name="copyright"
          defaultValue={settings?.copyright}
          invalid={Boolean(state.errors?.copyright)}
        />
      </FormField>

      <div className="flex justify-end gap-4">
        <LinkButton href="/admin">Отмена</LinkButton>

        <Button variant="primary" type="submit">
          Сохранить
        </Button>
      </div>
    </form>
  );
};
