"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { formatCpf } from "@/lib/utils";
import { useFormState } from "@/hooks/use-form-state";
import { Button } from "@/components/ui/button";
import { ErrorMessage } from "@/components/ui/error-message";
import { Input, InputRoot } from "@/components/ui/input";
import { editEstateAgentAction } from "@/app/(app)/editar-corretor/[slug]/_action";

export interface EditEstateAgentProps {
  corretor: {
    id: string;
    name: string;
    cpf: string;
    creci: string;
  };
}

export function EditEstateAgent({ corretor }: EditEstateAgentProps) {
  const router = useRouter();

  //TODO: handle API errors and notify users.
  const [{ success, message, errors }, handleSubmit] = useFormState(
    editEstateAgentAction,
    () => {
      router.push("/");
      toast.success("Broker edited successfully.", {
        duration: 4000,
      });
    },
  );

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2">
     {/* Input to send the ID of the broker, the user doesn't need to provide it, but it needs to be included in the formData */}
      <input type="hidden" name="id" value={corretor.id} />
      <div className="flex gap-2">
        <div>
          <InputRoot>
            <Input
              id="cpf"
              name="cpf"
              placeholder="Enter your CPF"
              defaultValue={formatCpf(corretor.cpf)}
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
            <Input
              id="creci"
              name="creci"
              placeholder="Enter your CRECI"
              defaultValue={corretor.creci}
            />
          </InputRoot>
          {errors?.creci && <ErrorMessage>{errors.creci[0]}</ErrorMessage>}
        </div>
      </div>

      <InputRoot>
        <Input
          id="name"
          name="name"
          placeholder="Enter your name"
          defaultValue={corretor.name}
        />
      </InputRoot>
      {errors?.name && <ErrorMessage>{errors.name[0]}</ErrorMessage>}

      <Button type="submit">Edit Broker</Button>
    </form>
  );
}
