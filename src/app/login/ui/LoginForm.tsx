"use client";

// Lib
// -----------------------------------------------------------------------------
import { FC, useActionState } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Input,
  Alert,
  PasswordInput,
  FormField,
} from "@something-ui/components";

// App
// -----------------------------------------------------------------------------
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

  const [state, formAction] = useActionState(action, initialState);

  return (
    <form className="flex flex-col gap-4" action={formAction}>
      {state?.message && (
        <Alert status="error">
          <ExclamationCircleIcon className="size-6" />
          {state.message}
        </Alert>
      )}

      <FormField label="Пользователь" errors={state?.errors?.username}>
        <Input name="username" invalid={Boolean(state?.errors?.username)} />
      </FormField>

      <FormField label="Пароль" errors={state?.errors?.password}>
        <PasswordInput
          name="password"
          invalid={Boolean(state?.errors?.password)}
        />
      </FormField>

      <Button variant="primary" type="submit" className="self-center">
        Войти
      </Button>
    </form>
  );
};
