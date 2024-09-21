"use client";

// Lib
// -----------------------------------------------------------------------------
import { FC } from "react";
import { useFormState } from "react-dom";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";

// App
// -----------------------------------------------------------------------------
import {
  Field,
  Button,
  Label,
  Input,
  FieldError,
  Alert,
  PasswordInput,
} from "@/ui";
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
          <ExclamationCircleIcon className="h-6 w-6" />
          {state.message}
        </Alert>
      )}

      <Field>
        <Label>Пользователь</Label>

        <Input name="name" />

        <FieldError errors={state?.errors?.name} />
      </Field>

      <Field>
        <Label>Пароль</Label>

        <PasswordInput name="password" />

        <FieldError errors={state?.errors?.password} />
      </Field>

      <Button variant="primary" type="submit" className="self-center">
        Войти
      </Button>
    </form>
  );
};
