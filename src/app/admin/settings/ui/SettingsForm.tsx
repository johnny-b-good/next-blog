"use client";

// Lib
// -----------------------------------------------------------------------------
import { FC } from "react";
import { Settings } from "@prisma/client";
import { useFormState } from "react-dom";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

// App
// -----------------------------------------------------------------------------
import {
  Field,
  Button,
  Label,
  Input,
  LinkButton,
  FieldError,
  Alert,
} from "@/ui";
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
        <Label>Название сайта</Label>

        <Input name="siteName" defaultValue={settings?.siteName} />

        <FieldError errors={state.errors?.siteName} />
      </Field>

      <Field>
        <Label>Копирайт</Label>

        <Input name="copyright" defaultValue={settings?.copyright} />

        <FieldError errors={state.errors?.copyright} />
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
