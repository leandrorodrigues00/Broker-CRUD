//  Workaround for issue: "Form always resets on submit"
// @see:  https://github.com/facebook/react/issues/29034

import { useState, useTransition, type FormEvent } from "react";
import useRehydrateStore from "@/zustand-store";
import { requestFormReset } from "react-dom";

interface FormState {
  success: boolean;
  message: string | null;
  errors: Record<string, string[]> | null;
}

export function useFormState(
  action: (data: FormData) => Promise<FormState>,
  onSuccess: () => Promise<void> | void,

  initialState?: FormState,
) {
  const [isPending, startTransition] = useTransition();

  const toggleRehydrateTrigger = useRehydrateStore(
    (state) => state.toggleRehydrateTrigger,
  );

  const [formState, setFormState] = useState(
    initialState ?? {
      success: false,
      message: null,
      errors: null,
    },
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const data = new FormData(form);

    startTransition(async () => {
      const state = await action(data);

      if (state.success === true && onSuccess) {
        await onSuccess();
        toggleRehydrateTrigger();
        requestFormReset(form);
      }

      setFormState(state);
    });
  }

  return [formState, handleSubmit, isPending] as const;
}
