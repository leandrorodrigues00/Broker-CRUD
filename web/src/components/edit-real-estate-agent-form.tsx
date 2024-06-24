"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { formatCpf } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ErrorMessage } from "@/components/ui/error-message";
import { Input, InputRoot } from "@/components/ui/input";

export interface EditRealEstateAgentFormProps {
  corretor: { id: number; name: string; cpf: string; creci: string };
}

const editRealEstateAgentSchema = z.object({
  cpf: z.string().refine(
    (val) => {
      const cleaned = val.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
      return cleaned.length === 11;
    },
    { message: "CPF inválido" },
  ),
  creci: z
    .string()
    .min(2, { message: "CRECI deve ter no mínimo 2 caracteres" })
    .max(10, { message: "máximo 10 dígitos, conforme Federação" }),
  name: z.string().min(2, { message: "Nome deve ter no mínimo 2 caracteres" }),
});

type EditRealEstateAgentData = z.infer<typeof editRealEstateAgentSchema>;

export function EditRealEstateAgentForm({
  corretor,
}: EditRealEstateAgentFormProps) {
  const router = useRouter();

  const editRealEstateAgentForm = useForm<EditRealEstateAgentData>({
    resolver: zodResolver(editRealEstateAgentSchema),
    defaultValues: {
      name: corretor.name,
      cpf: formatCpf(corretor.cpf),
      creci: corretor.creci,
    },
  });

  const { handleSubmit, getValues, reset } = editRealEstateAgentForm;

  async function editRealEstateAgent(data: EditRealEstateAgentData) {
    const formData = {
      ...data,
      cpf: getValues("cpf").replace(/\D/g, ""), // Remove pontos e traços
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/corretore/${corretor.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          cache: "no-store",
        },
      );

      const result = await response.json();

      if (response.ok) {
        toast.success(result.mensagem);
        reset();
        router.push("/");
      } else {
        toast.error(result.mensagem);
      }
    } catch (error) {
      toast.error("Erro ao editar corretor.");
      console.error("Erro ao editar corretor:", error);
    }
  }

  return (
    <FormProvider {...editRealEstateAgentForm}>
      <form
        className="mt-4 flex flex-col gap-2"
        onSubmit={handleSubmit(editRealEstateAgent)}
      >
        <div className="flex gap-2">
          <div>
            <InputRoot>
              <Input
                id="cpf"
                name="cpf"
                placeholder="Digite o seu CPF"
                onChange={(e) => {
                  const { value } = e.target;
                  e.target.value = formatCpf(value);
                }}
              />
            </InputRoot>
            <ErrorMessage field="cpf" />
          </div>

          <div>
            <InputRoot>
              <Input id="creci" name="creci" placeholder="Digite o seu Creci" />
            </InputRoot>
            <ErrorMessage field="creci" />
          </div>
        </div>

        <InputRoot>
          <Input id="name" name="name" placeholder="Digite seu nome" />
        </InputRoot>
        <ErrorMessage field="name" />

        <Button>Alterar</Button>
      </form>
    </FormProvider>
  );
}
