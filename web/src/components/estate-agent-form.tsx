"use client";

import { AlertTriangle } from "lucide-react";
import { toast } from "sonner";

import { formatCpf } from "@/lib/utils";
import { useFormState } from "@/hooks/use-form-state";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ErrorMessage } from "@/components/ui/error-message";
import { Input, InputRoot } from "@/components/ui/input";
import { registerEstateAgentAction } from "@/app/(app)/_actions";

export function EstateAgentForm() {
  const [{ success, message, errors }, handleSubmit, isPending] = useFormState(
    registerEstateAgentAction,
    () => {
      toast.success("Broker created successfully.", {
        duration: 4000,
      });
    },
  );

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2">
      {success === false && message && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Registration Failed!</AlertTitle>

          <AlertDescription>
            <p>{message}</p>
          </AlertDescription>
        </Alert>
      )}

      <div className="flex gap-2">
        <div>
          <InputRoot>
            <Input
              id="cpf"
              name="cpf"
              placeholder="Enter your CPF"
              onChange={(e) => {
                const { value } = e.target;
                e.target.value = formatCpf(value);
              }}
            />
          </InputRoot>

          {errors?.cpf && <ErrorMessage>{errors.cpf[0]}</ErrorMessage>}
        </div>

        <div>
          <InputRoot>
            <Input id="creci" name="creci" placeholder="Enter your CRECI" />
          </InputRoot>
          {errors?.creci && <ErrorMessage>{errors.creci[0]}</ErrorMessage>}
        </div>
      </div>

      <InputRoot>
        <Input id="name" name="name" placeholder="Enter your name" />
      </InputRoot>
      {errors?.name && <ErrorMessage>{errors.name[0]}</ErrorMessage>}

      <Button disabled={isPending} type="submit">
        Submit
      </Button>
    </form>
  );
}
