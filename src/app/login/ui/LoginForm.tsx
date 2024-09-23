"use client";

// Lib
// -----------------------------------------------------------------------------
import { FC } from "react";
import { useFormState } from "react-dom";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

// App
// -----------------------------------------------------------------------------
import { Button, Input, Alert, PasswordInput, FormField } from "@/ui";
import { LoginFormState } from "@/lib/actions";

// Props
// -----------------------------------------------------------------------------
export interface LoginFormProps {
  action: (
    previousState: LoginFormState | undefined,
    payload: FormData,
  ) => Promise<LoginFormState | undefined>;
}

/** Blog post form component */
export const LoginForm: FC<LoginFormProps> = ({ action }) => {
  const initialState: LoginFormState = { message: null, errors: {} };

  const [state, formAction] = useFormState(action, initialState);

  return (
    <form className="mx-auto flex max-w-md flex-col gap-4" action={formAction}>
      {state?.message && (
        <Alert status="error">
          <ExclamationCircleIcon className="size-6" />
          {state.message}
        </Alert>
      )}

      <FormField label="Пользователь" errors={state?.errors?.name}>
        <Input name="name" />
      </FormField>

      <FormField label="Пароль" errors={state?.errors?.password}>
        <PasswordInput name="password" />
      </FormField>

      <Button variant="primary" type="submit" className="self-center">
        Войти
      </Button>
    </form>
  );
};
