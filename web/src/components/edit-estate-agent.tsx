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

  //todo: tratar erros de api, e notificar usuários.
  const [{ success, message, errors }, handleSubmit] = useFormState(
    editEstateAgentAction,
    () => {
      router.push("/");
      toast.success("Corretor editado com sucesso.", {
        duration: 4000,
      });
    },
  );

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2">
      {/* Input para enviar o ID do corretor, usuário não precisa o fornecer, mas precisa ir junto do formData */}
      <input type="hidden" name="id" value={corretor.id} />
      <div className="flex gap-2">
        <div>
          <InputRoot>
            <Input
              id="cpf"
              name="cpf"
              placeholder="Digite o seu CPF"
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
              placeholder="Digite o seu Creci"
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
          placeholder="Digite seu nome"
          defaultValue={corretor.name}
        />
      </InputRoot>
      {errors?.name && <ErrorMessage>{errors.name[0]}</ErrorMessage>}

      <Button type="submit">Editar Corretor</Button>
    </form>
  );
}
